import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './tr'
import en from './en';


const resources = {
    'tr-TR': tr,
    'en-EN':en
}

i18n.use(initReactI18next)
    .init({
        resources,
        lng: "tr-TR",
        keySeperator: false,
        interpolation: { escapeValue: false }
    });


export default i18n; 