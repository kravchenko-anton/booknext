import { getFileUrl } from "@/utils/get-file-url";

export type Reaction = {
  title: "angry" | "smile" | "cry" | "unbelievable" | "thinking" | "note";
  alt: string;
  gif: string;
  altEmoji: string;
  description: string;
  svg: string;
};

export const reactions: Reaction[] = [
  {
    title: "note",
    alt: "note",
    description: "Just note",
    gif: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/People/Writing%20Hand.webp",
    altEmoji: "📝",
    svg: getFileUrl("icons/genre/note.svg"),
  },
  {
    title: "angry",
    alt: "angry",
    description: "Angry",
    gif: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Face%20With%20Symbols%20On%20Mouth.webp",
    altEmoji: "😠",
    svg: getFileUrl("icons/genre/angry.svg"),
  },
  {
    title: "smile",
    alt: "smile",
    description: "It funny",
    gif: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Grinning%20Face%20With%20Smiling%20Eyes.webp",
    altEmoji: "😊",
    svg: getFileUrl("icons/genre/smile.svg"),
  },
  {
    title: "cry",
    alt: "cry",
    description: "Cry a lot",
    gif: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Loudly%20Crying%20Face.webp",
    altEmoji: "😢",
    svg: getFileUrl("icons/genre/cry.svg"),
  },
  {
    title: "thinking",
    alt: "thinking",
    description: "Should think about it",
    gif: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Thinking%20Face.webp",
    altEmoji: "🤨",
    svg: getFileUrl("icons/genre/thinking.svg"),
  },
  {
    title: "unbelievable",
    alt: "unbelievable",
    description: "Unbelievable",
    gif: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Exploding%20Head.webp",
    altEmoji: "🤯",
    svg: getFileUrl("icons/genre/unbelievable.svg"),
  },
];
export type reactionsTitles = (typeof reactions)[number]["title"];
