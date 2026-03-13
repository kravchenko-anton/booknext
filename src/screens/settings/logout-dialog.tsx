import { Logout } from '@/icons'
import type { RouteProperties } from '@/navigation/navigation-types'
import { useAuthStore } from '@/store/auth/auth-store'
import Alert from '@/ui/alert/alert'

const LogoutAlert = ({ navigation }: RouteProperties) => {
	const { logout } = useAuthStore(state => ({
		logout: state.logout
	}))
	return (
		<Alert
			icon={Logout}
			description='Are you sure you want to logout?'
			acceptText='Logout'
			type='danger'
			onClose={() => navigation?.goBack()}
			onAccept={logout}
		/>
	)
}

export default LogoutAlert
