import { themePack, type ThemePackType } from '@/store/reader/theme-pack'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const fontSizeSettings = {
	min: 10,
	max: 30
}
export const ReaderFont = [
	{
		title: 'Fira Sans',
		fontFamily: 'FiraSans'
	},
	{
		title: 'Open Sans',
		fontFamily: 'OpenSans'
	},
	{
		title: 'Poppins',
		fontFamily: 'Poppins'
	},
	{
		title: 'PT Serif',
		fontFamily: 'PTSerif'
	},
	{
		title: 'Roboto',
		fontFamily: 'Roboto'
	}
]

export interface CustomizationStoreType {
	colorScheme: ThemePackType
	font: {
		title: string
		fontFamily: string
	}
	fontSize: number
	lineHeight: 1.3 | 1.5 | 1.8
	padding: 14 | 4 | 20
}
export interface CustomizationStoreActionsType {
	changeTheme: (payload: ThemePackType['slug']) => void
	changeLineHeight: (payload: 1.3 | 1.5 | 1.8) => void
	changePadding: (payload: 14 | 4 | 20) => void
	changeFontFamily: (payload: (typeof ReaderFont)[number]) => void
	changeFontSize: (payload: number) => void
}

export const initialState: CustomizationStoreType = {
	colorScheme: themePack[0] as ThemePackType,
	font: {
		title: ReaderFont[0]?.title as string,
		fontFamily: ReaderFont[0]?.fontFamily as string
	},
	fontSize: fontSizeSettings.min * 2,
	lineHeight: 1.3,
	padding: 14
}

export const useCustomizationStore = create<
	CustomizationStoreType & CustomizationStoreActionsType
>()(
	persist(
		set => ({
			...initialState,
			changeTheme: (payload: ThemePackType['slug']) =>
				set(state => ({
					...state,
					colorScheme: themePack.find(
						theme => theme.slug === payload
					) as ThemePackType
				})),
			changeLineHeight: (payload: 1.3 | 1.5 | 1.8) =>
				set(state => ({ ...state, lineHeight: payload })),
			changePadding: (payload: 14 | 4 | 20) =>
				set(state => ({ ...state, padding: payload })),
			changeFontFamily: (payload: (typeof ReaderFont)[number]) =>
				set(state => ({ ...state, font: payload })),
			changeFontSize: (payload: number) =>
				set(state => {
					if (payload < fontSizeSettings.min || payload > fontSizeSettings.max)
						return state
					return { ...state, fontSize: payload }
				})
		}),
		{
			name: 'customization-store',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
