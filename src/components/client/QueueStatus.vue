<script setup>
import { computed } from 'vue'
const props = defineProps({ count: { type: Number, default: 0 } })
const text = computed(() => `${props.count} ${props.count === 1 ? 'Student' : 'Students'} Waiting`)
</script>

<template>
  <p class="status">Queue Status: <strong>{{ text }}</strong></p>
</template>
