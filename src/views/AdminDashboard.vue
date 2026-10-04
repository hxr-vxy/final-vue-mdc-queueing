<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQueue } from '../composables/useQueue'
import { useAuth } from '../composables/useAuth'
import { useNotification } from '../composables/useNotification'
import SchoolHeader from '../components/common/SchoolHeader.vue'
import { useThrottle } from '../composables/useEventLimiter'
import AdminNavbar from '../components/admin/AdminNavbar.vue'
import DashboardSummary from '../components/admin/DashboardSummary.vue'
import CurrentServing from '../components/admin/CurrentServing.vue'
import AdminWaitingQueue from '../components/admin/AdminWaitingQueue.vue'
import CompletedToday from '../components/admin/CompletedToday.vue'
import CallNextButton from '../components/admin/CallNextButton.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'

// PARENT component: owns the data, passes it down via props, handles events emitted by children.
const router = useRouter()
const { session, logout } = useAuth()
const { notify } = useNotification()
const { queue, current, completedToday, waitingCount, callNext, completeCurrent, removeFromQueue, clearCompletedToday } = useQueue()

const pendingDelete = ref(null)
const confirmClear = ref(false)
const deleteMessage = computed(() => pendingDelete.value
  ? `Are you sure you want to remove this student from the queue? (${pendingDelete.value.queueNumber} – ${pendingDelete.value.name})`
  : '')

const handleCallNext = useThrottle(() => {
  const r = callNext()
  notify(r.ok
    ? { big: true, title: 'NEXT STUDENT CALLED', message: `${r.record.queueNumber}\n${r.record.name}\n\nPlease proceed to the service area.`, duration: 6000 }
    : { type: 'info', title: 'Cannot call next', message: r.error, duration: 4000 })
}, 1000) // throttled: shared by CALL NEXT and per-student CALL
function handleComplete() {
  const r = completeCurrent()
  if (!r.ok) notify({ title: 'Nothing to complete', message: r.error, duration: 4000 })
}
function confirmDelete() {
  removeFromQueue(pendingDelete.value.queueNumber)
  pendingDelete.value = null
}
function doClear() {
  clearCompletedToday()
  confirmClear.value = false
}
function handleLogout() {
  logout()
  router.push({ name: 'admin-login' })
  notify({ type: 'success', title: 'Successfully logged out.', duration: 3000 })
}
</script>

<template>
  <SchoolHeader subtitle="Admin Portal">
    <AdminNavbar :username="session?.username" @logout="handleLogout" />
  </SchoolHeader>
  <main class="container admin-wide">
    <div class="admin-main stack">
      <DashboardSummary :waiting="waitingCount" :serving="current ? current.queueNumber : '—'" :completed="completedToday.length" />
      <section class="card">
        <h2>Current Queue</h2>
        <CurrentServing :student="current" @complete="handleComplete" />
        <div class="btn-row" style="margin-top:.9rem">
          <CallNextButton :disabled="!!current || waitingCount === 0" @call-next="handleCallNext" />
          <span v-if="current" class="sub">Complete the current student to call the next one.</span>
        </div>
      </section>
      <AdminWaitingQueue :students="queue" :can-call="!current" @delete="pendingDelete = $event" @call-next="handleCallNext" />
    </div>
    <aside class="admin-side">
      <CompletedToday :records="completedToday" @clear="confirmClear = true" />
    </aside>
  </main>
  <ConfirmDialog :show="confirmClear" message="Are you sure you want to clear today's completed queue?" confirm-label="Yes, clear" @confirm="doClear" @cancel="confirmClear = false" />
  <ConfirmDialog :show="!!pendingDelete" :message="deleteMessage" @confirm="confirmDelete" @cancel="pendingDelete = null" />
</template>

<style>
/* Wider layout for the Admin page only (header aligned with content) */
.site-header .hdr{max-width:1320px}
.container.admin-wide{max-width:1320px;display:grid;grid-template-columns:1fr;gap:1rem;align-items:start}
.admin-side .tbl{min-width:0;font-size:.82rem}
.admin-side .tbl th,.admin-side .tbl td{padding:.4rem .35rem}
@media(min-width:1000px){
  .container.admin-wide{grid-template-columns:minmax(0,1.3fr) minmax(360px,1fr)}
  .admin-side{position:sticky;top:5rem}
  .admin-side .card{max-height:calc(100vh - 6.5rem);overflow-y:auto}
}
</style>
