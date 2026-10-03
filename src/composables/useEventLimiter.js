// Event limiting helpers.
// - useThrottle: run at most once per `delay` ms (good for buttons like JOIN / CALL NEXT)
// - useDebounce: run only after the user stops triggering for `delay` ms (good for live validation)

export function useThrottle(fn, delay = 1000) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last < delay) return
    last = now
    return fn(...args)
  }
}

export function useDebounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
