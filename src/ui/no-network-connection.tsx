import { NoConnectionIllustration } from "@/illustrations/no-connection";
import type { ViewDefaultProperties } from "@/types/component-types";
import { Title } from "@/ui/index";
import { Color } from "@/utils/colors";
import type { FC, PropsWithChildren } from "react";
import { View } from "react-native";

interface NoNetworkConnectionProperties extends ViewDefaultProperties {
  text?: string;
}

const NoNetworkConnection: FC<
  PropsWithChildren<NoNetworkConnectionProperties>
> = ({
  children,
  text = `No connection to the internet. Please check your connection and try again.`,
  ...properties
}) => (
  <View className="mt-4 flex-1 items-center justify-start" {...properties}>
    <NoConnectionIllustration width={200} height={180} />
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

export default NoNetworkConnection;
