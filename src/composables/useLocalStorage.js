import { ref, watch } from 'vue'

// One shared reactive ref per key, so every component sees the same data.
const cache = new Map()

/**
 * Reactive localStorage binding.
 * - Falls back to defaultValue when data is missing, malformed or fails `validate`.
 * - Auto-saves on change and syncs from other tabs through the `storage` event
 *   (this is how the client page detects admin actions without a refresh).
 */
export function useLocalStorage(key, defaultValue, validate = () => true) {
  if (cache.has(key)) return cache.get(key)

  const clone = (v) => JSON.parse(JSON.stringify(v))
  const parse = (raw) => {
    try {
      if (raw === null) return clone(defaultValue)
      const parsed = JSON.parse(raw)
      return validate(parsed) ? parsed : clone(defaultValue)
    } catch {
      return clone(defaultValue) // malformed JSON must never crash the app
    }
  }

  const data = ref(parse(localStorage.getItem(key)))

  watch(data, (v) => {
    try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage full/blocked */ }
  }, { deep: true, flush: 'sync' })

  window.addEventListener('storage', (e) => {
    if (e.key === key || e.key === null) data.value = parse(e.newValue)
  })

  cache.set(key, data)
  return data
}
