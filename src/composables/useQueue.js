import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import { isToday, todayKey } from '../utils/dateFormatter'

// Local Storage keys
export const KEYS = {
  queue: 'mdc_queue',               // waiting students (array, FIFO: index 0 is first)
  current: 'mdc_current_serving',   // student being served or null
  completed: 'mdc_completed',       // completed records (array)
  counter: 'mdc_counter',           // { date, last } for daily queue numbers
  lastCall: 'mdc_last_call'         // last "call next" event, used for client notifications
}

const isRecord = (r) => r && typeof r === 'object' && typeof r.queueNumber === 'string' && typeof r.name === 'string'
const isRecordList = (v) => Array.isArray(v) && v.every(isRecord)

export function useQueue() {
  const queue = useLocalStorage(KEYS.queue, [], isRecordList)
  const current = useLocalStorage(KEYS.current, null, (v) => v === null || isRecord(v))
  const completed = useLocalStorage(KEYS.completed, [], isRecordList)
  const counter = useLocalStorage(KEYS.counter, { date: '', last: 0 },
    (v) => v && typeof v.date === 'string' && Number.isInteger(v.last))
  const lastCall = useLocalStorage(KEYS.lastCall, null, (v) => v === null || (v && typeof v.id === 'string'))

  // ---- derived state ----
  const waitingCount = computed(() => queue.value.length)
  const nextInQueue = computed(() => queue.value[0] || null)
  const completedToday = computed(() =>
    completed.value.filter((r) => isToday(r.completedAt))
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)))

  // ---- operations ----
  const getQueue = () => queue.value
  const getCompletedToday = () => completedToday.value

  // Q-001, Q-002 ... resets when the date changes; never reused within a day.
  function generateQueueNumber() {
    if (counter.value.date !== todayKey()) counter.value = { date: todayKey(), last: 0 }
    counter.value = { date: todayKey(), last: counter.value.last + 1 }
    return `Q-${String(counter.value.last).padStart(3, '0')}`
  }

  function addToQueue({ name, studentId, purpose }) {
    const id = studentId.trim()
    const active = [...queue.value, current.value].filter(Boolean)
    if (active.some((r) => r.studentId === id))
      return { ok: false, error: 'This student ID is already in the queue.' }
    const record = {
      queueNumber: generateQueueNumber(),
      name: name.trim().replace(/\s+/g, ' '),
      studentId: id,
      purpose: purpose.trim(),
      joinedAt: new Date().toISOString(),
      status: 'waiting'
    }
    queue.value = [...queue.value, record]
    return { ok: true, record }
  }

  function removeFromQueue(queueNumber) {
    queue.value = queue.value.filter((r) => r.queueNumber !== queueNumber)
  }

  function callNext() {
    if (current.value) return { ok: false, error: 'Complete the current student before calling the next one.' }
    if (!queue.value.length) return { ok: false, error: 'The waiting queue is empty.' }
    const [first, ...rest] = queue.value // FIFO
    const serving = { ...first, status: 'serving', startedAt: new Date().toISOString() }
    queue.value = rest
    current.value = serving
    lastCall.value = { id: `${serving.queueNumber}-${Date.now()}`, queueNumber: serving.queueNumber, name: serving.name }
    return { ok: true, record: serving }
  }

  function completeCurrent() {
    if (!current.value) return { ok: false, error: 'No student is currently being served.' }
    const done = { ...current.value, status: 'completed', completedAt: new Date().toISOString() }
    completed.value = [...completed.value, done]
    current.value = null
    return { ok: true, record: done }
  }

  return {
    queue, current, completed, lastCall,
    waitingCount, nextInQueue, completedToday,
    getQueue, getCompletedToday, addToQueue, removeFromQueue, callNext, completeCurrent
  }
}
