// ---- Easy-to-change validation configuration ----
// Expected MDC student ID format: 5-digit number (e.g. 18020)
export const STUDENT_ID_PATTERN = /^\d{5}$/
export const STUDENT_ID_EXAMPLE = '18020'
export const NAME_MIN_LENGTH = 3
export const PURPOSE_MIN_LENGTH = 2
const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ.'’\- ]*$/

// Each validator returns an error message, or '' when valid.
export function validateName(value) {
  const v = (value || '').trim()
  if (!v) return 'Name is required.'
  if (v.length < NAME_MIN_LENGTH) return `Name must be at least ${NAME_MIN_LENGTH} characters.`
  if (!NAME_PATTERN.test(v) || (v.match(/[A-Za-zÀ-ÿ]/g) || []).length < 2)
    return 'Name may only contain letters, spaces, apostrophes, hyphens and periods.'
  return ''
}

export function validateStudentId(value) {
  const v = (value || '').trim()
  if (!v) return 'Student ID is required.'
  if (!STUDENT_ID_PATTERN.test(v)) return `Please enter a valid student ID (e.g. ${STUDENT_ID_EXAMPLE}).`
  return ''
}

export function validatePurpose(value) {
  const v = (value || '').trim()
  if (!v) return 'Purpose of visit is required.'
  if (v.length < PURPOSE_MIN_LENGTH) return `Purpose must be at least ${PURPOSE_MIN_LENGTH} characters.`
  return ''
}
