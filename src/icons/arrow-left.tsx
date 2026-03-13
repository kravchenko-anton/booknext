import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const ArrowLeft = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-arrow-left"
    {...properties}
  >
    <Path d="m12 19-7-7 7-7" />
    <Path d="M19 12H5" />
  </Svg>
);
