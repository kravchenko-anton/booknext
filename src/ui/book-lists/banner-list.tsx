import { Flatlist, Title } from '@/ui'
import type { FlatListProperties } from '@/ui/flatlist/types'
import { Color } from '@/utils/colors'
import { View } from 'react-native'

interface BannerListProperties<T> extends FlatListProperties<T> {
	title: string
}

const BannerList = <T,>({
	title,
	data = [],
	style,
	...properties
}: BannerListProperties<T>) => {
	if (!data?.length) return null
	return (
		<View
			style={style}
			className='bg-foreground border-bordered mb-0 ml-2 mt-4 rounded-[16px] rounded-r-none border-[1px] border-r-0  p-3 px-0'>
			<View className='pl-4'>
				<Title
					weight='bold'
					color={Color.white}
					onPress={() => {
						throw new Error('Check the error.')
					}}>
					{title}
				</Title>
				<Title weight='regular' className='mb-4' size={'sm'} color={Color.gray}>
					{data.length.toString()} books
				</Title>
			</View>
			<Flatlist horizontal px={16} mt={0} data={data} {...properties} />
		</View>
	)
}

export default BannerList
