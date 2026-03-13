import type { TextDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/colors'
import type { fontSettings } from '../title/settings'

export type DescriptionProperties = Omit<
	TextDefaultProperties,
	'numberOfLines'
> &
	ColorProperties & {
		center?: boolean
		children: string | number | null
		defaultSentences?: number
		size?: number
		weight?: keyof typeof fontSettings
	}
