import type { SizeProperties } from '@/utils/types'
import type { PressableDefaultProperties } from '../../types/component-types'

export interface BookCardProperties
	extends PressableDefaultProperties,
		SizeProperties {
	title?: string
	author?: string
	image: {
		uri: string
	}
}
