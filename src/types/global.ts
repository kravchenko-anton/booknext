import type { ViewDefaultProperties } from '@/types/component-types'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

export type IconType = FC<SvgProps>

export type Style = ViewDefaultProperties['style']
