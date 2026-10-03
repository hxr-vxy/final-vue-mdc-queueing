<script setup>
import { formatTime } from '../../utils/dateFormatter'
import AppButton from '../common/AppButton.vue'
import StatusBadge from '../common/StatusBadge.vue'
defineProps({ student: { type: Object, default: null } })
defineEmits(['complete'])
</script>

<template>
  <div v-if="student">
    <div class="serving-name">Queue {{ student.queueNumber }} — {{ student.name }}<StatusBadge text="Serving" tone="success" /></div>
    <div class="details">
      <span>Student ID: <b>{{ student.studentId }}</b></span>
      <span>Purpose: <b>{{ student.purpose }}</b></span>
      <span>Started: <b>{{ formatTime(student.startedAt) }}</b></span>
    </div>
    <AppButton variant="success" icon="check" @click="$emit('complete')">COMPLETE</AppButton>
  </div>
  <p v-else class="empty">No student is currently being served.</p>
</template>
