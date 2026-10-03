<script setup>
import { useThrottle } from '../../composables/useEventLimiter'
import AppButton from '../common/AppButton.vue'
defineProps({ disabled: Boolean })
const emit = defineEmits(['call-next'])
// THROTTLE: prevents rapid double-clicks from calling two students.
const onClick = useThrottle(() => emit('call-next'), 1000)
</script>

<template>
  <AppButton size="lg" icon="call" :disabled="disabled" @click="onClick">CALL NEXT</AppButton>
</template>
