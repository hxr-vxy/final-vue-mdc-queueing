<script setup>
import { watch } from 'vue'
import { useQueue } from '../composables/useQueue'
import { useNotification } from '../composables/useNotification'
import SchoolHeader from '../components/common/SchoolHeader.vue'
import AppButton from '../components/common/AppButton.vue'
import QueueOverview from '../components/client/QueueOverview.vue'
import QueueVisual from '../components/client/QueueVisual.vue'
import QueueStatus from '../components/client/QueueStatus.vue'
import JoinQueueForm from '../components/client/JoinQueueForm.vue'
import WaitingQueue from '../components/client/WaitingQueue.vue'

const { queue, current, nextInQueue, waitingCount, lastCall } = useQueue()
const { notify } = useNotification()

// When admin clicks CALL NEXT (even from another tab), lastCall changes via the
// Local Storage `storage` event -> this watcher shows the notification. No refresh needed.
watch(lastCall, (call) => {
  if (!call) return
  notify({
    big: true,
    title: 'NOW SERVING',
    message: `${call.queueNumber}\n${call.name}\n\nPlease proceed to the designated service area.`,
    duration: 15000
  })
})
</script>

<template>
  <SchoolHeader>
    <router-link to="/admin/login"><AppButton variant="secondary" size="sm" icon="user">Admin</AppButton></router-link>
  </SchoolHeader>
  <main class="container client-wide">
    <div class="client-main stack">
      <section class="card">
        <QueueOverview :now-serving="current" :next="nextInQueue" :total="waitingCount" />
        <QueueVisual :waiting="waitingCount" :now-serving="current" />
        <QueueStatus :count="waitingCount" />
      </section>
      <JoinQueueForm />
    </div>
    <aside class="client-side">
      <WaitingQueue :students="queue" />
    </aside>
  </main>
</template>

<style>
/* Wider layout for the Client page only (header aligned with content) */
.site-header .hdr{max-width:1200px}
.container.client-wide{max-width:1200px;display:grid;grid-template-columns:1fr;gap:1rem;align-items:start}
@media(min-width:900px){
  .container.client-wide{grid-template-columns:minmax(0,1.25fr) minmax(300px,1fr)}
  .client-side{position:sticky;top:5rem}
  .client-side .card{max-height:calc(100vh - 6.5rem);overflow-y:auto}
}
</style>
