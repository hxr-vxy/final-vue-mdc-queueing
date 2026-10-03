<script setup>
// Small visual: students in line -> NOW SERVING (icons only, no animation).
import { computed } from 'vue'
import AppIcon from '../common/AppIcon.vue'
const props = defineProps({ waiting: { type: Number, default: 0 }, nowServing: { type: Object, default: null } })
const MAX = 6
const shown = computed(() => Math.min(props.waiting, MAX))
const extra = computed(() => Math.max(0, props.waiting - MAX))
</script>

<template>
  <div class="qv" aria-label="Students waiting in line">
    <AppIcon v-for="n in shown" :key="n" name="user" :size="22" />
    <span v-if="extra" class="more">+{{ extra }}</span>
    <span v-if="!shown" class="sub">No students in line</span>
    <span class="arrow">→</span>
    <span class="qv-now">NOW SERVING {{ nowServing ? nowServing.queueNumber : '—' }}</span>
  </div>
</template>
