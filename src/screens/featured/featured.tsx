import api from '@/api'
import {useTypedNavigation} from '@/hooks'
import {Search} from '@/icons'
import ManageRecommendationMenu from '@/screens/update-recommendation/manage-recommendation-menu'
import {BookCard, Flatlist, Loader, ScrollLayout, Title} from '@/ui'
import BannerList from '@/ui/book-lists/banner-list'
import Header from '@/ui/header/header'
import {SvgButton} from '@/ui/svg-button/svg-button'
import {Color} from '@/utils/colors'
import {userLanguage} from '@/utils/constants/user-language'
import {QueryKeys} from '@/utils/query-keys'
import * as Sentry from '@sentry/react-native'
import {useQuery} from '@tanstack/react-query'
import {useEffect} from 'react'
import {Linking, RefreshControl, TouchableOpacity, View} from 'react-native'

const Featured = () => {
  const {
    data: featured,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: QueryKeys.featured(userLanguage),
    queryFn: () => api.catalog.featured(userLanguage),
    select: (data) => data.data,
  });
  useEffect(() => {
    Sentry.metrics.increment("get-featured");
  }, [isSuccess]);
  console.log(userLanguage)
  const { navigate } = useTypedNavigation();
  return (
    <>
      <Header.Head>
        <Header.Logo className="pl-2" />
        <Header.Icon
          className="pr-2"
          icon={Search}
          onPress={() => navigate("Search")}
        />
      </Header.Head>
      {featured ? (
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
        
          
          <BannerList
            title="Picks of the week"
            data={featured.picksOfWeek}
            renderItem={({ item: book }) => (
              <BookCard
                size="md"
                title={book.title}
                author={book.author.name}
                image={{
                  uri: book.picture,
                }}
                onPress={() => navigate("Book", { id: book.id })}
              />
            )}
          />

          <Flatlist
            horizontal
            data={featured.genres}
            renderItem={({ item: genre }) => (
              <SvgButton
                size="sm"
                altEmoji={genre.emoji}
                svgUri={genre.icon}
                title={genre.name}
                onPress={() => {
                  console.log("genre", genre);
                  navigate("Genre", { id: genre.id, name: genre.name });
                }}
              />
            )}
          />
          <BannerList
            horizontal
            mt={5}
            title="Best selling books"
            data={featured.bestSellingBooks}
            renderItem={({ item: book }) => (
              <BookCard
                size="md"
                title={book.title}
                author={book.author.name}
                image={{
                  uri: book.picture,
                }}
                onPress={() => navigate("Book", { id: book.id })}
              />
            )}
          />
        
          {featured.booksBySelectedGenres.map((list) => (
            <BannerList
              key={list.name}
              className="mb-4"
              title={list.name}
              data={list.books}
              renderItem={({ item: book }) => (
                <BookCard
                  author={book.author.name}
                  size="md"
                  image={{
                    uri: book.picture,
                  }}
                  onPress={() => navigate("Book", { id: book.id })}
                />
              )}
            />
          ))}

          <ManageRecommendationMenu
            onManagePress={() => navigate("UpdateRecommendation")}
          />
          
          <TouchableOpacity
            onPress={() => Linking.openURL("https://t.me/Booknex_app")}
            className='px-4 mx-4 flex-row items-center justify-between py-4 bg-muted border-2 border-bordered rounded-xl mb-4'>
            <View className='pr-2'>
              <Title className="mb-2" size="xl" weight="bold">
                Community Chat
              </Title>
              <Title size="sm" numberOfLines={2} color={Color.gray} weight="light">
                Participate in the active life of the {"\n"}project
              </Title>
            </View>
            <Title size="xxxl" weight="bold">
              📚
            </Title>
          </TouchableOpacity>
        </ScrollLayout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Featured;
