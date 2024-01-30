// Use type safe message keys with `next-intl`
type Messages = typeof import('./public/locales/en/default.json');
declare interface IntlMessages extends Messages {}
