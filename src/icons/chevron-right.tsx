import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const ChevronRight = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-right"
    {...properties}
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);
