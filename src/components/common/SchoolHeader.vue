<script setup>
// Compact STICKY header shared by Client + Admin: logos, school name, system title.
import { mdcLogo, castLogo } from '../../utils/schoolAssets'
import ThemeToggle from './ThemeToggle.vue'
defineProps({ subtitle: { type: String, default: '' } })
</script>

<template>
  <header class="site-header">
    <div class="hdr">
      <div v-if="mdcLogo || castLogo" class="hdr-logos">
        <img v-if="mdcLogo" :src="mdcLogo" alt="Mater Dei College Logo" />
        <img v-if="castLogo" :src="castLogo" alt="CAST Logo" />
      </div>
      <div class="hdr-text">
        <div class="hdr-name">MATER DEI COLLEGE</div>
        <div class="hdr-sub">College of Arts, Sciences, and Technology</div>
        <div class="hdr-title">MDC Queueing System<span v-if="subtitle" class="hdr-badge">{{ subtitle }}</span></div>
      </div>
      <div class="hdr-actions"><slot /><ThemeToggle /></div>
    </div>
  </header>
</template>
