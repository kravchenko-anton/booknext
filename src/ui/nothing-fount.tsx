import { NothingFoundIllustration } from "@/illustrations/nothing-found";
import type { ViewDefaultProperties } from "@/types/component-types";
import { Title } from "@/ui/index";
import { Color } from "@/utils/colors";
import type { FC, PropsWithChildren } from "react";
import { View } from "react-native";

interface NothingFountProperties extends ViewDefaultProperties {
  text?: string;
}

const NothingFount: FC<PropsWithChildren<NothingFountProperties>> = ({
  children,
  text = `It's quiet, too quiet`,
  ...properties
}) => (
  <View className="mt-4 flex-1 items-center justify-start" {...properties}>
    <NothingFoundIllustration width={200} height={180} />
    <Title
      center
      weight="medium"
      numberOfLines={2}
      color={Color.gray}
      size={"md"}
    >
      {text}
    </Title>
    {children}
  </View>
);

export default NothingFount;
