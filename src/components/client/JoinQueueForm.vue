<script setup>
import { reactive, ref, watch, nextTick } from 'vue'
import { useQueue } from '../../composables/useQueue'
import { useThrottle, useDebounce } from '../../composables/useEventLimiter'
import { validateName, validateStudentId, validatePurpose, STUDENT_ID_EXAMPLE } from '../../utils/validators'
import AppButton from '../common/AppButton.vue'

const PURPOSES = ['Enrollment', 'Request for documents', 'Tuition payment', 'School inquiry']
const emit = defineEmits(['joined']) // child -> parent

const { addToQueue } = useQueue()
const empty = () => ({ name: '', studentId: '', purpose: '' })
const form = reactive(empty())
const errors = reactive(empty())
const touched = reactive({ name: false, studentId: false, purpose: false })
const rules = { name: validateName, studentId: validateStudentId, purpose: validatePurpose }

const success = ref(null)
const submitError = ref('')

const validateField = (f) => (errors[f] = rules[f](form[f])) === ''

// DEBOUNCE: validate live only after the user pauses typing (300ms).
const liveValidate = useDebounce((f) => touched[f] && validateField(f), 300)
Object.keys(rules).forEach((f) =>
  watch(() => form[f], () => { touched[f] = true; success.value = null; liveValidate(f) })
)

async function submit() {
  submitError.value = ''
  const allValid = Object.keys(rules).map(validateField).every(Boolean)
  if (!allValid) { Object.keys(touched).forEach((f) => (touched[f] = true)); return }

  const result = addToQueue({ ...form })
  if (!result.ok) { submitError.value = result.error; return }

  Object.assign(form, empty())
  await nextTick()
  Object.keys(touched).forEach((f) => { touched[f] = false; errors[f] = '' })
  success.value = result.record.queueNumber
  emit('joined', result.record)
}

// THROTTLE: extra clicks within 1 second are ignored (prevents duplicate submission).
const onSubmit = useThrottle(submit, 1000)
</script>

<template>
  <form class="card" novalidate @submit.prevent="onSubmit">
    <h2>Join the Queue</h2>

    <div v-if="success" class="alert success">
      <strong>Successfully joined the queue!</strong><br />
      Your queue number is: <div class="ticket">{{ success }}</div>
    </div>
    <div v-if="submitError" class="alert danger">{{ submitError }}</div>

    <div class="field">
      <label for="name">Name</label>
      <input id="name" v-model="form.name" :class="{ invalid: errors.name }" placeholder="Enter your full name" autocomplete="name" />
      <div v-if="errors.name" class="error">{{ errors.name }}</div>
    </div>
    <div class="field">
      <label for="sid">Student ID</label>
      <input id="sid" v-model="form.studentId" :class="{ invalid: errors.studentId }" :placeholder="`Enter your student ID (e.g. ${STUDENT_ID_EXAMPLE})`" inputmode="numeric" />
      <div v-if="errors.studentId" class="error">{{ errors.studentId }}</div>
    </div>
    <div class="field">
      <label for="purpose">Purpose of Visit</label>
      <input id="purpose" v-model="form.purpose" :class="{ invalid: errors.purpose }" placeholder="Select or enter purpose" list="purposes" />
      <datalist id="purposes"><option v-for="p in PURPOSES" :key="p" :value="p" /></datalist>
      <div v-if="errors.purpose" class="error">{{ errors.purpose }}</div>
    </div>

    <AppButton type="submit" size="lg" block icon="users">JOIN QUEUE</AppButton>
  </form>
</template>
