import { useMemo } from 'react'
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'

const userConfig = {
	duration: 100,
	useNativeDriver: true
}

export const usePressAnimation = () => {
	const translateY = useSharedValue(0)
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }]
	}))

	const onPressIn = () => {
		translateY.value = withTiming(4, userConfig)
	}
	const onPressOut = () => {
		translateY.value = withTiming(0, userConfig)
	}
	const pressFunctions = useMemo(
		() => ({ onPressIn, onPressOut }),
		[onPressIn, onPressOut]
	)
	return {
		animatedStyle,
		pressFunctions
	}
}
