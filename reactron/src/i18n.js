import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import th from './locales/th'

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en,
    th
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: 'en',
        lng: 'en',
        preload: ['en', 'th'],
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,  // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false  // react already safes from xss
        },
        resources
    })

export default i18n
