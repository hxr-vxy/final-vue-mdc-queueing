const safe = (iso) => {
  const d = new Date(iso)
  return isNaN(d) ? null : d
}

export const formatDateTime = (iso) =>
  safe(iso)?.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) ?? '—'

export const formatTime = (iso) =>
  safe(iso)?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) ?? '—'

// Local date as YYYY-MM-DD (used for "today" checks and daily queue numbering)
export const dateKey = (d) => {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
export const todayKey = () => dateKey(new Date())
export const isToday = (iso) => {
  const d = safe(iso)
  return !!d && dateKey(d) === todayKey()
}
