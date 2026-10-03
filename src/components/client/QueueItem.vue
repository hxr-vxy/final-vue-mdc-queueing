<script setup>
import { formatDateTime } from '../../utils/dateFormatter'
import StatusBadge from '../common/StatusBadge.vue'
defineProps({
  student: { type: Object, required: true },
  position: { type: Number, required: true }
})
</script>

<template>
  <li>
    <span class="qn">{{ student.queueNumber }}</span>
    <span class="who">
      {{ student.name }}<StatusBadge v-if="position === 1" text="Next" />
      <div class="sub">ID: {{ student.studentId }}</div>
    </span>
    <span class="when">{{ formatDateTime(student.joinedAt) }}</span>
  </li>
</template>
