import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const Feather = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-feather"
    {...properties}
  >
    <Path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
    <Path d="M16 8 2 22" />
    <Path d="M17.5 15H9" />
  </Svg>
);
