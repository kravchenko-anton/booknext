import Author from "@/screens/author/author";
import BookImpression from "@/screens/book-impression/book-impression";
import Book from "@/screens/book/book";
import Featured from "@/screens/featured/featured";
import Genre from "@/screens/genre/genre";
import Library from "@/screens/library/library";
import Profile from "@/screens/profile/profile";
import Reactions from "@/screens/reaction/reactions";
import Reader from "@/screens/reader/reader";
import SearchCatalog from "@/screens/search/search";
import Settings from "@/screens/settings/settings";
import UpdateRecommendation from "@/screens/update-recommendation/update-recommendation";
import type { IRouteType } from "./navigation-types";

export const routes: IRouteType[] = [
  {
    name: "Featured",
    component: Featured,
  },
  {
    name: "Author",
    component: Author,
  },
  {
    name: "BookImpression",
    component: BookImpression,
  },
  {
    name: "Search",
    component: SearchCatalog,
  },
  {
    name: "Library",
    component: Library,
  },

  {
    name: "Genre",
    component: Genre,
  },
  {
    name: "Settings",
    component: Settings,
  },
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Reader",
    component: Reader,
  },
  {
    name: "Book",
    component: Book,
  },
  {
    name: "UpdateRecommendation",
    component: UpdateRecommendation,
  },
  {
    name: "Reactions",
    component: Reactions,
  },
];
