<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useTheme } from '../composables/useTheme'
import { mdcLogo, castLogo, campusImage } from '../utils/schoolAssets'
import AppButton from '../components/common/AppButton.vue'
import AppIcon from '../components/common/AppIcon.vue'
import ThemeToggle from '../components/common/ThemeToggle.vue'

const router = useRouter()
const { login } = useAuth()
const { theme } = useTheme() // global theme (shared with Client + Admin)
const form = reactive({ username: '', password: '' })
const errors = reactive({ username: '', password: '' })
const loginError = ref('')
const showPassword = ref(false)
const bgStyle = computed(() => (campusImage ? { backgroundImage: `url(${campusImage})` } : {}))

function submit() {
  errors.username = form.username.trim() ? '' : 'Username is required.'
  errors.password = form.password ? '' : 'Password is required.'
  loginError.value = ''
  if (errors.username || errors.password) return
  if (login(form.username, form.password)) router.push({ name: 'admin' })
  else loginError.value = 'Invalid username or password.'
}
</script>

<template>
  <main class="login-page" :class="theme">
    <div class="bg" :style="bgStyle"></div>
    <div class="overlay-layer"></div>
    <ThemeToggle class="mode" />

    <div class="content">
      <section class="intro">
        <h1>MDC Queueing System</h1>
        <p class="desc">A simple web-based system that helps students join a queue and allows administrators to manage and monitor students waiting for service.</p>
        <div class="line" aria-label="Students waiting in line">
          <template v-for="n in 4" :key="n">
            <AppIcon name="user" :size="26" />
            <span class="arr">›</span>
          </template>
          <span class="staff"><AppIcon name="call" :size="22" /></span>
        </div>
        <div class="line-labels"><span>BY HARVEY QUIBOL GWAPO</span></div>
      </section>

      <form class="card login-form" novalidate @submit.prevent="submit">
        <div v-if="mdcLogo || castLogo" class="logos">
          <img v-if="mdcLogo" :src="mdcLogo" alt="Mater Dei College Logo" />
          <img v-if="castLogo" :src="castLogo" alt="CAST Logo" />
        </div>
        <h2>Admin Login</h2>
        <div v-if="loginError" class="alert danger">{{ loginError }}</div>
        <div class="field">
          <label for="u">Username</label>
          <input id="u" v-model="form.username" :class="{ invalid: errors.username }" placeholder="Enter username" autocomplete="username" />
          <div v-if="errors.username" class="error">{{ errors.username }}</div>
        </div>
        <div class="field">
          <label for="p">Password</label>
          <div class="pw">
            <input id="p" v-model="form.password" :type="showPassword ? 'text' : 'password'" :class="{ invalid: errors.password }" placeholder="Enter password" autocomplete="current-password" />
            <button type="button" class="toggle" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }}</button>
          </div>
          <div v-if="errors.password" class="error">{{ errors.password }}</div>
        </div>
        <AppButton type="submit" size="lg" block icon="login">LOGIN</AppButton>
        <p class="back"><router-link to="/">← Back to queue</router-link></p>
      </form>
    </div>
  </main>
</template>

<style scoped>
.login-page{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:4rem 1rem 2rem;background:#1e4fa3;
  --ov:linear-gradient(120deg,rgba(15,45,107,.45),rgba(15,45,107,.7))}
.login-page.dark{--ov:linear-gradient(120deg,rgba(4,9,24,.6),rgba(4,9,24,.85))}
.bg{position:absolute;inset:0;background:center/cover no-repeat}
.overlay-layer{position:absolute;inset:0;background:var(--ov)}
.mode{position:absolute;top:.8rem;right:.8rem;z-index:2}

/* One page: campus background everywhere; info on the left, form card on the right */
.content{position:relative;width:100%;max-width:1200px;display:grid;grid-template-columns:1fr;gap:1.5rem;align-items:center;justify-items:center}
.login-form{order:1;width:100%;max-width:400px;padding:1.6rem 1.5rem;border-radius:16px;background:var(--surface);box-shadow:0 12px 36px rgba(0,0,0,.35)}
.intro{order:2;width:100%;max-width:400px;text-align:center;color:#fff}
.intro h1{font-size:clamp(1.5rem,4vw,2.3rem);line-height:1.15;margin:0 0 .8rem;color:#ffd75e}
.desc{margin:0 0 1.1rem;font-size:.95rem;line-height:1.55;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);border-radius:10px;padding:.75rem .95rem}
.line{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:.15rem}
.arr{opacity:.75;font-size:1.3rem;line-height:1;margin:0 .1rem}
.staff{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#ffd75e;color:#0f2d6b;margin-left:.2rem}
.line-labels{margin-top:.5rem;font-size:.65rem;letter-spacing:.1em;opacity:.9}
.logos{display:flex;align-items:center;justify-content:center;gap:1rem;margin-bottom:.8rem}
.logos img{height:64px;width:auto;max-width:42%;object-fit:contain}
.login-form h2{text-align:center;font-size:1.15rem;letter-spacing:.06em;text-transform:uppercase;color:var(--navy);margin-bottom:.9rem}
.pw{position:relative}
.pw input{padding-right:4.2rem}
.toggle{position:absolute;right:.4rem;top:50%;transform:translateY(-50%);border:0;background:none;color:var(--primary);font-weight:600;cursor:pointer}
.back{text-align:center;font-size:.9rem;margin:.8rem 0 0}

@media(min-width:900px){
  .login-page{padding:4rem 3vw 2rem}
  .content{grid-template-columns:minmax(0,1.2fr) 400px;gap:4rem;justify-items:stretch}
  .intro{order:1;max-width:520px;text-align:left}
  .line{justify-content:flex-start}
  .login-form{order:2;justify-self:end}
}
</style>
