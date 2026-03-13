import type { PressableDefaultProperties } from '@/types/component-types'
import { Icon, Title } from '@/ui'
import type { IconProperties } from '@/ui/icon/types'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import React, { type FC } from 'react'
import { Pressable } from 'react-native'

export interface SelectListItemType
	extends PressableDefaultProperties,
		Pick<IconProperties, 'icon'> {
	title: string
	color?: string
}

const SelectItem: FC<SelectListItemType> = ({
	color = Color.gray,
	className,
	title,
	icon,
	...rest
}) => (
	<Pressable
		android_ripple={{ color: Color.muted, foreground: true }}
		className={cn('mb-2 flex-row items-center', className)}
		{...rest}>
		<Icon icon={icon} size={'sm'} stroke={color} variant='transparent' />
		<Title size='md' weight='medium' color={color}>
			{title}
		</Title>
	</Pressable>
)

export default SelectItem
