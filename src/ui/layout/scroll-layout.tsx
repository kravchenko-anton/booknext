import type { ScrollViewDefaultProperties } from "@/types/component-types";
import type { FC, PropsWithChildren } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScrollLayout: FC<PropsWithChildren<ScrollViewDefaultProperties>> = ({
  children,
  ...properties
}) => (
  <SafeAreaView edges={["right", "top", "left"]} className="flex-1">
    <ScrollView
      renderToHardwareTextureAndroid
      automaticallyAdjustContentInsets={false}
      overScrollMode="never"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      bouncesZoom={false}
      decelerationRate="normal"
      className="flex-1"
      {...properties}
    >
      {children}
    </ScrollView>
  </SafeAreaView>
);

export default ScrollLayout;
