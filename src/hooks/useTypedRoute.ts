import type { TypeRootStackParameterListType } from '@/navigation/navigation-types'
import type { RouteProp } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

export const useTypedRoute = <
	T extends keyof TypeRootStackParameterListType
>() => useRoute<RouteProp<TypeRootStackParameterListType, T>>()
