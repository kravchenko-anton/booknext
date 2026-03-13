import type { FlatListDefaultProperties } from '@/types/component-types'
import type { RefObject } from 'react'
import type { FlatList, ListRenderItem } from 'react-native'

export interface FlatListProperties<T> extends FlatListDefaultProperties<T> {
	data: T[] | null
	Ref?: RefObject<FlatList<T>>
	elementSpacing?: number
	title?: string
	mt?: number
	mb?: number
	px?: number
	renderItem: ListRenderItem<T> | null
}
