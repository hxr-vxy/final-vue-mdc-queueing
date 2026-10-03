// EDUCATIONAL EXAMPLE ONLY: a Vue mixin (Options API style).
// Mixins merge data/methods/hooks into a component. Problems: name collisions and
// unclear origin of properties. That is why the main queue logic uses COMPOSABLES
// (see src/composables/useQueue.js) instead. Used only by StatusBadge.vue.
export default {
  data() {
    return { mixinMountedAt: null }
  },
  methods: {
    describeSelf() {
      return `Mixin says: ${this.$options.name || 'component'} mounted at ${this.mixinMountedAt}`
    }
  },
  mounted() {
    this.mixinMountedAt = new Date().toLocaleTimeString()
  }
}
