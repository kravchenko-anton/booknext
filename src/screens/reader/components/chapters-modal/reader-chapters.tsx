import type { ThemePackType } from "@/store/reader/theme-pack";
import type { ReadingProgressType } from "@/screens/reader/functions/useReadingProgress";
import { Title } from "@/ui";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetSectionList,
  type BottomSheetSectionListMethods,
} from "@gorhom/bottom-sheet";
import type { EbookOutputChaptersInner } from "api-client";
import { type FC, type RefObject, useMemo, useRef } from "react";
import { Pressable } from "react-native";

export interface ReaderChaptersProperties {
  sheetRef: RefObject<BottomSheetModal>;
  chapters: EbookOutputChaptersInner[];
  changeChapter: (link: string) => void;
  colorScheme: ThemePackType;
  activeChapter: ReadingProgressType["chapter"];
}

const ReaderChapters: FC<ReaderChaptersProperties> = ({
  sheetRef,
  chapters,
  changeChapter,
  colorScheme,
  activeChapter,
}) => {
  const bottomSheetSectionListReference =
    useRef<BottomSheetSectionListMethods>(null);

  return (
    <BottomSheetModal
      enableContentPanningGesture
      enableHandlePanningGesture
      enablePanDownToClose
      enableOverDrag
      index={0}
      ref={sheetRef}
      snapPoints={["40%", "80%"]}
      handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
      style={{
        borderColor: colorScheme.colorPalette.background.lighter,
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
      backgroundStyle={{
        backgroundColor: colorScheme.colorPalette.background.darker,
      }}
      backdropComponent={(backdropProperties) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...backdropProperties}
          enableTouchThrough
        />
      )}
    >
      <BottomSheetSectionList
        stickySectionHeadersEnabled
        scrollToOverflowEnabled
        nestedScrollEnabled
        sections={useMemo(
          () => [
            {
              title: "Chapters",
              data: chapters,
            },
          ],
          [chapters],
        )}
        ref={bottomSheetSectionListReference}
        showsVerticalScrollIndicator={false}
        className="mt-2 h-full px-4"
        style={{
          backgroundColor: colorScheme.colorPalette.background.darker,
        }}
        renderSectionHeader={({ section }) => (
          <Title
            weight="bold"
            numberOfLines={2}
            className="mt-[-1px] border-b-[1px] p-4"
            size={"xxl"}
            color={colorScheme.colorPalette.text}
            style={{
              borderColor: colorScheme.colorPalette.background.lighter,
              backgroundColor: colorScheme.colorPalette.background.darker,
            }}
          >
            {section.title}
          </Title>
        )}
        renderItem={({ item: chapter }) => (
          <Pressable
            className="w-full flex-row items-center justify-between border-b-[1px] p-4"
            style={{
              backgroundColor:
                activeChapter?.link === chapter.link
                  ? colorScheme.colorPalette.background.normal
                  : colorScheme.colorPalette.background.lighter,
              borderColor: colorScheme.colorPalette.background.normal,
            }}
            onPress={() => {
              console.log(chapter.link);
              changeChapter(chapter.link);
            }}
          >
            <Title
              numberOfLines={2}
              size={"lg"}
              weight="semiBold"
              style={{
                color: colorScheme.colorPalette.text,
                width: "80%",
              }}
            >
              {chapter.title}
            </Title>
            {chapter.link === activeChapter?.link && (
              <Title
                numberOfLines={2}
                size={"lg"}
                weight="semiBold"
                style={{
                  color: colorScheme.colorPalette.text,
                }}
              >
                {Number(activeChapter?.progress || 0).toFixed(1) + "%"}
              </Title>
            )}
          </Pressable>
        )}
      />
    </BottomSheetModal>
  );
};

export default ReaderChapters;
