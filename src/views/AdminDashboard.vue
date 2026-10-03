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
const { queue, current, completedToday, waitingCount, callNext, completeCurrent, removeFromQueue } = useQueue()

const pendingDelete = ref(null)
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
  <main class="container stack">
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
    <CompletedToday :records="completedToday" />
  </main>
  <ConfirmDialog :show="!!pendingDelete" :message="deleteMessage" @confirm="confirmDelete" @cancel="pendingDelete = null" />
</template>
