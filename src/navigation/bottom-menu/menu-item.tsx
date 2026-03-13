import type {
	MenuItemType,
	TypeNavigate
} from '@/navigation/bottom-menu/menu.list'
import { Title } from '@/ui'
import { AnimatedPressable } from '@/ui/animated-components'
import { usePressAnimation } from '@/ui/animated-press/press-animation'
import { Color } from '@/utils/colors'
import type { FC } from 'react'
import { Pressable } from 'react-native'

interface IMenuItemProperties {
	currentRoute?: string
	item: MenuItemType
	nav: TypeNavigate
}

const MenuItem: FC<IMenuItemProperties> = ({ currentRoute, item, nav }) => {
	const isActive = currentRoute === item.path
	const { pressFunctions, animatedStyle } = usePressAnimation()

	return (
		<Pressable
			className='w-[20%] items-center'
			onPress={() => {
				nav(item.path)
			}}
			{...pressFunctions}>
			<AnimatedPressable style={animatedStyle} pointerEvents='none'>
				<item.icon
					width={25}
					strokeWidth={2}
					stroke={isActive ? Color.white : Color.gray}
					height={25}
				/>
			</AnimatedPressable>
			<Title
				size={'sm'}
				className='mt-0.5'
				weight='bold'
				color={isActive ? Color.white : Color.gray}>
				{item.path}
			</Title>
		</Pressable>
	)
}

export default MenuItem
