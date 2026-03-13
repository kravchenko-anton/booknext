import api from '@/api'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import { errorToast } from '@/utils/toast'
import type { AuthDtoType } from '@/validation/auth/auth.schema'
import * as Sentry from '@sentry/react-native'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { AuthOutput } from '../../../api-client'
import { saveTokensStorage } from './auth-helper'

export interface AuthStoreStateType {
	isLoading: 'google' | 'mail-register' | 'mail-login' | false
	authType: 'register' | 'login' | null
	user: AuthOutput['user'] | null
}
export interface AuthStoreActionsType {
	mailLogin: (payload: AuthDtoType) => void
	mailRegister: (payload: AuthDtoType) => void
	googleLogin: (payload: { socialId: string }) => void
	logout: () => void
}

export const initialState: AuthStoreStateType = {
	isLoading: false,
	authType: null,
	user: null
}

export const useAuthStore = create<AuthStoreStateType & AuthStoreActionsType>()(
	persist(
		set => ({
			...initialState,
			mailLogin: async ({ email, password }) => {
				set({
					isLoading: 'mail-login'
				})
				api.auth
					.mailLogin({ email, password })
					.then(({ data: loginResponse }) => {
						if (!loginResponse.accessToken)
							throw new Error("Couldn't login")
						saveTokensStorage({
							accessToken: loginResponse.accessToken,
							refreshToken: loginResponse.refreshToken
						})
						set({
							isLoading: false,
							user: loginResponse.user,
							authType: 'login'
						})
						Sentry.metrics.increment('mail-login')
					})
					.catch(error => {
						console.log(JSON.stringify(error))
						errorToast("Couldn't login")
						set({
							isLoading: false,
							user: null,
							authType: null
						})
					})
			},
			mailRegister: async ({ email, password }) => {
				set({
					isLoading: 'mail-register'
				})
				api.auth
					.mailRegister({ email, password })
					.then(({ data: registerResponse }) => {
						if (!registerResponse.accessToken)
							throw new Error("Couldn't register")
						saveTokensStorage({
							accessToken: registerResponse.accessToken,
							refreshToken: registerResponse.refreshToken
						})
						set({
							isLoading: false,
							user: registerResponse.user,
							authType: 'register'
						})
						Sentry.metrics.increment('mail-register')
					})
					.catch(error => {
						console.error(JSON.stringify(error))
						errorToast("Couldn't register")
						set({
							isLoading: false,
							user: null,
							authType: null
						})
					})
			},
			googleLogin: async socialId => {
				console.log('googleLogin')
				set({
					isLoading: 'google'
				})
				api.auth
					.googleSign(socialId)
					.then(({ data: loginResponse }) => {
						if (!loginResponse.accessToken)
							throw new Error("Couldn't login")
						saveTokensStorage({
							accessToken: loginResponse.accessToken,
							refreshToken: loginResponse.refreshToken
						})
						set({
							isLoading: false,
							user: loginResponse.user,
							authType: loginResponse.type as 'register' | 'login'
						})
						Sentry.metrics.increment('google-login')
					})
					.catch(error => {
						console.error(error)

						errorToast("Couldn't login")
						set({
							isLoading: false,
							user: null,
							authType: null
						})
					})
			},
			logout: () => {
				set({
					isLoading: false,
					user: null,
					authType: null
				})
				Sentry.metrics.increment('logout')
			}
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => zustandStorage),
			partialize: ({isLoading, ...rest}) => ({  ...rest })
		}
	)
)
