import { ReaderFont } from '@/store/reader/customization-store'
import type { ThemePackType } from '@/store/reader/theme-pack'
import { AnimatedPress, Title } from '@/ui'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import { type FC, useEffect, useRef } from 'react'
import { FlatList } from 'react-native-gesture-handler'

interface FontStyleSettingsProperties {
	activeFont: {
		fontFamily: string
		title: string
	}
	changeFontFamily: (font: { fontFamily: string; title: string }) => void
	colorScheme: ThemePackType
}
export const FontStyleSettings: FC<FontStyleSettingsProperties> = ({
	activeFont,
	changeFontFamily,
	colorScheme
}) => {
	const reference = useRef<FlatList>(null)
	useEffect(() => {
		// scroll to active font
		const activeFontIndex = ReaderFont.findIndex(
			font => font.fontFamily === activeFont.fontFamily
		)
		if (activeFontIndex !== -1) {
			reference.current?.scrollToIndex({
				index: activeFontIndex,
				animated: true
			})
		}
	}, [reference])
	return (
		<FlatList
			horizontal
			ref={reference}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: 8
			}}
			data={ReaderFont.map(font => ({
				value: font.fontFamily,
				label: font.title
			}))}
			renderItem={({ item }) => (
				<AnimatedPress
					style={{
						backgroundColor: colorScheme.colorPalette.background.lighter,
						borderColor:
							activeFont.fontFamily === item.value
								? colorScheme.colorPalette.secondary
								: Color.transparent
					}}
					className={cn(
						' mb-2 mr-2 rounded border-[1px] border-transparent p-1 px-4',
						item.value === activeFont.fontFamily && 'border-primary '
					)}
					onPress={() =>
						changeFontFamily({
							fontFamily: item.value,
							title: item.label
						})
					}>
					<Title
						weight='semiBold'
						size={'lg'}
						style={{
							color: colorScheme.colorPalette.text
						}}>
						{item.label}
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
