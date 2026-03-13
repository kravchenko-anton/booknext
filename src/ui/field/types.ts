import type { SvgType } from "@/icons";
import type { ClampPaletteType } from "@/utils/colors";
import type { BaseFieldProperties } from "@/utils/types";
import type { FieldValues } from "react-hook-form";
import type { KeyboardTypeOptions, TextInputProps } from "react-native";

export interface FieldProperties<T extends FieldValues>
  extends Omit<
      TextInputProps,
      "onChange" | "onChangeText" | "value" | "testID"
    >,
    BaseFieldProperties<T> {
  isArea?: boolean;
  icon?: (properties: SvgType) => JSX.Element;
  keyboardType?: KeyboardTypeOptions;
  variant?: ClampPaletteType;
}
