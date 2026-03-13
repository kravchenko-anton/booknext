import LogoutAlert from '@/screens/settings/logout-dialog'
import type { IRouteType } from './navigation-types'

export const modalRoutes: IRouteType[] = [
	{
		name: 'Logout',
		component: LogoutAlert
	}
]

export const fullScreenModalRoutes: IRouteType[] = []
