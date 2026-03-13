import api from '@/api'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import { fetch } from '@react-native-community/netinfo'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { SyncLibraryResponseReadingBooksInnerAuthor } from '../../../api-client'


export type Status = 'reading' | 'finished' | 'saved';
export interface LibraryBookType   {
	id: string;
	title: string;
		author:SyncLibraryResponseReadingBooksInnerAuthor
	picture: string;
	
	status: Status
}

export type BookToAddType = Pick<LibraryBookType, 'id' | 'title' | 'author' | 'picture'>;

export type ShortLibraryBookType = Pick<LibraryBookType, 'status' | 'id'>;

export interface LibraryStoreType {
	library: LibraryBookType[];
	hot: {
		create: ShortLibraryBookType[];
		update: ShortLibraryBookType[];
		delete: string[];
	};
	lastSyncedAt: Date | null;
}

const initialState: LibraryStoreType = {
	library: [],
	lastSyncedAt: null,
	hot: {
		create: [],
		update: [],
		delete: [],
	},
};

export interface LibraryStoreActionsType {
	syncLibrary: (
		syncWithCurrentDay?: boolean
	) => Promise<void>;
	getLibraryCatalog: () => {
		readingBooks: LibraryBookType[];
		finishedBooks: LibraryBookType[];
		savedBooks: LibraryBookType[];
	};
	clearLibrary: () => void;
	toggleSave: (book: BookToAddType) => void;
	startReading: (book: BookToAddType) => void;
	finishReading: (book: BookToAddType) => void;
	isSaved: (id: string) => boolean;
	getBooks: () => LibraryBookType[];
	removeFromLibrary: (id: string) => void;
}

export const useLibraryStore = create<LibraryStoreType & LibraryStoreActionsType>()(
	persist(
		(set, getState) => ({
			...initialState,
			getBooks: () => getState().library,
			syncLibrary: async (syncWithCurrentDay) => {
				const hot = getState().hot
				const lastSyncedAt = getState().lastSyncedAt;
				const {isConnected} = await fetch();
				if (!isConnected) return console.log("😒 no internet connection to sync library");
				if (lastSyncedAt && dayjs().diff(dayjs(lastSyncedAt), "day") < 1 && !syncWithCurrentDay) {
					console.log("😒 prevent sync reactions in one day");
					return;
				}
				console.log("😒 syncing library", hot);
				const {data} = await api.user.syncLibrary([
					...hot.create.map((b) => ({ id: b.id, status: b.status as Status })),
					...hot.update.map((b) => ({ id: b.id, status: b.status as Status })),
					...hot.delete.map((id) => ({ id, status: 'deleted' as Status })),
				]).catch( error => {
					console.log("sync library error", error)
						return { data: null }
				});
				if(
					!data ||
					!data.readingBooks ||
					!data.finishedBooks ||
					!data.savedBooks
				) return console.log("sync library return empty", data);
				console.log("😒 synced reactions", data);
				set({
					library: [
						...data.readingBooks.map((b) => ({ ...b, status: 'reading' as Status })),
						...data.finishedBooks.map((b) => ({ ...b, status: 'finished' as Status })),
						...data.savedBooks.map((b) => ({ ...b, status: 'saved' as Status }))
					],
					lastSyncedAt: new Date(),
					hot: initialState.hot
				})
			},
			clearLibrary: () => {
				set(initialState)
			},
			getLibraryCatalog: () => ({
				readingBooks: getState().library.filter((b) => b.status === 'reading'),
				finishedBooks: getState().library.filter((b) => b.status === 'finished'),
				savedBooks: getState().library.filter((b) => b.status === 'saved'),
			}),
			toggleSave: (book) => {
				set((state) => {
					const existingBook = state.library.find((b) => b.id === book.id);
					return existingBook ? {
							library: state.library.filter((b) => b.id !== book.id),
							hot: {
								...state.hot,
								delete: [...state.hot.delete, book.id],
							},
						} : {
							library: [...state.library, { ...book, status: 'saved' }],
							hot: {
								...state.hot,
								create: [...state.hot.create, { id: book.id, status: 'saved' }],
							},
						};
				});
			},
			startReading: (book) => {
				set((state) => {
					const existingBook = state.library.find((b) => b.id === book.id);
					return existingBook ? {
							library: state.library.map((b) =>
								b.id === book.id ? { ...b, status: 'reading' } : b
							),
							hot: {
								...state.hot,
								update: [...state.hot.update, { id: book.id, status: 'reading' }],
							},
						} : {
							library: [...state.library, { ...book, status: 'reading' }],
							hot: {
								...state.hot,
								create: [...state.hot.create, { id: book.id, status: 'reading' }],
							},
						};
				});
			},
			finishReading: (book) => {
				set((state) => {
					const existingBook = state.library.find((b) => b.id === book.id);
					return existingBook ? {
							library: state.library.map((b) =>
								b.id === book.id ? { ...b, status: 'finished' } : b
							),
							hot: {
								...state.hot,
								update: [...state.hot.update, { id: book.id, status: 'finished' }],
							},
						} : {
							library: [...state.library, { ...book, status: 'finished' }],
							hot: {
								...state.hot,
								create: [...state.hot.create, { id: book.id, status: 'finished' }],
							},
						};
				});
			},
			isSaved: (id) => getState().library.some((b) => b.id === id && b.status === 'saved'),
			removeFromLibrary: (id) => {
				set((state) => ({
					library: state.library.filter((b) => b.id !== id),
					hot: {
						...state.hot,
						delete: [...state.hot.delete, id],
					},
				}));
			},
		}),
		{
			name: 'library-store',
			storage: createJSONStorage(() => zustandStorage),
		}
	)
);
