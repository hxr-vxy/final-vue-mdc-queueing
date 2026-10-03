<script setup>
import { useNotification } from '../../composables/useNotification'
const { items, dismiss } = useNotification()
</script>

<template>
  <div class="toasts" aria-live="polite">
    <div v-for="n in items" :key="n.id" class="toast" :class="[n.type, { big: n.big }]">
      <button aria-label="Dismiss" @click="dismiss(n.id)">×</button>
      <div class="t">{{ n.title }}</div>
      <div class="m">{{ n.message }}</div>
    </div>
  </div>
</template>
