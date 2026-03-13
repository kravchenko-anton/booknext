import { Bookmarked, Home, Search, type SvgType, User } from "@/icons";
import type { TypeRootStackParameterListType } from "@/navigation/navigation-types";

export interface MenuItemType {
  icon: (properties: SvgType) => JSX.Element;
  path: keyof TypeRootStackParameterListType;
}

export type TypeNavigate = (
  screenName: keyof TypeRootStackParameterListType,
) => void;

export const menuItems: MenuItemType[] = [
  {
    icon: Home,
    path: "Featured",
  },

  {
    icon: Search,
    path: "Search",
  },

  {
    icon: Bookmarked,
    path: "Library",
  },
  {
    icon: User,
    path: "Profile",
  },
];
