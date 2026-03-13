import { useTypedNavigation } from '@/hooks'
import { Check, MoreHorizontal, Share, Trash } from '@/icons'
import { useFinishBook } from '@/screens/reader/functions/useFinishBook'
import { useLibraryStore } from '@/store/reader/library-store'
import type { CompareReadingBook } from '@/store/reader/progress-store'
import { AnimatedIcon, Image, Title } from '@/ui'
import { AnimatedPressable } from '@/ui/animated-components'
import { settings } from '@/ui/book-card/settings'
import BannerList from '@/ui/book-lists/banner-list'
import ProgressBar from '@/ui/progress-bar/progress-bar'
import SelectItem from '@/ui/select-list/select-list-item'
import { Color } from '@/utils/colors'
import { shareBookWithAuthor } from '@/utils/share-text'
import { successToast } from '@/utils/toast'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { type FC, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

interface ReadingListProperties {
  data: CompareReadingBook[] | undefined;
}

export const ReadingList: FC<ReadingListProperties> = ({ data }) => {
  const { navigate } = useTypedNavigation();
  const sheetReference = useRef<BottomSheetModal>(null);
  const {removeFromLibrary} = useLibraryStore()
  const [activeBookModalContent, setActiveBookModalContent] = useState<any>(null);

  const { onFinish } = useFinishBook(() =>
    sheetReference.current?.dismiss(),
  );

  if (data?.length === 0) return null;
  return (
    <>
      <BannerList
        title={"Reading now"}
        horizontal
        data={data || []}
        renderItem={({
          item: book,
        }) =>  (
          <View
            style={{
              width: settings.width.md,
            }}
          >
            <View className="relative">
              <AnimatedPressable
                onPress={() => {
                  navigate("Reader", {
                    id: book.id,
                  });
                }}
              >
                <Image
                  width={settings.width.md}
                  height={settings.height.md}
                  url={book.picture}
                  className="mb-2"
                  style={{
                    borderColor: Color.bordered,
                    borderWidth: 1
                  }}
                />
              </AnimatedPressable>

              <View className="absolute bottom-4  w-full flex-row justify-between px-2">
                <View />
                <AnimatedIcon
                  icon={MoreHorizontal}
                  size={"sm"}
                  variant="muted"
                  onPress={() => {
                    setActiveBookModalContent(book);
                    sheetReference.current?.present(book);
                  }}
                />
              </View>
            </View>
            <ProgressBar
              progress={Math.max((book.lastHistory?.endProgress || 0) / 100, 0.1)
            } />

            <Title numberOfLines={2} size="sm" weight="bold" className="mt-1">
              {book.title}
            </Title>
          </View>
        )}
      />

      <BottomSheetModal
        enableContentPanningGesture
        enableHandlePanningGesture
        enablePanDownToClose
        enableOverDrag
        index={0}
        ref={sheetReference}
        snapPoints={[300]}
        handleIndicatorStyle={{ backgroundColor: Color.gray }}
        style={{
          borderColor: Color.bordered,
          borderWidth: 1,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        backgroundStyle={{
          backgroundColor: Color.foreground,
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
        <View className="mx-4">
          <TouchableOpacity
              onPress={() => {
                if  (!activeBookModalContent?.id) return;
                navigate("Book", {
                  id: activeBookModalContent?.id,
                })
              }}
            className="border-b-bordered w-full flex-row gap-5 pb-2">
            <Image
              width={50}
              height={70}
              borderRadius={4}
              url={activeBookModalContent?.picture}
            />
            <View className="max-w-[80%]">
              <Title size="xl" weight="bold">
                {activeBookModalContent?.title}
              </Title>
              <Title size="md" weight="regular" color={Color.gray}>
                {activeBookModalContent?.author?.name}
              </Title>
            </View>
          </TouchableOpacity>
          <View className="border-bordered border-t-2" />
          <View className="mt-2">
            <SelectItem
              icon={Share}
              title={"Share"}
              color={Color.white}
              onPress={() => {
                shareBookWithAuthor(
                  String(activeBookModalContent?.title),
                  String(activeBookModalContent?.author),
                );
                sheetReference.current?.dismiss();
              }}
            />

            <SelectItem
              icon={Check}
              title={"Mark as read"}
              color={Color.white}
              onPress={() => {
                if (activeBookModalContent?.id) {
                  onFinish({
                    id: activeBookModalContent?.id,
                    author: activeBookModalContent.author,
                    picture: activeBookModalContent.picture,
                    title: activeBookModalContent.title,
                  })
                   successToast("Book marked as read");
                  sheetReference.current?.dismiss();
                }
              }}
            />
            <SelectItem
              icon={Trash}
              title={"Remove from library"}
              color={Color.white}
              onPress={() => {
                if (activeBookModalContent?.id) {
                  removeFromLibrary(activeBookModalContent?.id);
                  sheetReference.current?.dismiss();
                }
              }}
            />
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
};
