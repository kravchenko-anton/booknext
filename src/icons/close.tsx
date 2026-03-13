import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const Close = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x"
    {...properties}
  >
    <Path d="M18 6 6 18" />
    <Path d="m6 6 12 12" />
  </Svg>
);
