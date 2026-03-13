import type { FunctionType } from '@/utils/types'

export const doublePress = (callback: FunctionType) => {
	let lastTap = null as null | number
	const delay = 300
	return () => {
		const now = Date.now()
		if (lastTap && now - lastTap < delay) {
			callback()
		} else {
			lastTap = now
		}
	}
}
