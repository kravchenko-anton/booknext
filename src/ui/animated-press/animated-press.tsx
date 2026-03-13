import type { PressableDefaultProperties } from '@/types/component-types'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'

const AnimatedPress: FC<PropsWithChildren<PressableDefaultProperties>> = ({
	children,
	...properties
}) => (
		<TouchableOpacity
			activeOpacity={0.6}
			{...properties}>
			{children}
		</TouchableOpacity>
	)

export default memo(AnimatedPress)
