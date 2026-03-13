import type { SvgType } from "@/icons/index";
import { Line, Svg } from "react-native-svg";

export const ListOrdered = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-list"
    {...properties}
  >
    <Line x1="8" x2="21" y1="6" y2="6" />
    <Line x1="8" x2="21" y1="12" y2="12" />
    <Line x1="8" x2="21" y1="18" y2="18" />
    <Line x1="3" x2="3.01" y1="6" y2="6" />
    <Line x1="3" x2="3.01" y1="12" y2="12" />
    <Line x1="3" x2="3.01" y1="18" y2="18" />
  </Svg>
);
