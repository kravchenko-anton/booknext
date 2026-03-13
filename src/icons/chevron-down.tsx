import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const ChevronDown = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-down"
    {...properties}
  >
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
