import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { useFinishBook } from '@/screens/reader/functions/useFinishBook'
import { useModalReference } from '@/screens/reader/functions/useModalReference'
import { useReaderMessage } from '@/screens/reader/functions/useReaderMessage'
import { useReadingProgress } from '@/screens/reader/functions/useReadingProgress'
import { injectFont } from '@/screens/reader/injections/font-injection'
import { getStyleTag, injectStyle } from '@/screens/reader/injections/styles-injection'
import { useCustomizationStore } from '@/store/reader/customization-store'
import { useReactionStore } from '@/store/reader/reaction-store'
import { QueryKeys } from '@/utils/query-keys'
import { errorToast } from '@/utils/toast'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import type WebView from 'react-native-webview'

export const useReader = (id: string, initialScrollPosition: number) => {
  const { setOptions } = useTypedNavigation();
  
  const [readerLoading, setReaderLoading] = useState(true);
  const [readerHeaderVisible, setReaderHeaderVisible] = useState(false);
  const viewerReference = useRef<WebView>(null);
  const { reactions,findReactionById, updateReaction,deleteReaction,createReaction} = useReactionStore();
  const { colorScheme, ...restUiProperties } = useCustomizationStore(
    (state) => state,
  );
  
  
  const {
    data: ebook,
    isPending: ebookRequestLoading
  } = useQuery({
    queryKey: QueryKeys.ebook.byId(id),
    queryFn: () => api.ebook.ebookById(id),
    select: (data) => data.data,
    enabled: !!id, // Ensure isConnected is properly checked
    networkMode: 'offlineFirst',
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const {
    readingProgress,
    scrollPosition,
    updateReadingProgress,
    clearProgress,
  } = useReadingProgress({ id, readerLoading, initialScrollPosition });

  const { onFinish } = useFinishBook(clearProgress);
  const { openModal, modalRefs } = useModalReference(setReaderHeaderVisible, {
    onOpenModal: () =>
      viewerReference.current?.injectJavaScript(`${ebook?.functionEnums.removeAllTextSelection}()`),
  });

  const { onMessage } = useReaderMessage({
  book: {
    title: ebook?.title || "",
    picture: ebook?.picture || "",
    id: id,
    author: ebook?.author as { name: string; id: string },
  },
    onFinishBookPress: () => onFinish({
      picture: ebook?.picture || "",
      title: ebook?.title || "",
      id: id,
      author: ebook?.author   as { name: string; id: string },
    }),
    onContentLoadEnd: () => setReaderLoading(false),
    onScroll: updateReadingProgress,
    createReaction: createReaction,
    openGptModal: (text: string) => openModal.gpt(text),
    openTranslationModal: (text: string) => openModal.translation(text),
    openReactionModal: async (id) => {
      const reaction = await findReactionById(id);
      if (!reaction) return errorToast("Problem with reaction");
      await openModal.reaction.open(reaction);
    },
  });

  const styleTag = getStyleTag({ colorScheme, ...restUiProperties });
  // eslint-disable-next-line
  const [defaultProperties] = useState({
    scrollPosition,
    theme: styleTag,
    reactions: reactions,
  });
  useEffect(() => {
    setOptions({
      statusBarHidden: false,
      statusBarStyle: colorScheme.statusBar,
      navigationBarColor: colorScheme.colorPalette.background.darker,
      navigationBarHidden: true,
      statusBarTranslucent: false,
      statusBarColor: colorScheme.colorPalette.background.darker,
    });
  }, [colorScheme, setOptions, readerHeaderVisible]);

  useEffect(() => {
    viewerReference.current?.injectJavaScript(injectStyle(styleTag));
  }, [styleTag]);

  useEffect(() => {
    viewerReference.current?.injectJavaScript(
      `${ebook?.functionEnums.wrapReactionsInMarkTag}(${JSON.stringify(reactions)})`,
    );
  }, [reactions, createReaction]);
  const composedHtml = `
   <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <style>${injectFont()}</style>
    </head>
    <style>${defaultProperties.theme}</style>
    ${ebook?.file}
      <script>
     window.onload =  function() {
       window.scrollTo({ top: ${defaultProperties.scrollPosition}});
      ${ebook?.onLoadScript}
			 wrapReactionsInMarkTag(${JSON.stringify(defaultProperties.reactions)});
			 window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finish-loading' }))
     };
    </script>
  `;
  return {
    ebook,
    readerLoading,
    readerHeaderVisible,
    colorScheme,
    viewerReference,
    setReaderHeaderVisible,
    modalRefs,
    ebookRequestLoading,
    readingProgress,
    createReaction,
    composedHtml,
    updateReaction,
    deleteReaction,
    openModal,
    onMessage,
    reactions,
    defaultProperties,
    styleTag,
  };
};
