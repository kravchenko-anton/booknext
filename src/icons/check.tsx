import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const Check = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="lucide lucide-check"
    {...properties}
  >
    <Path d="M20 6 9 17l-5-5" />
  </Svg>
);
