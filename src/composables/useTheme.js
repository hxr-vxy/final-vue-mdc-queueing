import { watch } from 'vue'
import { useLocalStorage } from './useLocalStorage'

// GLOBAL theme state (shared by Login, Client and Admin). Saved in Local Storage as "mdc_theme".
// The value is applied to <html data-theme="light|dark">, and main.css reads it through CSS variables.
const theme = useLocalStorage('mdc_theme', 'light', (v) => v === 'light' || v === 'dark')
const apply = () => { document.documentElement.dataset.theme = theme.value }
apply()
watch(theme, apply, { flush: 'sync' })

export function useTheme() {
  const toggle = () => { theme.value = theme.value === 'light' ? 'dark' : 'light' }
  return { theme, toggle }
}
