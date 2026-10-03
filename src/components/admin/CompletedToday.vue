<script setup>
import { formatTime } from '../../utils/dateFormatter'
defineProps({ records: { type: Array, default: () => [] } })
</script>

<template>
  <section class="card">
    <div class="row"><h2 class="section-title">Completed Today</h2><span class="total-chip">Total: {{ records.length }}</span></div>
    <div v-if="records.length" class="table-wrap">
      <table class="tbl">
        <thead><tr><th>Queue No.</th><th>Name</th><th>Student ID</th><th>Purpose</th><th>Joined</th><th>Completed</th></tr></thead>
        <tbody>
          <tr v-for="r in records" :key="r.queueNumber + r.completedAt">
            <td class="qn">{{ r.queueNumber }}</td><td>{{ r.name }}</td><td>{{ r.studentId }}</td>
            <td>{{ r.purpose }}</td><td>{{ formatTime(r.joinedAt) }}</td><td>{{ formatTime(r.completedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="empty">No students completed yet today.</p>
  </section>
</template>
