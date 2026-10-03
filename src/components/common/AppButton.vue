<script setup>
// Reusable button. variant: primary | secondary | success | danger | danger-soft   size: sm | md | lg
import AppIcon from './AppIcon.vue'
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  icon: { type: String, default: '' },
  disabled: Boolean,
  block: Boolean,
  type: { type: String, default: 'button' }
})
</script>

<template>
  <button :type="type" class="btn" :class="[`btn-${variant}`, `btn-${size}`, { block }]" :disabled="disabled">
    <AppIcon v-if="icon" :name="icon" :size="16" />
    <slot />
  </button>
</template>
