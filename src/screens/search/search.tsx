import { useTypedNavigation } from '@/hooks'
import { Close } from '@/icons'
import { useSearch } from '@/screens/search/useSearch'
import { Button, Layout, Loader } from '@/ui'
import CatalogList from '@/ui/book-lists/catalog-list'
import NothingFount from '@/ui/nothing-fount'
import { fontSettings } from '@/ui/title/settings'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import { Controller } from 'react-hook-form'
import { TextInput, View } from 'react-native'

const Search = () => {
  const { searchTerm, books, booksLoading, control, clearSearch } = useSearch();
  const { navigate, goBack } = useTypedNavigation();
  return (
    <Layout className="h-full p-0">
      <Controller
        control={control}
        name="searchTerm"
        render={({ field: { value, onChange, onBlur } }) => (
          <View className="border-bordered border-b-[1px]">
            <View className=" w-full flex-row items-center justify-between px-2 pb-2">
              <View className="w-3/4 flex-row items-center">
                <Close
                  width={25}
                  height={25}
                  color={Color.white}
                  onPress={() => goBack()}
                />
                <TextInput
                  autoFocus
                  renderToHardwareTextureAndroid
                  autoCapitalize="none"
                  className="ml-2 w-full"
                  value={value}
                  placeholderTextColor={Color.gray}
                  placeholder="Type something to search"
                  keyboardAppearance="dark"
                  style={{
                    fontFamily: fontSettings.bold,
                    color: Color.white,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </View>

              <Button
                className={cn(!searchTerm && "hidden")}
                variant="foreground"
                size="sm"
                onPress={() => clearSearch()}
              >
                Clear
              </Button>
            </View>
          </View>
        )}
      />

      {searchTerm ? (
        <View className="flex-1">
          {booksLoading ? (
            <Loader />
          ) : books ? (
            <CatalogList
              data={books}
              onElementPress={(id) => navigate("Book", { id: id })}
            />
          ) : (
            <NothingFount />
          )}
        </View>
      ) : null}
    </Layout>
  );
};

export default Search;
