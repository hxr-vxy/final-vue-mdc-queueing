import { reactive } from 'vue'

// Shared toast state (module-level so any component can push notifications).
const items = reactive([])
let nextId = 0

export function useNotification() {
  function dismiss(id) {
    const i = items.findIndex((n) => n.id === id)
    if (i > -1) items.splice(i, 1)
  }
  // big: true -> large centered "call" style popup
  function notify({ title, message = '', type = 'info', duration = 10000, big = false }) {
    const id = ++nextId
    items.push({ id, title, message, type, big })
    if (duration) setTimeout(() => dismiss(id), duration)
    return id
  }
  return { items, notify, dismiss }
}
