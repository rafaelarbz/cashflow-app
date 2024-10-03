export const I18N_STORAGE_KEY = "i18n-language"

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', icon: 'fi fi-us' },
  { code: 'pt', label: 'Português', icon: 'fi fi-br' },
] as const
  
export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code']
export type LanguageLabel = typeof SUPPORTED_LANGUAGES[number]['label']
export type LanguageIcon = typeof SUPPORTED_LANGUAGES[number]['icon']