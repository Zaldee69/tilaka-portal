// Use type safe message keys with `next-intl`
type Messages = typeof import('./public/locales/en/default.json');
declare interface IntlMessages extends Messages {}
declare module 'react-pdf';

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export {};
