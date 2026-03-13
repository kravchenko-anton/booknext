import type * as React from 'react'
import type { Animated, StyleProp, View, ViewStyle } from 'react-native'

export type ProgressBarProperties = React.ComponentPropsWithRef<typeof View> & {
	/**
	 * Animated value (between 0 and 1). This tells the progress bar to rely on this value to animate it.
	 * Note: It should not be used in parallel with the `progress` prop.
	 */
	animatedValue?: number
	/**
	 * Progress value (between 0 and 1).
	 * Note: It should not be used in parallel with the `animatedValue` prop.
	 */
	progress: number
	/**
	 * Color of the progress bar. The background color will be calculated based on this but you can change it by passing `backgroundColor` to `style` prop.
	 */

	tintColor?: string
	trackTintColor?: string
	/**
	 * If the progress bar will show indeterminate progress.
	 */
	indeterminate?: boolean
	/**
	 * Whether to show the ProgressBar (true, the default) or hide it (false).
	 */
	visible?: boolean
	/**
	 * Style of filled part of the ProgresBar.
	 */
	fillStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>
	style?: StyleProp<ViewStyle>
	/**
	 * @optional
	 */
	/**
	 * testID to be used on __tests__.
	 */
	testID?: string
}
