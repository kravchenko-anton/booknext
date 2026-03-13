import { cn } from "@/utils";
import { getFileUrl } from "@/utils/get-file-url";
import type { FC } from "react";
import { Image as DefaultImage } from "react-native";
import type { ImageProperties } from "./types";

const Image: FC<ImageProperties> = ({
  height = 100,
  width = 100,
  borderRadius = 12,
  url = "",
  className,
  style,
  fullSize = false,
  ...properties
}) => (
  <DefaultImage
    className={cn("bg-muted", fullSize ? "h-full" : "h-max", className)}
    source={{
      uri: getFileUrl(url),
      width,
      height,
    }}
    style={[
      {
        width,
        height,
        borderRadius,
      },
      style,
    ]}
    {...properties}
  />
);

export default Image;
