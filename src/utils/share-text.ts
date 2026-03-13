import { appName } from "@/utils/constants/index";
import { share } from "@/utils/share-function";

export const shareBook = async (title: string) =>
  share(`${title} is a great book! Check it on ${appName}!`);

export const shareBookWithAuthor = async (title: string, author: string) =>
  share(`Hey, check out this book ${title} by ${author} on ${appName}`);

export const shareReaction = async (text: string) =>
  share(`Hey, check out this reaction ${text} on ${appName}`);

export const shareText = async (text: string) => share(text);
