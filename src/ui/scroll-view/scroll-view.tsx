import type { ScrollViewDefaultProperties } from '@/types/component-types'
import type { FC } from 'react'
import { ScrollView as DefaultScrollView } from 'react-native-gesture-handler'

const ScrollView: FC<ScrollViewDefaultProperties> = ({ ...properties }) => (
	<DefaultScrollView
		renderToHardwareTextureAndroid
		overScrollMode='never'
		showsHorizontalScrollIndicator={false}
		showsVerticalScrollIndicator={false}
		alwaysBounceHorizontal={false}
		alwaysBounceVertical={false}
		bounces={false}
		bouncesZoom={false}
		decelerationRate='normal'
		{...properties}>
		{properties.children}
	</DefaultScrollView>
)

export default ScrollView
