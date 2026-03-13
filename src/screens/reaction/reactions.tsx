import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { Close } from '@/icons'
import type { SearchFormDataType } from '@/screens/search/useSearchForm'
import { useReactionStore } from '@/store/reader/reaction-store'
import { Button, Flatlist, ScrollLayout, Title } from '@/ui'
import NothingFount from '@/ui/nothing-fount'
import { SvgButton } from '@/ui/svg-button/svg-button'
import { fontSettings } from '@/ui/title/settings'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import { reactions } from '@/utils/reactions'
import { shareReaction } from '@/utils/share-text'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RefreshControl, TextInput, View } from 'react-native'

dayjs.extend(relativeTime);

const Reactions = () => {
  const { params } = useTypedRoute<"Reactions">();
  const {getReactionByBookId,deleteReaction, syncReactions} = useReactionStore()
  const userReactions = getReactionByBookId(params.id)
  const [filterSettings, setFilterSettings] = React.useState({
    search: "",
    reaction: "",
  });
  const { control, watch, reset } = useForm<SearchFormDataType>({
    mode: "onChange",
    defaultValues: {
      searchTerm: "",
    },
  });

  const clearSearch = () => reset({ searchTerm: "" });

  const searchTerm = watch("searchTerm");
  const { goBack } = useTypedNavigation();
  return (
   <>
   {userReactions ? (
       <ScrollLayout
         refreshControl={
           <RefreshControl
             refreshing={false}
             colors={[Color.white]}
             progressBackgroundColor={Color.transparent}
             onRefresh={() => {
                syncReactions(true);
             }}
           />
         }
       >
      <Controller
        control={control}
        name="searchTerm"
        render={({ field: { value, onChange, onBlur } }) => (
          <View className="border-bordered border-b-[1px] pb-1">
            <View className=" w-full flex-row items-center justify-between px-2">
              <View className="w-3/4 flex-row items-center">
                <Close
                  width={25}
                  height={25}
                  color={Color.white}
                  onPress={goBack}
                />
                <TextInput
                  renderToHardwareTextureAndroid
                  autoCapitalize="none"
                  className="ml-2 w-full pb-1"
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
      <View className="pt-2">
        <Flatlist
          horizontal
          mt={0}
          data={[
            {
              title: "all",
              alt: "all",
              svg: "",
              altEmoji: "",
            },
            ...reactions,
          ]}
          renderItem={({ item }) => {
            if (item.title === "all") {
              return (
                <Button
                  size="sm"
                  className="px-3"
                  variant={
                    filterSettings.reaction === "" ? "primary" : "foreground"
                  }
                  onPress={() =>
                    setFilterSettings({
                      ...filterSettings,
                      reaction: "",
                    })
                  }
                >
                  All
                </Button>
              );
            }
            return (
              <SvgButton
                className="px-3"
                altEmoji={item.altEmoji}
                title={item.title}
                svgUri={item.svg}
                size="sm"
                variant={
                  filterSettings.reaction === item.title
                    ? "primary"
                    : "foreground"
                }
                onPress={() =>
                  setFilterSettings({
                    ...filterSettings,
                    reaction: item.title,
                  })
                }
              />
            );
          }}
        />
      </View>
      <Flatlist
        mt={2}
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <Title
            className="mx-auto"
            size={"md"}
            color={Color.gray}
            weight="medium"
          >
            It's quiet, too quiet
          </Title>
        )}
        data={userReactions.filter(
          (reaction) =>
            reaction?.text?.includes(searchTerm) &&
            (filterSettings.reaction === "" ||
              reaction.type === filterSettings.reaction),
        )}
        renderItem={({ item }) => {
          const emoji = reactions.find(
            (reaction) => reaction.title === item.type,
          );

          return (
            <View className="bg-foreground border-bordered mx-2 rounded-lg border-[1px] p-2 py-2">
              <Title
                size="md"
                className="mb-2"
                numberOfLines={2}
                color={Color.white}
              >
                {item.text}
              </Title>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  {emoji ? (
                    <SvgButton
                      size="sm"
                      title={item.type}
                      altEmoji={emoji?.altEmoji}
                      svgUri={emoji?.svg}
                      variant={"muted"}
                      className="bg-bordered"
                      onPress={() => {
                        setFilterSettings({
                          ...filterSettings,
                          reaction: item.type,
                        });
                      }}
                    />
                  ) : null}
                </View>
                <View className="mt-2 flex-row items-center">
                  <Button
                    size={"sm"}
                    variant="muted"
                    className="bg-bordered mr-2"
                    onPress={() => {
                      shareReaction(item.text);
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size={"sm"}
                    variant="muted"
                    className='bg-bordered'
                    onPress={() => {
                      deleteReaction(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </View>
              </View>
            </View>
          );
        }}
      />

      </ScrollLayout>
      ) : (
       <NothingFount
         text={
           "You haven’t saved any books yet. \n" +
           "Go to the catalog and find something to read."
         }
       />
     )}
    </>
  );
};
export default Reactions;
