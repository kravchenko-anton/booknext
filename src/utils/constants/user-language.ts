import { getLocales } from 'expo-localization'

export const languageValidation = (language: string) => {
if (language === 'ru') return 'ru'
if (language === 'en') return 'en'
return 'en'
}
export const userLanguage = languageValidation(getLocales()[0].languageCode || 'en')