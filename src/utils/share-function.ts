import { Share } from 'react-native'

export const share = (message: string) =>
	Share.share({
		message
	})
