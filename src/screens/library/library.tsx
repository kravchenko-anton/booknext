import { useTypedNavigation } from '@/hooks'
import { ReadingList } from '@/screens/library/reading-list'
import { useLibraryStore } from '@/store/reader/library-store'
import { useReadingProgressStore } from '@/store/reader/progress-store'
import { useReactionStore } from '@/store/reader/reaction-store'
import { BookCard, Flatlist, Image, Loader, ScrollLayout, Title } from '@/ui'
import { AnimatedPressable } from '@/ui/animated-components'
import Header from '@/ui/header/header'
import NothingFount from '@/ui/nothing-fount'
import { Color } from '@/utils/colors'
import { RefreshControl, View } from 'react-native'

const Library = () => {
  const { navigate } = useTypedNavigation();
  const { getLibraryCatalog, hot, syncLibrary } = useLibraryStore()
  const { getReactionCatalog, syncReactions } = useReactionStore();
    const {getReadingHistoriesCatalog, syncHistory} = useReadingProgressStore();
    const library = getLibraryCatalog()
  const reactions = getReactionCatalog();
    console.log(hot,"hot")
  if (!library) return <Loader />;
  return (
    <>
      <Header.Head>
        <Header.Title title="Library" />
      </Header.Head>

      {library ? (
        library?.readingBooks.length === 0 &&
        library?.savedBooks.length === 0 &&
          reactions.length === 0 &&
        library?.finishedBooks.length === 0 ? (
          <NothingFount
            text={
              "You haven’t saved any books yet. \n" +
              "Go to the catalog and find something to read."
            }
          />
        ) : (
          <ScrollLayout
            refreshControl={
              <RefreshControl
                refreshing={false}
                colors={[Color.white]}
                progressBackgroundColor={Color.transparent}
                onRefresh={() => {
                  syncHistory(true);
                  syncReactions(true);
                  syncLibrary(true);
                }}
              />
            }
          >
            <ReadingList data={getReadingHistoriesCatalog(library.readingBooks)} />
            <Flatlist
              horizontal
              title="Saved to read"
              data={library.savedBooks}
              renderItem={({ item: book }) => (
                <BookCard
                  size="sm"
                  image={{ uri: book.picture }}
                  author={book.author.name}
                  onPress={() => navigate("Book", { id: book.id })}
                />
              )}
            />
            <Flatlist
              horizontal
              mt={5}
              className="mb-4"
              title="Finished"
              data={library.finishedBooks}
              renderItem={({ item: book }) => (
                <BookCard
                  size="sm"
                  image={{ uri: book.picture }}
                  author={book.author.name}
                  onPress={() => navigate("Book", { id: book.id })}
                />
              )}
            />
            <View className="mx-2">
              <Flatlist
                mt={5}
                className="mb-4"
                title="Reations"
                scrollEnabled={false}
                data={reactions }
                renderItem={({ item: book }) => (
                  <AnimatedPressable
                    className="bg-foreground border-muted flex-row justify-between rounded-lg border-2 px-2 py-1"
                    onPress={() => navigate("Reactions", { id: book.book.id })}
                  >
                    <View className="border-bordered rounded-lg border-[1px]">
                      <Image url={book.book.picture} height={74} width={50} />
                    </View>

                    
                    <View className="ml-2 w-2/3 ">
                      <Title
                        numberOfLines={2}
                        color={Color.white}
                        weight="medium"
                        size={"lg"}
                      >
                        {book.book.title}
                      </Title>
                      <Title
                        numberOfLines={1}
                        weight="regular"
                        size={"md"}
                        color={Color.gray}
                      >
                        {book.book.author.name}
                      </Title>
                    </View>

                    <View className="flex-row  items-center justify-between">
                      <View className="bg-bordered h-[40px] w-[40px] flex-row items-center justify-center rounded-full">
                        <Title
                          size="xl"
                          weight="bold"
                          numberOfLines={1}
                          color={Color.white}
                        >
                          {book.count}
                        </Title>
                      </View>
                    </View>
                  </AnimatedPressable>
                )}
              />
            </View>
          </ScrollLayout>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Library;
