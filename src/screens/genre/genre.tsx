import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { Loader, ScrollLayout } from '@/ui'
import CatalogList from '@/ui/book-lists/catalog-list'
import Header from '@/ui/header/header'
import { Color } from '@/utils/colors'
import { userLanguage } from '@/utils/constants/user-language'
import { QueryKeys } from '@/utils/query-keys'
import { useQuery } from '@tanstack/react-query'
import { RefreshControl } from 'react-native'

const Genre = () => {
  const { params } = useTypedRoute<"Genre">();
  console.log("params", params);
  const { data: genre, refetch } = useQuery({
    queryKey: QueryKeys.genres.byId(params.id, userLanguage),
    queryFn: () => api.genre.byId(params.id, userLanguage),
    select: (data) => data.data,
  });
  const { navigate } = useTypedNavigation();
  return (
    <>
      <Header.Head>
        <Header.BackWithTitle title={params.name} />
      </Header.Head>

      {genre ? (
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
          <CatalogList
            disabledScroll
            data={genre.books}
            onElementPress={(id) => navigate("Book", { id })}
          />
        </ScrollLayout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Genre;
