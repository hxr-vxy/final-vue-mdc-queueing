<script setup>
// Compact STICKY header shared by Client + Admin: logos, school name, system title.
import { mdcLogo, castLogo } from '../../utils/schoolAssets'
import { ref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import AppButton from './AppButton.vue'
defineProps({ subtitle: { type: String, default: '' } })
const showAbout = ref(false)
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
      <div class="hdr-actions"><AppButton variant="secondary" size="sm" icon="info" @click="showAbout = true">About</AppButton><slot /><ThemeToggle /></div>
    </div>
  </header>

  <div v-if="showAbout" class="overlay" @click.self="showAbout = false" @keydown.esc="showAbout = false">
    <div class="dialog about" role="dialog" aria-modal="true" aria-labelledby="about-title">
      <h2 id="about-title">About MDC Queueing System</h2>
      <p>The MDC Queueing System is a simple web-based system built for Mater Dei College. It helps students join a queue online instead of crowding at the service area, and lets them see who is currently being served and who is still waiting.</p>
      <p>Administrators use it to manage and monitor the queue: calling the next student, completing service, removing entries, and reviewing the students completed today.</p>
      <p>Its purpose is to make student services more organized, fair, and convenient for everyone.</p>
      <div class="actions">
        <AppButton variant="primary" @click="showAbout = false">Close</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about{max-width:480px;text-align:left}
.about h2{font-size:1.1rem;color:var(--navy);margin:0 0 .7rem}
.about p{margin:0 0 .7rem;line-height:1.55;font-size:.95rem}
</style>
