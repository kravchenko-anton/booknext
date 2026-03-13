import { Title } from '@/ui'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import { View } from 'react-native'

export interface BookCoverProperties {
	title: string
	author?: string
	color: string
	width: number
	height: number
	className?: string
}

export const BookCover = ({
	height = 230,
	author = "Author",
	title = "Title",
	color = "#342E37",
	className = "",
	width = 170,
  }:BookCoverProperties) => <View style={{
		backgroundColor: color,
		width: width,
		height: height,
	}}
	className={cn("rounded-md rounded-l-none p-2",className)}
>
		<View
			className='h-full px-1 border border-gray rounded-none'
		>
			<Title
				center numberOfLines={3} className='mt-4' weight="bold" size={"lg"}>
				{title}
			</Title>
			
			<Title
				center
				className="opacity-80 mt-auto mb-4"
				numberOfLines={2}
				color={Color.white}
				weight="regular"
				size={"md"}
			>
				{author}
			</Title>
		</View>
	</View>