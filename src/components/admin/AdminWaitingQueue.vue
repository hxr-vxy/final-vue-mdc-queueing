<script setup>
import AdminQueueItem from './AdminQueueItem.vue'
defineProps({ students: { type: Array, default: () => [] }, canCall: Boolean })
defineEmits(['delete', 'call-next'])
</script>

<template>
  <section class="card">
    <h2>Queue Management — Waiting Queue</h2>
    <div v-if="students.length" class="table-wrap">
      <table class="tbl">
        <thead><tr><th>Queue No.</th><th>Name</th><th>Student ID</th><th>Purpose</th><th>Joined</th><th>Actions</th></tr></thead>
        <tbody>
          <!-- Parent -> props -> item; item emits upward and we re-emit. Only the first student
               can be CALLed, which keeps the queue strictly FIFO. -->
          <AdminQueueItem v-for="(s, i) in students" :key="s.queueNumber" :student="s" :position="i + 1"
            :can-call="canCall && i === 0" @call="$emit('call-next')" @delete="$emit('delete', $event)" />
        </tbody>
      </table>
    </div>
    <p v-else class="empty">The waiting queue is empty.</p>
  </section>
</template>
