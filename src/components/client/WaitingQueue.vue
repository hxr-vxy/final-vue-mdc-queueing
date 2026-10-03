<script setup>
import QueueItem from './QueueItem.vue'
defineProps({ students: { type: Array, default: () => [] } })
</script>

<template>
  <section class="card">
    <h2>Students Waiting to be Served</h2>
    <ul v-if="students.length" class="rows">
      <QueueItem v-for="(s, i) in students" :key="s.queueNumber" :student="s" :position="i + 1" />
    </ul>
    <p v-else class="empty">No students are waiting.</p>
  </section>
</template>
