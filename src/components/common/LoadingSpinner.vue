<script>
// OPTIONS API DEMONSTRATION
// The rest of the project uses the Composition API (<script setup>). This small component
// intentionally uses the Options API (data / props / computed / methods) plus a mixin,
// purely so the two styles can be compared side by side for learning purposes.
import exampleMixin from '../../mixins/exampleMixin'

export default {
  name: 'LoadingSpinner',
  mixins: [exampleMixin], // mixins are shown here only as an example; composables are preferred
  props: { text: { type: String, default: 'Please wait...' } },
  data() {
    return { dots: 0 }
  },
  computed: {
    label() {
      return this.text.replace(/\.+$/, '') + '.'.repeat(this.dots)
    }
  },
  methods: {
    tick() {
      this.dots = (this.dots + 1) % 4
    }
  },
  mounted() {
    this.timer = setInterval(this.tick, 300)
    // eslint-disable-next-line no-console
    console.debug(this.describeSelf())
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
</script>

<template>
  <span><span class="spinner"></span>{{ label }}</span>
</template>
