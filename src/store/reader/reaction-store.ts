import api from '@/api'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import { fetch } from '@react-native-community/netinfo'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ReactionType  {
	id: string
	type: string
	text: string
	xpath: string
	startOffset: number
	endOffset: number
	book: {
		id: string
		title: string
		author: {
			id: string
			name: string
		}
		picture: string
	}
}

export type ShortReactionType = Omit<ReactionType, 'book'>

export interface UpdateReactionType {
	id: string
	updateObject: Partial<Omit<ReactionType, "id">>
}

export interface ReactionStoreType {
	reactions: ReactionType[]
	hot: {
		create: ReactionType[],
		update: UpdateReactionType[],
		delete: string[]
	}
	lastSyncedAt: Date | null
}
const initialState: ReactionStoreType = {
	reactions: [],
	lastSyncedAt: null,
	hot: {
		create: [],
		update: [],
		delete: []
	}
}
export interface ReactionCatalogType  {
	book: ReactionType["book"]
	reactions: (Omit<ReactionType, 'book'>)[]
	count: number
}

export interface ReactionStoreActionsType {
	syncReactions: (
		syncWithCurrentDay?: boolean
	) => Promise<void>
	createReaction: (reaction: ReactionType) => void
	clearReactions: () => void
	getReactionByBookId: (bookId: string) => ReactionType[]
	getReactionCatalog: () => ReactionCatalogType[]
	findReactionById: (id: string) => Promise<ReactionType | undefined>
	updateReaction: (id: string,reaction: Partial<Omit<ReactionType, "id">>) => void
	deleteReaction: (id:string) => void
}
export const useReactionStore = create<
	ReactionStoreType & ReactionStoreActionsType
>()(
	persist(
		(set,getState) => ({
			...initialState,
			syncReactions: async (syncWithCurrentDay) =>
			{
				const hot = getState().hot
				const lastSyncedAt = getState().lastSyncedAt;
				const {isConnected} = await fetch();
				if (!isConnected) return console.log("😒 no internet connection to sync reaction");
				if (lastSyncedAt && dayjs().diff(dayjs(lastSyncedAt), "day") < 1 && !syncWithCurrentDay) {
					console.log("😒 prevent sync reactions in one day");
					return;
				}
				const {data} = await api.user.syncReaction({
					create: hot.create.map(({book, ...reaction}) => ({
						...reaction,
						bookId: book.id
					})),
					update: hot.update,
					delete: hot.delete
				})
				if(data.length === 0) return console.log("sync reaction return empty", data);
				console.log("😒 synced reactions", data);
				
				set((state) => ({
					...state,
					lastSyncedAt: dayjs().toDate(),
					reactions: data as ReactionType[],
					hot: {
						create: [],
						update: [],
						delete: []
					}
				}));
			},
			getReactionByBookId: (bookId) => getState().reactions.filter((r) => r.book.id === bookId),
			getReactionCatalog: () => {
				const reactions = getState().reactions;
				return reactions.reduce((accumulator, reaction) => {
					const book = reaction.book;
					const index = accumulator.findIndex((r) => r.book.id === book.id);
					if (index === -1) {
						accumulator.push({
							book,
							reactions: [reaction],
							count: 1
						});
					} else {
						accumulator[index].reactions.push(reaction);
						accumulator[index].count++;
					}
					return accumulator;
				}, [] as ReactionCatalogType[]);
			},
			findReactionById: async id => getState().reactions.find(r => r.id === id),
			
			
			createReaction: (reaction) => {
				set((state) => ({
					...state,
					hot: {
						...state.hot,
						create: [...state.hot.create, reaction],
					},
					reactions: [...state.reactions, reaction],
				}));
			},
			
			updateReaction: (id, updateObject) => {
				const hot = getState().hot;
				
				set((state) => {
					let updatedHot = state.hot;
					updatedHot = hot.create.some((r) => r.id === id) ? {
							...updatedHot,
							create: state.hot.create.map((r) =>
								r.id === id ? { ...r, ...updateObject } : r
							),
						} : {
							...updatedHot,
							update: [...state.hot.update, { id, updateObject }],
						};
					
					return {
						...state,
						hot: updatedHot,
						reactions: state.reactions.map((r) =>
							r.id === id ? { ...r, ...updateObject } : r
						),
					};
				});
			},
			
			clearReactions: () => {
				set(initialState);
			},
			
			deleteReaction: (id) => {
				console.log("delete reaction", id);
				
				set((state) => {
					let updatedHot = state.hot;
					updatedHot = updatedHot.create.some((r) => r.id === id) ? {
							...updatedHot,
							create: updatedHot.create.filter((r) => r.id !== id),
						} : {
							...updatedHot,
							delete: [...updatedHot.delete, id],
							update: updatedHot.update.filter((r) => r.id !== id),
						};
					
					return {
						...state,
						reactions: state.reactions.filter((r) => r.id !== id),
						hot: updatedHot,
					};
				});
			},
		}),
		{
			name: 'reaction-store',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
