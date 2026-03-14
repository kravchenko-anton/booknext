import api from '@/api'
import type { ReactionType } from '@/store/reader/reaction-store'
import { userLanguage } from '@/utils/constants/user-language'
import { MutationKeys } from '@/utils/query-keys'
import type { reactionsTitles } from '@/utils/reactions'
import { shareText } from '@/utils/share-text'
import { errorToast } from '@/utils/toast'
import { useNetInfo } from '@react-native-community/netinfo'
import { useMutation } from '@tanstack/react-query'
import uuid from 'react-native-uuid'
import type { WebViewMessageEvent } from 'react-native-webview'

import type { GptExplain, TranslateText } from '@/api/client'

export enum ReaderMessageType {
  Scroll = "scroll",
  SelectionLimitFail = "selection-limit-fail",
  FinishLoading = "finish-loading",
  FinishBook = "finishBook",
  MarkClick = "mark-click",
  Share = "share",
  Translate = "translate",
  Reaction = "reaction",
  Explain = "explain",
}
export interface WebviewMessageType {
  type: ReaderMessageType;
  payload: {
    id: string;
    text: string;
    context: string;
    range: {
      startOffset: number;
      endOffset: number;
      xpath: string;
    };
    reaction: reactionsTitles;
    scrollTop: number;
    progress: number;
    chapter: {
      chapterTitle: string;
      chapterLink: string;
      chapterProgress: number;
    };
  };
}

export interface ReaderMessageProperties {
  onScroll: (
    payload: Pick<
      WebviewMessageType["payload"],
      "chapter" | "progress" | "scrollTop"
    >,
  ) => void;
 book: {
    title: string;
    picture: string;
    id: string;
    author: {
      name: string;
      id: string;
    }
 }
  onFinishBookPress: () => void;
  onContentLoadEnd: () => void;
  createReaction: (data: ReactionType) => void;
  openReactionModal: (id: string) => void;
  openGptModal: (text: string) => void;
  openTranslationModal: (text: string) => void;
}

export const useReaderMessage = ({
  onFinishBookPress,
 book,
  onContentLoadEnd,
  onScroll,
  openReactionModal,
  createReaction,
  openTranslationModal,
  openGptModal,
}: ReaderMessageProperties) => {
  const { isConnected } = useNetInfo();
  const { mutateAsync: gptExplain, isPending: explainLoading } = useMutation({
    mutationKey: MutationKeys.gptExplain,
    mutationFn: (payload: GptExplain) => api.reading.gptExplain(payload),
  });

  const { mutateAsync: translate, isPending: translateLoading } = useMutation({
    mutationKey: MutationKeys.translate,
    mutationFn: (payload: Omit<TranslateText, "targetLang">) =>
      api.reading.translate({
        ...payload,
        targetLang: userLanguage,
      }),
  });
  const onMessage = async (event: WebViewMessageEvent) => {
    const parsedEvent = JSON.parse(
      event.nativeEvent.data,
    ) as WebviewMessageType;
    const { type, payload } = parsedEvent;
    console.log("🚂", parsedEvent);
    if (type === ReaderMessageType.FinishLoading) {
      console.log("Finish loading");
      onContentLoadEnd();
    }
    if (type === ReaderMessageType.Explain) {
      if (!isConnected) return errorToast("No internet connection");
      if (explainLoading) return errorToast("Loading explanation");
      const { data: explanation } = await gptExplain({
        selectedText: payload.text,
        bookTitle: book.title,
        bookAuthor: book.author.name,
        targetLang: userLanguage,
        context: payload.context || "",
      });
      openGptModal(explanation);
    }
    if (type === ReaderMessageType.Share) {
      await shareText(payload.text);
    }
    if (type === ReaderMessageType.Translate) {
      if (!isConnected) return errorToast("No internet connection");
      if (translateLoading) return errorToast("Loading translation");
      const { data: translateAnswer } = await translate({
        text: payload.text,
      });
      openTranslationModal(translateAnswer);
    }
    if (type === ReaderMessageType.Reaction) {
      const uuid2 = uuid.v4()
      createReaction({
        id: String(uuid2),
        book,
        text: payload.text,
        startOffset: payload.range.startOffset,
        endOffset: payload.range.endOffset,
        xpath: payload.range.xpath,
        type: payload.reaction,
      });
    }
    if (type === ReaderMessageType.SelectionLimitFail)
      errorToast("Selected text is too long");
    if (type === ReaderMessageType.Scroll)
      onScroll({
        scrollTop: payload.scrollTop,
        progress: payload.progress,
        chapter: {
          chapterTitle: payload.chapter.chapterTitle,
          chapterLink: payload.chapter.chapterLink,
          chapterProgress: payload.chapter.chapterProgress,
        },
      });
    if (type === ReaderMessageType.FinishBook) onFinishBookPress();
    if (
      type === ReaderMessageType.MarkClick &&
      payload.id !== null &&
      payload.id !== undefined
    ) {
      console.log("Mark click", payload.id);
      openReactionModal(payload.id);
    }
  };

  return {
    onMessage,
  };
};
