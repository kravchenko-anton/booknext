import api from '@/api'
import type { LibraryBookType } from '@/store/reader/library-store'
import { historyByLatestSorting } from '@/utils'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import NetInfo from '@react-native-community/netinfo'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface CompareReadingBook extends Omit<LibraryBookType, 'rating'> {
  lastHistory: ReadingHistoryType | undefined;
}
export interface ReadingHistoryType {
  bookId: string;
  id: string;
  startProgress: number;
  endProgress: number;
  progressDelta: number;
  scrollPosition: number;
  startDate: string;
  endDate: string;
  readingTimeMs: number;
  startFromReadingScreen: boolean;
}
interface ReadingProgressStoreType {
  localHistory: ReadingHistoryType[];
  syncedHistory: ReadingHistoryType[];
  lastSyncedAt: Date | null;
}

const initialState: ReadingProgressStoreType = {
  localHistory: [],
  syncedHistory: [],
  lastSyncedAt: null,
};

interface ReadingProgressStoreActionsType {
  newProgress: (history: ReadingHistoryType) => void;
  lastHistoryByBookId: (bookId: string) => ReadingHistoryType | null
  getInitialHistory: () => ReadingHistoryType | undefined;
  clearHistory: () => void;
  syncHistory: (
    syncWithCurrentDay?: boolean,
  ) => Promise<void>;
  getReadingHistoriesCatalog: (
    books: Omit<LibraryBookType, 'rating'>[],
  ) =>Omit<CompareReadingBook, 'rating'>[];
  updateStartFromReadingScreen: (
    data: Pick<ReadingHistoryType, "id"> & { startFromReadingScreen: boolean },
  ) => void;
}
export const useReadingProgressStore = create<
  ReadingProgressStoreType & ReadingProgressStoreActionsType
>()(
  persist(
    (set, getState) => ({
      ...initialState,
      clearHistory: () => {
        set(initialState)
        return console.log("🔃 clear history");
      },
      syncHistory: async (syncWithCurrentDay ) =>
      {
        const dataToSync = getState().localHistory.map(({startFromReadingScreen, ...h}) => ({
          ...h
        }));
          const lastSyncedAt = getState().lastSyncedAt;
        const {isConnected} = await NetInfo.fetch();
        if (!isConnected) return console.log("🔃 no internet connection");
          // prevent sync in one day, like not less than 1 day
        if (lastSyncedAt && dayjs().diff(dayjs(lastSyncedAt), "day") < 1 && !syncWithCurrentDay)  {
          console.log("🔃 prevent sync in one day");
          return;
        }
        const {data} = await api.user.syncHistory(dataToSync);
        if(data.length === 0) return console.log("🔃 problem with sync history", data);
        console.log("🔃 synced history", data);
        
        set((state) => ({
          ...state,
          lastSyncedAt:dayjs().toDate(),
          syncedHistory: data.map((h) => ({
          ...h,
          startFromReadingScreen: false,
          })),
          localHistory: [],
        }));
      },
      getInitialHistory: () => {
        const history = [...getState().localHistory, ...getState().syncedHistory]
        return historyByLatestSorting(history).find(
          (h) => h.startFromReadingScreen,
        )
      },
      lastHistoryByBookId: (bookId) => {
        const history = [...getState().localHistory, ...getState().syncedHistory].filter((h) => h.bookId === bookId)
        console.log("🔃 last history by book id", history);
        return historyByLatestSorting(history)[0] as ReadingHistoryType | null
      },
      getReadingHistoriesCatalog: (books) => {
        const history = [...getState().localHistory, ...getState().syncedHistory]
        return books.map((book) => {
          const lastHistory = historyByLatestSorting(history).find(
            (h) => h.bookId === book.id,
          )
          return {
            ...book,
            lastHistory,
          }
        }).sort((a, b) => {
          if (!a.lastHistory) return 1
          if (!b.lastHistory) return -1
          return dayjs(b.lastHistory.startDate).diff(dayjs(a.lastHistory.startDate))
        })
      },
      newProgress: (newHistory) => {
        const history = getState().localHistory
        const historyWithSameDay = history.find(
          (h) =>
            dayjs(h.startDate).isSame(newHistory.startDate, "day") &&
            h.bookId === newHistory.bookId,
        )
        if (historyWithSameDay) {
          console.log("⚠️ update progress, its same day", {
            id: newHistory.id,
            sameDayId: historyWithSameDay.id,
            readTime: newHistory.readingTimeMs,
            scrollPosition: newHistory.scrollPosition,
            startProgress: newHistory.startProgress,
            endProgress: newHistory.endProgress,
          });
          return set((state) => ({
            ...state,
            localHistory: state.localHistory.map((h) =>
              h.id === historyWithSameDay.id ? {
              ...newHistory,
                readingTimeMs: h.readingTimeMs + newHistory.readingTimeMs
              }: h,
            ),
          }));
        }

        console.log("⚠️ new progress", {
          id: newHistory.id,
          readTime: newHistory.readingTimeMs,
        });
        set((state) => ({
          ...state,
          localHistory: [...state.localHistory, newHistory],
        }));
      },
      updateStartFromReadingScreen: (
        data: Pick<ReadingHistoryType, "id" | "startFromReadingScreen">,
      ) =>
        set((state) => ({
          ...state,
          localHistory: state.localHistory .map(({ ...h }) =>
            h.id === data.id
              ? { ...h, startFromReadingScreen: data.startFromReadingScreen }
              : h,
          ),
        })),
    }),
    {
      name: "reading-progress-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

