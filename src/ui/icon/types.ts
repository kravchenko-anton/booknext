import type { SvgType } from "@/icons";
import type { PressableDefaultProperties } from "@/types/component-types";
import type { ClampPaletteType } from "@/utils/colors";
import type { SizeProperties } from "@/utils/types";

export interface IconProperties
  extends PressableDefaultProperties,
    SizeProperties {
  icon: (properties: SvgType) => React.JSX.Element;
  fatness?: number;
  fill?: boolean;
  stroke?: string;
  isLoading?: boolean;
  noPadding?: boolean;
  variant?: ClampPaletteType | "white-outlined" | "transparent";
  onPress?: () => void;
}
