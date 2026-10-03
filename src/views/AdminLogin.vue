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
      <!-- LEFT: school info, queue visual, description -->
      <section class="intro">
        <div v-if="mdcLogo || castLogo" class="logos">
          <img v-if="mdcLogo" :src="mdcLogo" alt="Mater Dei College Logo" />
          <img v-if="castLogo" :src="castLogo" alt="CAST Logo" />
        </div>
        <div class="school">MATER DEI COLLEGE</div>
        <div class="school-sub">College of Arts, Sciences, and Technology</div>
        <h1>MDC Queueing System</h1>

        <div class="line" aria-label="Students waiting in line">
          <template v-for="n in 4" :key="n">
            <AppIcon name="user" :size="26" />
            <span class="arr">›</span>
          </template>
          <span class="staff"><AppIcon name="call" :size="22" /></span>
        </div>
        <div class="line-labels"><span>BY HARVEY QUIBOL GWAPO</span></div>

        <p class="desc">A simple web-based system that helps students join a queue and allows administrators to manage and monitor students waiting for service.</p>
      </section>

      <!-- RIGHT: compact login form -->
      <form class="card login-form" novalidate @submit.prevent="submit">
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
.login-page{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:3.5rem 1rem 1.5rem;
  background:#1e4fa3;--ov:linear-gradient(160deg,rgba(30,79,163,.82),rgba(15,45,107,.9))}
.login-page.dark{--ov:linear-gradient(160deg,rgba(8,16,38,.88),rgba(4,9,24,.94))}
.bg{position:absolute;inset:0;background:center/cover no-repeat}
.overlay-layer{position:absolute;inset:0;background:var(--ov)}
.mode{position:absolute;top:.8rem;right:.8rem;z-index:2}

/* Mobile first: sections stacked (logos -> info -> visual -> description -> form) */
.content{position:relative;width:100%;max-width:440px;display:grid;gap:1.5rem}
.intro{text-align:center;color:#fff}
.logos{display:inline-flex;align-items:center;gap:1rem;background:#fff;border-radius:999px;padding:.4rem 1.1rem;margin-bottom:.6rem}
.logos img{height:52px;width:auto;max-width:40vw;object-fit:contain}
.school{font-weight:800;letter-spacing:.1em}
.school-sub{font-size:.85rem;opacity:.9}
.intro h1{font-size:1.45rem;margin:.4rem 0 .6rem;color:#ffd75e}
.line{display:flex;justify-content:center;align-items:center;gap:.15rem}
.arr{opacity:.7;font-size:1.3rem;line-height:1;margin:0 .1rem}
.staff{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#ffd75e;color:#0f2d6b;margin-left:.2rem}
.line-labels{display:flex;justify-content:space-between;max-width:300px;margin:.3rem auto 0;font-size:.62rem;letter-spacing:.1em;opacity:.85}
.desc{margin:.9rem 0 0;font-size:.9rem;line-height:1.5;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);border-radius:10px;padding:.7rem .9rem}

.login-form{box-shadow:0 8px 28px rgba(0,0,0,.3)}
.pw{position:relative}
.pw input{padding-right:4.2rem}
.toggle{position:absolute;right:.4rem;top:50%;transform:translateY(-50%);border:0;background:none;color:var(--primary);font-weight:600;cursor:pointer}
.back{text-align:center;font-size:.9rem;margin:.8rem 0 0}

/* Desktop / laptop: two columns, left = info, right = form */
@media(min-width:900px){
  .content{max-width:960px;grid-template-columns:1.25fr 1fr;gap:3rem;align-items:center}
  .intro{text-align:left}
  .line{justify-content:flex-start}
  .line-labels{margin-left:0;margin-right:0}
  .logos img{height:60px}
}
</style>
