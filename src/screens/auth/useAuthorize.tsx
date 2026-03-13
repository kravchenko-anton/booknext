import { useTypedNavigation } from '@/hooks'
import { useAuthStore } from '@/store/auth/auth-store'
import * as Haptics from 'expo-haptics'
import { useEffect } from 'react'

export const useAuthorize = () => {
	const { navigate } = useTypedNavigation()
	const { user, isLoading, authType } = useAuthStore(state => ({
		user: state.user,
		authType: state.authType,
		isLoading: state.isLoading
	}))
	useEffect(() => {
		if (user && authType === 'login')
			//  Matter to prevent error with nested navigation
			 {
			navigate('Featured')
				 Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		}
		if (user && authType === 'register') navigate('Welcome')
	}, [user, authType])

	return {
		isLoading,
		onContinueWithMail: () => navigate('Login'),
		onCreateAccount: () => navigate('Register')
	}
}
