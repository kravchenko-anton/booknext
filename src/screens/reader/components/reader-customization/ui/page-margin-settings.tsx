import PageMarginIcon from '@/screens/reader/components/reader-customization/ui/icons/page-margin'
import type { CustomizationStoreActionsType } from '@/store/reader/customization-store'
import type { ThemePackType } from '@/store/reader/theme-pack'
import type { FC } from 'react'
import { View } from 'react-native'

interface PageMarginSettingsProperties {
	padding: number
	changePadding: CustomizationStoreActionsType['changePadding']
	colorScheme: ThemePackType
}

export const PageMarginSettings: FC<PageMarginSettingsProperties> = ({
	changePadding,
	padding,
	colorScheme
}) => (
	<View className='ml-4 flex-row items-center'>
		<PageMarginIcon
			className='p-1  pb-0.5'
			backgroundColor={
				padding === 4
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changePadding(4)}
		/>
		<PageMarginIcon
			className='mx-3 p-1.5  pb-0.5'
			backgroundColor={
				padding === 14
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changePadding(14)}
		/>
		<PageMarginIcon
			className='p-2 pb-0.5'
			backgroundColor={
				padding === 20
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changePadding(20)}
		/>
	</View>
)
