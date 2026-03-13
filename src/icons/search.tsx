import type { SvgType } from "@/icons/index";
import { Circle, Path, Svg } from "react-native-svg";

export const Search = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-search"
    {...properties}
  >
    <Circle cx="11" cy="11" r="8" />
    <Path d="m21 21-4.3-4.3" />
  </Svg>
);
