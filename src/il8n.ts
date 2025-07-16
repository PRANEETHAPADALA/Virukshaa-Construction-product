// src/i18n.ts
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // ✅ Correct import

i18n
  .use(initReactI18next) // ✅ Correct plugin
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          settings: 'Settings',
          generalConfig: 'General Configuration',
          basicSystem: 'Basic system settings and preferences',
          dateTime: 'Date & Time Format',
          formatDesc: 'Configure how dates and times are displayed',
          saveSettings: 'Save Settings',
          resetChanges: 'Reset Changes',
          savedSuccess: 'Settings saved successfully!',
          loading: 'Loading settings...',
          timezone: 'Default Timezone',
          language: 'System Language',
          date_format: 'Date Format'
        }
      },
      es: {
        translation: {
          settings: 'Configuraciones',
          generalConfig: 'Configuración general',
          basicSystem: 'Ajustes básicos del sistema',
          dateTime: 'Formato de fecha y hora',
          formatDesc: 'Configura cómo se muestran las fechas y horas',
          saveSettings: 'Guardar configuración',
          resetChanges: 'Restablecer cambios',
          savedSuccess: '¡Configuración guardada con éxito!',
          loading: 'Cargando configuración...',
          timezone: 'Zona horaria predeterminada',
          language: 'Idioma del sistema',
          date_format: 'Formato de fecha'
        }
      }
    }
  });

export default i18n;
