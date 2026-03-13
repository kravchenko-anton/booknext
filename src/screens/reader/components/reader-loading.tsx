import { Loader } from '@/ui'
import { AnimatedView } from '@/ui/animated-components'
import { screenHeight } from '@/utils/dimensions'
import type { FC } from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export interface ReaderLoadingProperties {
	loading: boolean
	backgroundColor: string
}

export const ReaderLoading: FC<ReaderLoadingProperties> = ({
	loading,
	backgroundColor
}) => {
	const loaderAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(Boolean(loading) ? 1 : 0, { duration: 200 }),
		transform: [
			{
				scale: withTiming(Boolean(loading) ? 1 : 0, { duration: 200 })
			}
		]
	}))
	return (
		<AnimatedView
			pointerEvents='none'
			className='absolute z-50 h-full w-full'
			style={[
				loaderAnimation,
				{
					backgroundColor: backgroundColor,
					height: screenHeight
				}
			]}>
			<Loader background={backgroundColor} />
		</AnimatedView>
	)
}
