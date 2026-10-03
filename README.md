# MDC Queueing System (Vue 3)

A frontend-only school queueing system. Students join a queue (no login); an admin logs in to call, complete and remove students. All data lives in the browser's Local Storage — no backend.

## Install & run
```bash
npm install
npm run dev      # development
npm run build    # production build
```
To see live client notifications, open the client page (`/#/`) in one tab and the admin dashboard (`/#/admin`) in another tab of the same browser.

## Demo admin credentials
```
Username: admin
Password: admin123
```
Defined once in `src/composables/useAuth.js`.

## Vue concepts demonstrated
- **Composition API** (`<script setup>`) in most components; **Options API** in `components/common/StatusBadge.vue`
- **Mixin** example: `mixins/exampleMixin.js` (used only by StatusBadge; main logic uses composables)
- **Composables**: `useQueue`, `useLocalStorage`, `useNotification`, `useEventLimiter`, `useAuth`
- **Props / emits**: `AdminDashboard → AdminWaitingQueue → AdminQueueItem` (props down, `delete` up); `CurrentServing` emits `complete`; `CallNextButton` emits `call-next`
- **Forms**: `v-model`, `@submit.prevent`, validation in `utils/validators.js` (student ID pattern is a single constant)
- **Event limiting**: throttle on JOIN QUEUE / CALL NEXT, debounce on live validation
- **Global light/dark theme**: `composables/useTheme.js` (saved as `mdc_theme`), icon button `ThemeToggle.vue`
- **Vue Router** with a navigation guard on `/admin`
- **Watchers** (client notification on `mdc_last_call`, form validation), **computed** properties

## UI
Simple blue/white design with a sticky header (`SchoolHeader`), one button component (`AppButton`) and inline SVG icons (`AppIcon`). Logos are loaded from `src/assets/schoolLogo/` (`utils/schoolAssets.js`).

## Local Storage keys
| Key | Content |
|---|---|
| `mdc_queue` | Waiting students (FIFO) |
| `mdc_current_serving` | Student being served or `null` |
| `mdc_completed` | Completed records |
| `mdc_counter` | `{date, last}` for daily Q-001 numbering |
| `mdc_last_call` | Last "call next" event (drives client notification) |
| `mdc_admin_auth` | Admin session (expires after 8 hours) |
| `mdc_theme` | `light` or `dark` (global theme) |

Malformed or invalid stored data is ignored and replaced with defaults.

## Structure
```
src/
  components/{client,admin,common}/
  composables/   mixins/   router/   utils/   views/
  App.vue  main.js
```
