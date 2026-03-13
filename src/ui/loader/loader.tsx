import type { ViewDefaultProperties } from '@/types/component-types'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import type { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'

interface LoaderProperties extends ViewDefaultProperties {
	background?: string
	width?: number
	height?: number
}

const Loader: FC<LoaderProperties> = ({
	width = 80,
	height = 80,
	className,
	style,
	background = Color.background,
	...rest
}) => (
	<View
		className={cn('flex-1 items-center justify-center', className)}
		style={[
			{
				backgroundColor: background
			},
			style
		]}
		{...rest}>
		<ActivityIndicator
			size='large'
			color={Color.primary}
			style={{
				width: width,
				height: height
			}}
		/>
	</View>
)

export default Loader
