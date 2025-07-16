'use client';

import { I18nextProvider } from 'react-i18next';
import il8n from '@/src/il8n'; // ✅ Make sure the filename is `i18n.ts`, not `il8n.ts`

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider il8n={il8n}>{children}</I18nextProvider>;
}
