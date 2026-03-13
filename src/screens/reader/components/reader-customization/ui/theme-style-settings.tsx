import { themePack, type ThemePackType } from '@/store/reader/theme-pack'
import { AnimatedPress, Title } from '@/ui'
import { Color } from '@/utils/colors'
import * as Sentry from '@sentry/react-native'
import { type FC, useEffect, useRef } from 'react'
import { FlatList } from 'react-native-gesture-handler'

//TODO: проверить на краши
interface ThemeStyleSettingsProperties {
	changeTheme: (slug: string) => void
	colorScheme: ThemePackType
}
export const ThemeStyleSettings: FC<ThemeStyleSettingsProperties> = ({
	changeTheme,
	colorScheme
}) => {
	const reference = useRef<FlatList>(null)
	useEffect(() => {
		// scroll to active theme
		const activeThemeIndex = themePack.findIndex(
			theme => theme.slug === colorScheme.slug
		)
		if (activeThemeIndex !== -1) {
			reference.current?.scrollToIndex({
				index: activeThemeIndex,
				animated: true
			})
		}
	}, [reference])
	return (
		<FlatList
			horizontal
			ref={reference}
			className='mt-4'
			showsHorizontalScrollIndicator={false}
			data={themePack}
			contentContainerStyle={{
				paddingHorizontal: 8
			}}
			renderItem={({ item: theme }) => (
				<AnimatedPress
					key={`${theme.slug}-${theme.title}`}
					className='mb-4 mr-2 rounded border-[1px] p-1 px-6'
					style={{
						backgroundColor: theme.colorPalette.background.darker,
						borderColor:
							colorScheme.slug === theme.slug
								? colorScheme.colorPalette.primary
								: Color.transparent
					}}
					onPress={() => {
						Sentry.metrics.increment('change-theme')
						changeTheme(theme.slug)
					}}>
					<Title
						weight='semiBold'
						size={'lg'}
						style={{ color: theme.colorPalette.text }}>
						{theme.title}
					</Title>
				</AnimatedPress>
			)}
			onScrollToIndexFailed={info => {
				const wait = new Promise(resolve => setTimeout(resolve, 500))
				wait.then(() => {
					reference.current?.scrollToIndex({
						index: info.index,
						animated: true,
						viewPosition: 0.5
					})
				})
			}}
		/>
	)
}
