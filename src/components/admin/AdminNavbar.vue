<script setup>
import AppButton from '../common/AppButton.vue'
defineProps({ username: { type: String, default: 'admin' } })
defineEmits(['logout'])
</script>

<template>
  <span class="sub">{{ username }}</span>
  <router-link to="/"><AppButton variant="secondary" size="sm" icon="home">Client page</AppButton></router-link>
  <AppButton variant="danger-soft" size="sm" icon="logout" @click="$emit('logout')">LOGOUT</AppButton>
</template>
