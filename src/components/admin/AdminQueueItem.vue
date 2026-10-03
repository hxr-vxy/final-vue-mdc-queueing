<script setup>
import { formatTime } from '../../utils/dateFormatter'
import AppButton from '../common/AppButton.vue'
defineProps({ student: { type: Object, required: true }, position: Number, canCall: Boolean })
defineEmits(['delete', 'call']) // child -> parent
</script>

<template>
  <tr>
    <td class="qn">{{ student.queueNumber }}</td>
    <td>{{ student.name }}</td>
    <td>{{ student.studentId }}</td>
    <td>{{ student.purpose }}</td>
    <td>{{ formatTime(student.joinedAt) }}</td>
    <td><div class="acts">
      <AppButton size="sm" icon="call" :disabled="!canCall" @click="$emit('call', student)">CALL</AppButton>
      <AppButton variant="danger" size="sm" icon="trash" @click="$emit('delete', student)">DELETE</AppButton>
    </div></td>
  </tr>
</template>
