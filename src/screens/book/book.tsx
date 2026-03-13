import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { ArrowLeft, Book as BookIcon, Bookmarked, Share } from '@/icons'
import { useLibraryStore } from '@/store/reader/library-store'
import { AnimatedIcon, BookCard, Button, Description, Flatlist, Image, Loader, ScrollLayout, Title } from '@/ui'
import BannerList from '@/ui/book-lists/banner-list'
import { SvgButton } from '@/ui/svg-button/svg-button'
import { Color } from '@/utils/colors'
import { userLanguage } from '@/utils/constants/user-language'
import { QueryKeys } from '@/utils/query-keys'
import { shareBook } from '@/utils/share-text'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import * as Haptics from 'expo-haptics'
import type { FC } from 'react'
import { useRef } from 'react'
import { RefreshControl, View } from 'react-native'

const Book: FC = () => {
  const { params } = useTypedRoute<"Book">();
  const { data: book, refetch } = useQuery({
    queryKey: QueryKeys.book.infoById(params.id, userLanguage),
    queryFn: () => api.book.infoById(params.id, userLanguage),
    select: (data) => data.data,
    gcTime: 1000 * 60 * 60 * 24,
  });
  
  
  const {isSaved,toggleSave, startReading} = useLibraryStore()
  const sheetReference = useRef<BottomSheetModal>(null);
  const { navigate, goBack } = useTypedNavigation();
  if (!book) return <Loader />;
  return (
    <>
      <ScrollLayout
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[Color.white]}
            progressBackgroundColor={Color.transparent}
            onRefresh={refetch}
          />
        }
      >
        <View className="z-50 items-center justify-between overflow-hidden rounded-b-none rounded-t-2xl px-2 pb-4 pt-2">
          <View className="mt-1 w-full flex-row items-start justify-between">
            <AnimatedIcon
              variant="foreground"
              icon={ArrowLeft}
              size="sm"
              onPress={() => goBack()}
            />
            <View>
              <AnimatedIcon
                variant="muted"
                icon={Bookmarked}
                fatness={2}
                size="md"
                className="ml-3"
                fill={!!isSaved(book.id)}
                onPress={() => {
                  toggleSave({
                    id: book.id,
                    title: book.title,
                    picture: book.picture,
                    author: {
                      name: book.author.name,
                      id: book.author.id,
                    }
                  })
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
              />
              <AnimatedIcon
                className="ml-3 mt-2"
                variant="foreground"
                icon={Share}
                size="sm"
                onPress={() => shareBook(book.title)}
              />
            </View>
          </View>
          <Image
            url={book.picture}
            height={220}
            className="mx-auto -mt-16"
            width={150}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: Color.bordered,
            }}
          />
        </View>

        <View className="px-2 pt-2">
          <View className="flex-grow flex-row items-center justify-between gap-2">
            <Title size={"sm"} color={Color.gray} weight="regular">
              {book.rating} Rating • {book.readingTime} read
            </Title>
          </View>
          <Title numberOfLines={2} weight="bold" size={"xl"}>
            {book.title}
          </Title>
          <Title
            numberOfLines={1}
            color={Color.gray}
            weight="regular"
            onPress={() => navigate("Author", { id: String(book.author.id) })}
            size={"sm"}
          >
            {book.author.name}
          </Title>
        </View>

        <View className="flex-row justify-between px-1 pt-4">
          <Button
            onPress={() => sheetReference.current?.present()}
            variant="muted"
            disabled={!book.summary}
            className="mr-2"
            size={"md"}
          >
            Summary
          </Button>
          <Button
            icon={BookIcon}
            className="flex-1"
            variant="primary"
            size="md"
            onPress={() => {
              startReading({
                id: book.id,
                title: book.title,
                picture: book.picture,
                author: {
                  name: book.author.name,
                  id: book.author.id
                }
              })
              
              navigate('Reader', { id: book.id, startFromScratch: true })
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              
            }
          }
          >
            {"Start Reading"}
          </Button>
        </View>
        <View className="flex-row justify-between mt-4 mb-1 px-2 items-center ">
          <Title size="xl" weight="bold" className="">
            What is it about?
          </Title>
        </View>
        <Flatlist
          horizontal
          mt={10}
          data={book.genres}
          renderItem={({ item: genre }) => (
            <SvgButton
              altEmoji={genre.emoji}
              size="sm"
              svgUri={genre.icon}
              title={genre.name}
              onPress={() =>
                navigate("Genre", { id: genre.id, name: genre.name })
              }
            />
          )}
        />

        <Description size={16} className="mt-1 px-2 pb-4" weight="light">
          {book.description}
        </Description>

        <BannerList
          title="From the same author"
          className='mb-8'
          mt={10}
          data={book.fromSameAuthor}
          renderItem={({ item: book }) => (
            <BookCard
              size="md"
              image={{
                uri: book.picture,
              }}
              onPress={() => navigate("Book", { id: book.id })}
            />
          )}
        />
      </ScrollLayout>
      <BottomSheetModal
        enableContentPanningGesture
        enableHandlePanningGesture
        enablePanDownToClose
        enableOverDrag
        index={0}
        ref={sheetReference}
        snapPoints={["30%", "90%"]}
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
        <BottomSheetScrollView>
          <Title
            size="md"
            weight="regular"
            color={Color.white}
            className="px-4 py-2 pb-4 w-full h-full"
            numberOfLines={Number.MAX_SAFE_INTEGER}
          >
            {book.summary}
          </Title>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default Book;
