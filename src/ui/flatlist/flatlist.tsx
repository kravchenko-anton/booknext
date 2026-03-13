import { Color } from "@/utils/colors";
import { FlatList as DefaultFlatlist, View } from "react-native";
import Title from "../title/title";
import type { FlatListProperties } from "./types";

const FlatList = <T,>({
  title,
  data = [],
  Ref,
  elementSpacing = 12,
  contentContainerStyle,
  mt = 24,
  className,
  px = 8,
  style,
  ...properties
}: FlatListProperties<T>) => {
  if (data?.length === 0 && !properties.ListEmptyComponent) return null;
  return (
    <>
      <Title
        className="mb-3"
        color={Color.white}
        size="xl"
        weight="medium"
        style={{
          marginTop: mt,
          paddingHorizontal: properties.horizontal ? px : 0,
        }}
      >
        {title}
      </Title>
      <DefaultFlatlist
        renderToHardwareTextureAndroid
        data={data}
        ref={Ref}
        style={title ? style : [{ marginTop: mt }, style]}
        overScrollMode="never"
        bounces={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        decelerationRate="normal"
        ItemSeparatorComponent={() => (
          <View
            style={
              properties.horizontal
                ? { width: elementSpacing }
                : { height: elementSpacing }
            }
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: properties.horizontal ? px : 0,
          paddingBottom: 8,
        }}
        {...properties}
      />
    </>
  );
};

export default FlatList;
