import type { ReadingHistoryType } from '@/store/reader/progress-store'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const historyByLatestSorting = (history: ReadingHistoryType[]) =>
  history.sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
  );

export const hexToRgbA = (hex: string, opacity: number) => {
  let c;
  if (/^#([\dA-Fa-f]{3}){1,2}$/.test(hex)) {
    c = hex.slice(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join("")}`;
    // @ts-ignore
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${opacity})`;
  }
  throw new Error("Bad Hex");
};
