import { Image, Pressable, View } from 'react-native'
import Animated from 'react-native-reanimated'

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export const AnimatedView = Animated.createAnimatedComponent(View)
export const AnimatedImage = Animated.createAnimatedComponent(Image)
