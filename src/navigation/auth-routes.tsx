import Login from '@/screens/auth/login/login'
import Register from '@/screens/auth/register/register'
import Welcome from '@/screens/auth/welcome/welcome'
import type { IRouteType } from './navigation-types'

export const authRoutes: IRouteType[] = [
	{
		name: 'Welcome',
		component: Welcome
	},
	{
		name: 'Login',
		component: Login
	},
	{
		name: 'Register',
		component: Register
	}
]
