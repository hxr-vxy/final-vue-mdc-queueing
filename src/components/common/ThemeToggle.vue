<script setup>
// Small circular icon-only theme switch (same on Login, Client and Admin).
import { useTheme } from '../../composables/useTheme'
const { theme, toggle } = useTheme()
</script>

<template>
  <button type="button" class="theme-btn" title="Toggle theme" aria-label="Toggle theme" @click="toggle">
    {{ theme === 'light' ? '☀️' : '🌙' }}
  </button>
</template>
