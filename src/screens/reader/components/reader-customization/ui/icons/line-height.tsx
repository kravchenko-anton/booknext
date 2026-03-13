import type { PressableDefaultProperties } from '@/types/component-types'
import { AnimatedPress } from '@/ui'
import { Color } from '@/utils/colors'
import type { FC } from 'react'
import { View } from 'react-native'

interface LineHeightIconProperties extends PressableDefaultProperties {
	backgroundColor: string
	lineCount: number
}

const lineStyle = 'w-8 h-[2px]'
const LineHeightIcon: FC<LineHeightIconProperties> = ({
	backgroundColor = Color.black,
	lineCount,
	...properties
}) => (
	<AnimatedPress className='m-0 h-[30px] justify-between p-0' {...properties}>
		{Array.from({ length: lineCount }).map((_line, index) => (
			<View
				key={`${index} line`} // eslint-disable-line react/no-array-index-key -- we don't have a unique key
				className={lineStyle}
				style={{
					backgroundColor: backgroundColor
				}}
			/>
		))}
	</AnimatedPress>
)

export default LineHeightIcon
