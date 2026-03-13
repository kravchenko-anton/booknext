import type {
	FlatListProps,
	ImageProps,
	ScrollViewProps,
	TextProps, TouchableOpacityProps,
	ViewProps
} from 'react-native'

export type ViewDefaultProperties = Pick<
	ViewProps,
	'onLayout' | 'pointerEvents' | 'onMagicTap' | 'style' | 'className'
>

export type FlatListDefaultProperties<T> = Pick<
	FlatListProps<T>,
	| 'horizontal'
	| 'onScrollToIndexFailed'
	| 'onScroll'
	| 'onLayout'
	| 'columnWrapperStyle'
	| 'onScrollBeginDrag'
	| 'onScrollEndDrag'
	| 'onEndReachedThreshold'
	| 'onEndReached'
	| 'ListEmptyComponent'
	| 'ListFooterComponent'
	| 'style'
	| 'className'
	| 'keyExtractor'
	| 'data'
	| 'snapToInterval'
	| 'snapToAlignment'
	| 'scrollEnabled'
	| 'numColumns'
	| 'contentContainerStyle'
	| 'renderItem'
>
export type PressableDefaultProperties = Pick<
	TouchableOpacityProps,
	| 'onLayout'
	| 'onPress'
	| 'style'
	| 'className'
	| 'disabled'
	| 'onBlur'
	| 'onFocus'
	| 'onMagicTap'
	| 'onLongPress'
>

export type TextDefaultProperties = Pick<
	TextProps,
	| 'style'
	| 'onPress'
	| 'onMagicTap'
	| 'className'
	| 'onTextLayout'
	| 'onLayout'
	| 'disabled'
	| 'onLongPress'
	| 'numberOfLines'
>

export type ImageDefaultProperties = Pick<
	ImageProps,
	| 'blurRadius'
	| 'onLoad'
	| 'resizeMode'
	| 'resizeMethod'
	| 'progressiveRenderingEnabled'
	| 'onProgress'
	| 'style'
	| 'className'
	| 'borderRadius'
	| 'fadeDuration'
	| 'defaultSource'
	| 'onError'
>
export type ScrollViewDefaultProperties = Pick<
	ScrollViewProps,
	| 'scrollEnabled'
	| 'refreshControl'
	| 'onResponderEnd'
	| 'onTouchEnd'
	| 'style'
	| 'className'
	| 'children'
	| 'keyboardShouldPersistTaps'
	| 'automaticallyAdjustKeyboardInsets'
	| 'snapToInterval'
	| 'keyboardDismissMode'
	| 'onScroll'
	| 'contentContainerStyle'
	| 'horizontal'
	| 'pointerEvents'
	| 'onLayout'
>
