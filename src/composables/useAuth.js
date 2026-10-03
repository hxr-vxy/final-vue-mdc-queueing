import { useLocalStorage } from './useLocalStorage'

// The ONLY place demo credentials live (frontend-only demo, not real security).
export const ADMIN_CREDENTIALS = { username: 'mdc', password: 'harvey14' }
export const AUTH_KEY = 'mdc_admin_auth'
const SESSION_HOURS = 8

const validSession = (s) => s === null || (s && typeof s.username === 'string' && typeof s.expiresAt === 'number')
const session = () => useLocalStorage(AUTH_KEY, null, validSession)

// Used by the router guard.
export function isAuthenticated() {
  const s = session().value
  if (!s) return false
  if (Date.now() > s.expiresAt) { session().value = null; return false }
  return true
}

export function useAuth() {
  const s = session()
  function login(username, password) {
    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      s.value = { username: ADMIN_CREDENTIALS.username, expiresAt: Date.now() + SESSION_HOURS * 3600e3 }
      return true
    }
    return false
  }
  const logout = () => { s.value = null }
  return { session: s, login, logout, isAuthenticated }
}
