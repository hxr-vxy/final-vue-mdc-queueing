<script setup>
// Tiny inline-SVG icon set (no icon library needed).
defineProps({ name: { type: String, required: true }, size: { type: Number, default: 18 } })
const paths = {
  user: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z',
  users: 'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.9 2 2 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z',
  login: 'M10 17l5-5-5-5v3H3v4h7v3zm9-14H12v2h7v14h-7v2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z',
  logout: 'M14 7l-1.4 1.4 2.6 2.6H5v2h10.2l-2.6 2.6L14 17l5-5-5-5zM5 3h8v2H5v14h8v2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
  check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
  trash: 'M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  call: 'M3 10v4h3l5 4V6L6 10H3zm13.5 2A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11H7v-2h4V6h2v7z',
  down: 'M12 4v13.2l-5.6-5.6L5 13l7 7 7-7-1.4-1.4-5.6 5.6V4z',
  hourglass: 'M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6z',
  id: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 8h6v-.5C11 14.5 9.5 14 8 14s-3 .5-3 1.5V16zm9-6v2h6v-2h-6zm0 4v2h5v-2h-5z',
  info: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  home: 'M12 3 2 12h3v8h5v-6h4v6h5v-8h3L12 3z'
}
</script>

<template>
  <svg class="icon" :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="paths[name]" /></svg>
</template>
