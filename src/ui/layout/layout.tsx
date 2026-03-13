import type { ViewDefaultProperties } from '@/types/component-types'
import { cn } from '@/utils'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout: FC<PropsWithChildren<ViewDefaultProperties>> = ({
	children,
	className,
	...properties
}) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<View className={cn('flex-1 p-2', className)} {...properties}>
			{children}
		</View>
	</SafeAreaView>
)

export default Layout
