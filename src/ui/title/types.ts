import type { TextDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/colors'
import type { SizeType } from '@/utils/types'
import type { ReactNode } from 'react'
import type { fontSettings } from './settings'

export type TitleSizeType = SizeType | ('xl' | 'xxl' | 'xxxl' | 'ssm')
export type TitleProperties = TextDefaultProperties &
	ColorProperties & {
		center?: boolean
		children: ReactNode
		size?: TitleSizeType
		weight?: keyof typeof fontSettings
	}
