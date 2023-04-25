import { ColorSchemeSwitcherValues } from '../types';

const LS_COLOR_SCHEME_KEY = 'kanban:scheme';

export function applyScheme(scheme: ColorSchemeSwitcherValues, persist = false): void {
  (document.querySelector('meta[name="theme-color"]') as HTMLElement).setAttribute(
    'content',
    scheme === ColorSchemeSwitcherValues.DARK ? '#191921' : '#fff'
  );
  document.documentElement.setAttribute('class', scheme);
  persist && localStorage.setItem(LS_COLOR_SCHEME_KEY, scheme);
}

export function getSystemScheme(): ColorSchemeSwitcherValues {
  return window.matchMedia('(prefers-color-scheme:dark)').matches
    ? ColorSchemeSwitcherValues.DARK
    : ColorSchemeSwitcherValues.LIGHT;
}

export function getSavedScheme(): ColorSchemeSwitcherValues | null {
  return localStorage.getItem(LS_COLOR_SCHEME_KEY) as ColorSchemeSwitcherValues | null;
}

export function colorSchemeInitialize(): void {
  applyScheme(getSavedScheme() || getSystemScheme());
}
