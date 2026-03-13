import type { SvgType } from "@/icons";
import type { PressableDefaultProperties } from "@/types/component-types";
import type { VividPaletteType } from "@/utils/colors";
import type { SizeProperties, SizeType } from "@/utils/types";

export type ButtonProperties = PressableDefaultProperties &
  SizeProperties & {
    textSize?: SizeType | ("xl" | "xxl");
    icon?: (properties: SvgType) => JSX.Element;
    isLoading?: boolean;
    children?: any;
    isDisabled?: boolean;
    uppercase?: boolean;
    pulse?: boolean;
    variant?: VividPaletteType;
    width?: number | string;
  };
