import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { ArrowLeft } from '@/icons'
import { AnimatedIcon, BookCard, Description, Image, Loader, ScrollLayout, Title } from '@/ui'
import BannerList from '@/ui/book-lists/banner-list'
import { Color } from '@/utils/colors'
import { userLanguage } from '@/utils/constants/user-language'
import { QueryKeys } from '@/utils/query-keys'

import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { RefreshControl, View } from 'react-native'

const Author: FC = () => {
  const { params } = useTypedRoute<"Author">();
  const { data: author, error, refetch } = useQuery({
    queryKey: QueryKeys.author.byId(params.id, userLanguage),
    queryFn: () => api.author.byId(params.id, userLanguage),
    select: (data) => data.data,
  });
  console.log(author, error);
  const { navigate, goBack } = useTypedNavigation();
  if (!author) return <Loader />;
  return (
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
        </View>
        <Image
          url={author.picture}
          height={100}
          className="mx-auto -mt-5"
          width={100}
          style={{
            borderRadius: 1000,
            borderWidth: 1,
            borderColor: Color.bordered,
          }}
        />
      </View>

      <Title center numberOfLines={2} weight="bold" size={"xxl"}>
        {author.name}
      </Title>
      <Description center size={16} className="mt-1 px-2 pb-8" weight="light">
        {author.description}
      </Description>

      <BannerList
        title="Best books by this author"
        data={author.books}
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
  );
};

export default Author;
