import type { SvgType } from "@/icons/index";
import { Circle, Path, Svg } from "react-native-svg";

export const CaseSensitive = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-case-sensitive"
    {...properties}
  >
    <Path d="m3 15 4-8 4 8" />
    <Path d="M4 13h6" />
    <Circle cx="18" cy="12" r="3" />
    <Path d="M21 9v6" />
  </Svg>
);
