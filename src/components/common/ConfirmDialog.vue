<script setup>
import AppButton from './AppButton.vue'
// Child component: receives data via props, reports user choices via emits.
defineProps({
  show: Boolean,
  message: { type: String, default: 'Are you sure?' }
})
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-if="show" class="overlay" @click.self="$emit('cancel')">
    <div class="dialog" role="dialog" aria-modal="true">
      <p>{{ message }}</p>
      <div class="actions">
        <AppButton variant="secondary" @click="$emit('cancel')">Cancel</AppButton>
        <AppButton variant="danger" icon="trash" @click="$emit('confirm')">Yes, remove</AppButton>
      </div>
    </div>
  </div>
</template>
