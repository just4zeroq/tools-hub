import messages from '@intlify/unplugin-vue-i18n/messages';
import { get } from '@vueuse/core';
import type { Plugin } from 'vue';
import { createI18n } from 'vue-i18n';

function getBrowserLocale(): string {
  const navigatorLocale = navigator.language || (navigator as any).userLanguage;

  if (!navigatorLocale) {
    return 'en';
  }

  const locale = navigatorLocale.toLowerCase().split(/[-_]/)[0];

  const availableLocales = ['en', 'de', 'es', 'fr', 'no', 'pt', 'ru', 'uk', 'zh', 'vi'];

  if (availableLocales.includes(locale)) {
    return locale;
  }

  return 'en';
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(),
  fallbackLocale: 'en',
  messages,
});

export const i18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n);
  },
};

export const translate = function (localeKey: string) {
  const hasKey = i18n.global.te(localeKey, get(i18n.global.locale));
  return hasKey ? i18n.global.t(localeKey) : localeKey;
};
