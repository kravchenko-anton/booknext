import LineHeightIcon from '@/screens/reader/components/reader-customization/ui/icons/line-height'
import type { CustomizationStoreActionsType } from '@/store/reader/customization-store'
import type { ThemePackType } from '@/store/reader/theme-pack'
import type { FC } from 'react'
import { View } from 'react-native'

interface LineHeightSettingsProperties {
	lineHeight: number
	changeLineHeight: CustomizationStoreActionsType['changeLineHeight']
	colorScheme: ThemePackType
}
export const LineHeightSettings: FC<LineHeightSettingsProperties> = ({
	changeLineHeight,
	colorScheme,
	lineHeight
}) => (
	<View className='mr-4 flex-row items-center'>
		<LineHeightIcon
			lineCount={3}
			backgroundColor={
				lineHeight === 1.8
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changeLineHeight(1.8)}
		/>
		<LineHeightIcon
			lineCount={4}
			className='mx-3'
			backgroundColor={
				lineHeight === 1.5
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changeLineHeight(1.5)}
		/>
		<LineHeightIcon
			lineCount={5}
			backgroundColor={
				lineHeight === 1.3
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changeLineHeight(1.3)}
		/>
	</View>
)
