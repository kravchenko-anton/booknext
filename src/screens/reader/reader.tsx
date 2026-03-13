import { useTypedRoute } from '@/hooks'
import ReaderChapters from '@/screens/reader/components/chapters-modal/reader-chapters'
import { GtpWindow } from '@/screens/reader/components/gpt-window/gpt-window'
import { ReactionInfo } from '@/screens/reader/components/reaction-info/reaction-info'
import ReaderCustomization from '@/screens/reader/components/reader-customization/reader-customization'
import { ReaderLoading } from '@/screens/reader/components/reader-loading'
import ReaderMenu from '@/screens/reader/components/reader-menu/reader-menu'
import ReaderViewer from '@/screens/reader/components/reader-viewer/reader-viewer'
import { Translator } from '@/screens/reader/components/translator/translator'
import { useReader } from '@/screens/reader/functions/useReader'
import { useReadingProgressStore } from '@/store/reader/progress-store'
import { Loader } from '@/ui'
import React from 'react'
// install before using https://cdn.jsdelivr.net/npm/mark.js@8.11.1/dist/mark.min.js

const Reader = () => {
  const { params } = useTypedRoute<"Reader">();
  const lastHistory = useReadingProgressStore((state) => state.lastHistoryByBookId(params.id));
  const reader = useReader(params.id, params.startFromScratch ? 0 : (lastHistory?.scrollPosition || 0));
  if (
    !reader.ebook ||
    reader.ebookRequestLoading 
  )
    return (
      <Loader background={reader.colorScheme.colorPalette.background.normal} />
    );
  return (
    <>
      <ReaderLoading
        loading={reader.readerLoading}
        backgroundColor={reader.colorScheme.colorPalette.background.normal}
      />
      <ReaderViewer
        colorScheme={reader.colorScheme}
        defaultProperties={reader.defaultProperties}
        ref={reader.viewerReference}
        readerUiVisible={reader.readerHeaderVisible}
        handleDoublePress={() =>
          reader.setReaderHeaderVisible(!reader.readerHeaderVisible)
        }
        onMessage={reader.onMessage}
        file={reader.composedHtml}
      />
      <ReaderMenu
        bookSlug={params.id}
        colorScheme={reader.colorScheme}
        readingProgress={reader.readingProgress}
        bookTitle={reader.ebook.title}
        visible={
          reader.readerHeaderVisible && !reader.readerLoading
            ? !reader.ebookRequestLoading
            : false
        }
        onChapterIconPress={() => reader.openModal.chaptersList()}
        onSelectThemeIconPress={() => reader.openModal.readingSettings()}
        onProgressChange={(value) =>
          reader.viewerReference.current?.injectJavaScript(`
					 scrollToProgress("${value}")
				`)
        }
      />

      <ReaderChapters
        activeChapter={reader.readingProgress.chapter}
        colorScheme={reader.colorScheme}
        chapters={reader.ebook.chapters}
        sheetRef={reader.modalRefs.chaptersListModalReference}
        changeChapter={(link) => {
          reader.viewerReference.current?.injectJavaScript(
            `scrollToChapter("${link}")`,
          );
        }}
      />

      <ReaderCustomization
        onFontSizeChanged={() =>
       null
        }
        sheetRef={reader.modalRefs.readingSettingsModalReference}
      />
      <ReactionInfo
        createReaction={reader.createReaction}
        deleteReaction={reader.deleteReaction}
        updateReaction={reader.updateReaction}
        id={params.id}
        colorScheme={reader.colorScheme}
        sheetRef={reader.modalRefs.reactionModalReference}
      />
      <Translator
        colorScheme={reader.colorScheme}
        sheetRef={reader.modalRefs.translationModalReference}
      />

      <GtpWindow
        colorScheme={reader.colorScheme}
        sheetRef={reader.modalRefs.gptModalReference}
      />
    </>
  );
};

export default Reader;
