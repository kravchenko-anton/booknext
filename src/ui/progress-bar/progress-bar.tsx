import type { ProgressBarProperties } from '@/ui/progress-bar/types'
import { Color } from '@/utils/colors'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
	Animated,
	I18nManager,
	Platform,
	StyleSheet,
	View,
	type LayoutChangeEvent
} from 'react-native'

const indeterminateDuration = 2000
const indeterminateMaxWidth = 0.6
const scale = Platform.OS === 'web' ? 1 : 0.5
const { isRTL } = I18nManager

const styles = StyleSheet.create({
	container: {
		height: 4,
		borderRadius: 1.5,
		overflow: 'hidden'
	},
	webContainer: {
		width: '100%',
		height: '100%'
	},
	progressBar: {
		flex: 1
	}
})

const ProgressBar = ({
	tintColor = Color.primary,
	trackTintColor = Color.bordered,
	indeterminate,
	progress = 0,
	visible = true,
	animatedValue,
	style,
	fillStyle,
	testID = 'progress-bar',
	...rest
}: ProgressBarProperties) => {
	const isWeb = Platform.OS === 'web'
	const { current: timer } = useRef<Animated.Value>(new Animated.Value(0))
	const { current: fade } = useRef<Animated.Value>(new Animated.Value(0))
	const passedAnimatedValue =
		useRef<ProgressBarProperties['animatedValue']>(animatedValue)
	const [width, setWidth] = useState<number>(0)
	const [previousWidth, setPreviousWidth] = useState<number>(0)

	const indeterminateAnimation = useRef<Animated.CompositeAnimation | null>(
		null
	)

	useEffect(() => {
		passedAnimatedValue.current = animatedValue
	})

	const startAnimation = useCallback(() => {
		// Show progress bar
		Animated.timing(fade, {
			duration: 200 * scale,
			toValue: 1,
			useNativeDriver: true,
			isInteraction: false
		}).start()

		/**
		 * We shouldn't add @param animatedValue to the
		 * deps array, to avoid the unnecessary loop.
		 * We can only check if the prop is passed initially,
		 * and we do early return.
		 */
		const externalAnimation =
			passedAnimatedValue.current !== undefined &&
			passedAnimatedValue.current >= 0

		if (externalAnimation) {
			return
		}

		// Animate progress bar
		if (indeterminate) {
			if (!indeterminateAnimation.current) {
				indeterminateAnimation.current = Animated.timing(timer, {
					duration: indeterminateDuration,
					toValue: 1,
					// Animated.loop does not work if useNativeDriver is true on web
					useNativeDriver: !isWeb,
					isInteraction: false
				})
			}

			// Reset timer to the beginning
			timer.setValue(0)

			Animated.loop(indeterminateAnimation.current).start()
		} else {
			Animated.timing(timer, {
				duration: 200 * scale,
				toValue: progress ?? 0,
				useNativeDriver: true,
				isInteraction: false
			}).start()
		}
	}, [fade, scale, indeterminate, timer, progress, isWeb])

	const stopAnimation = useCallback(() => {
		// Stop indeterminate animation
		if (indeterminateAnimation.current) {
			indeterminateAnimation.current.stop()
		}

		Animated.timing(fade, {
			duration: 200 * scale,
			toValue: 0,
			useNativeDriver: true,
			isInteraction: false
		}).start()
	}, [fade, scale])

	useEffect(() => {
		if (visible) startAnimation()
		else stopAnimation()
	}, [visible, startAnimation, stopAnimation])

	useEffect(() => {
		if (animatedValue && animatedValue >= 0) {
			timer.setValue(animatedValue)
		}
	}, [animatedValue, timer])

	useEffect(() => {
		// Start animation the very first time when previously the width was unclear
		if (visible && previousWidth === 0) {
			startAnimation()
		}
	}, [previousWidth, startAnimation, visible])

	const onLayout = (event: LayoutChangeEvent) => {
		setPreviousWidth(width)
		setWidth(event.nativeEvent.layout.width)
	}

	return (
		<View
			onLayout={onLayout}
			{...rest}
			accessible
			accessibilityRole='progressbar'
			accessibilityState={{ busy: visible }}
			style={isWeb ? styles.webContainer : null}
			testID={testID}
			accessibilityValue={
				indeterminate ? {} : { min: 0, max: 100, now: progress * 100 }
			}>
			<Animated.View
				style={[
					styles.container,
					{ backgroundColor: trackTintColor, opacity: fade },
					style
				]}>
				{width ? (
					<Animated.View
						testID={`${testID}-fill`}
						style={[
							styles.progressBar,
							{
								width,
								backgroundColor: tintColor,
								transform: [
									{
										translateX: timer.interpolate(
											indeterminate
												? {
														inputRange: [0, 0.5, 1],
														outputRange: [
															(isRTL ? 1 : -1) * 0.5 * width,
															(isRTL ? 1 : -1) *
																0.5 *
																indeterminateMaxWidth *
																width,
															(isRTL ? -1 : 1) * 0.7 * width
														]
													}
												: {
														inputRange: [0, 1],
														outputRange: [(isRTL ? 1 : -1) * 0.5 * width, 0]
													}
										)
									},
									{
										// Workaround for workaround for https://github.com/facebook/react-native/issues/6278
										scaleX: timer.interpolate(
											indeterminate
												? {
														inputRange: [0, 0.5, 1],
														outputRange: [0.0001, indeterminateMaxWidth, 0.0001]
													}
												: {
														inputRange: [0, 1],
														outputRange: [0.0001, 1]
													}
										)
									}
								]
							},
							fillStyle
						]}
					/>
				) : null}
			</Animated.View>
		</View>
	)
}

export default ProgressBar
