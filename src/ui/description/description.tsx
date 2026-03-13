import { Color } from '@/utils/colors'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { fontSettings } from '../title/settings'
import type { DescriptionProperties } from './types'

export const Description = ({
	children,
	color = Color.gray,
	weight = 'regular',
	size = 20,
	defaultSentences = 3,
	center = false,
	style,
	...properties
}: DescriptionProperties) => {
	const [expanded, setExpanded] = useState(false)
	if (!children && children !== 0) return null
	const textStyle = {
		fontFamily: fontSettings[weight],
		fontSize: size,
		color,
		textAlign: center ? 'center' : ('left' as 'center' | 'left')
	}

	const originalText = children.toString()
	const sentences = originalText.split(/(?<=[!.?])\s+/)
	const text = expanded
		? originalText
		: sentences.slice(0, defaultSentences).join('')
	return (
		<View style={style}>
			<Text style={textStyle} {...properties}>
				{text}
			</Text>
			{!expanded && sentences.length > defaultSentences && (
				<Text
					style={textStyle}
					className='text-primary underline'
					onPress={() => setExpanded(!expanded)}>
					more
				</Text>
			)}
		</View>
	)
}

export default Description
