<script>
// OPTIONS API DEMONSTRATION
// Most of the project uses the Composition API (<script setup>). This small component
// intentionally uses the Options API (props / data / computed / methods) plus a mixin,
// so both styles can be compared side by side for learning purposes.
import exampleMixin from '../../mixins/exampleMixin'

export default {
  name: 'StatusBadge',
  mixins: [exampleMixin], // mixin shown for education only; composables are preferred for real logic
  props: {
    text: { type: String, required: true },
    tone: { type: String, default: 'info' } // info | success
  },
  data() {
    return { prefix: '' }
  },
  computed: {
    classes() {
      return ['badge', this.tone === 'success' ? 'success' : '']
    },
    label() {
      return this.prefix + this.text
    }
  },
  methods: {
    tooltip() {
      return this.describeSelf() // comes from the mixin
    }
  }
}
</script>

<template>
  <span :class="classes" :title="tooltip()">{{ label }}</span>
</template>
