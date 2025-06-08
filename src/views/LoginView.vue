<script setup lang="ts">
import { ref, onMounted, onBeforeMount, computed, watch } from 'vue'
import { baseParticles } from '@/presets/particles'
import { loadFull } from 'tsparticles'
import moment from 'moment'
import router from '@/router/index'

import { request } from '@/requests/index'
import config from '@/config'
import constants from '@/constants'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useProjectsStore } from '@/stores/projects'
import { useUsersStore, useUserStore } from '@/stores/user'
import { useUserTimeStore } from '@/stores/userTime'
import { useRfidAuthStore } from '@/stores/rfidAuth'

import LoadingBar from '@/components/spinner/LoadingBar.vue'
import IconBroadcast from '@/components/icons/IconBroadcast.vue'
import IconBroadcastOff from '@/components/icons/IconBroadcastOff.vue'

// @ts-expect-error - Unknown type for engine
const particlesInit = async (engine) => {
  console.log('Init Particles...')
  await loadFull(engine)
}
// @ts-expect-error - Unknown type for container
const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}

// Stores
const languageStore = useLanguageStore()
const userStore = useUserStore()
const usersStore = useUsersStore()
const userTimeStore = useUserTimeStore()
const projectsStore = useProjectsStore()
const notificationStore = useNotificationStore()
const rfidAuthStore = useRfidAuthStore()

const logoutCooldown = ref<boolean>(false)
const expandBox = ref<boolean>(false)
const expandFull = ref<boolean>(false)
const showLoadingBar = ref<boolean>(true)
const showCompanyName = ref<boolean>(false)
const showInputUsername = ref<boolean>(false)
const showInputPassword = ref<boolean>(false)
const showButtonLogin = ref<boolean>(false)

const hasRequiredData = computed<boolean>(() => {
  return logoutCooldown.value && usersStore.users.length > 0 && userStore.user.id != null
})
const userInput = ref(null)
const currentMonth = moment().month()

const form_user = ref<string>('')
const form_pw = ref<string>('')

function login() {
  showLoadingBar.value = true
  request.login(form_user.value, form_pw.value).then((response) => {
    if (response.status === 200) {
      setTimeout(userStore.get, 1200)
      usersStore.get()
      userTimeStore.getItems()
      projectsStore.getItems()
    } else if (response.status === 422) {
      showLoadingBar.value = false
      form_pw.value = ''
      notificationStore.addWarn(languageStore.l.notification.warn.wrongUserCreds)
    } else {
      showLoadingBar.value = false
      form_pw.value = ''
      notificationStore.addWarn(response.data.detail)
    }
  })
}

function logout() {
  userStore.logout()
}

function enterApp() {
  showLoadingBar.value = false
  // notificationStore.addInfo(
  //   languageStore.l.notification.info.welcomeMessage(userStore.user.full_name),
  // )
  let previousRoute = localStorage.getItem('gladosActiveRoute')
  if (previousRoute == '/login' || previousRoute == null) {
    previousRoute = '/'
  }
  router.push(previousRoute)
}

watch(hasRequiredData, () => {
  if (hasRequiredData.value) {
    showCompanyName.value = false
    showInputUsername.value = false
    showInputPassword.value = false
    showButtonLogin.value = false
    setTimeout(() => {
      expandFull.value = true
    }, 250)
    setTimeout(enterApp.bind(this), 590)
  }
})

onBeforeMount(() => {
  logout()
})
onMounted(() => {
  setTimeout(() => {
    logoutCooldown.value = true
  }, 100)

  setTimeout(() => {
    showLoadingBar.value = false
    expandBox.value = true
    setTimeout(() => {
      showCompanyName.value = expandBox.value
    }, 50)
    setTimeout(() => {
      showInputUsername.value = expandBox.value
    }, 100)
    setTimeout(() => {
      showInputPassword.value = expandBox.value
    }, 220)
    setTimeout(() => {
      showButtonLogin.value = expandBox.value
    }, 340)
  }, 1500)
})
</script>

<template>
  <div class="login">
    <div class="coat"></div>
    <div class="login-box" v-bind:class="{ expanded: expandBox, full: expandFull }">
      <h1 v-if="!expandFull" v-bind:class="{ expanded: expandBox }">Glados</h1>
      <Transition name="fade-move">
        <h2 key="companyName" v-if="showCompanyName && !expandFull">{{ config.company }}</h2>
      </Transition>
      <Transition name="fade-move">
        <input
          key="inputUsername"
          v-if="showInputUsername && !expandFull"
          v-model="form_user"
          v-on:keyup.enter="login()"
          class="input-username"
          type="text"
          :placeholder="languageStore.l.main.login.usernamePlaceholder"
          ref="userInput"
      /></Transition>
      <Transition name="fade-move">
        <input
          key="inputPassword"
          v-if="showInputPassword && !expandFull"
          v-model="form_pw"
          v-on:keyup.enter="login()"
          class="input-password"
          type="password"
          :placeholder="languageStore.l.main.login.passwordPlaceholder"
      /></Transition>
      <Transition name="fade-move">
        <button
          key="buttonLogin"
          v-if="showButtonLogin && !expandFull"
          v-on:click="login()"
          class="button-login"
        >
          {{ languageStore.l.main.login.loginButton }}
        </button>
      </Transition>
      <Transition name="fade">
        <LoadingBar
          key="loadingBar"
          v-if="(showLoadingBar && !hasRequiredData && !expandFull) || rfidAuthStore.loading"
          class="loading-bar"
        />
      </Transition>
    </div>
  </div>

  <IconBroadcastOff
    v-if="rfidAuthStore.connectionOK && !rfidAuthStore.readerOK"
    class="rfid-auth"
  />
  <IconBroadcast
    v-else-if="rfidAuthStore.connectionOK && rfidAuthStore.readerOK"
    class="rfid-auth"
  />
  <div class="version">{{ `v${constants.version}` }}</div>

  <Particles
    v-if="currentMonth > 1 && currentMonth < 11"
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="baseParticles"
  />
  <div v-else class="snow"></div>
</template>

<style scoped lang="scss">
@use '@/scss/background/snow.scss';

.login {
  color: white;
}

.coat {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: linear-gradient(rgb(25, 25, 25) 30%, rgb(10, 10, 10));
}

.login-box {
  z-index: 1002;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 270px;
  height: 85px;
  transform: translate(-50%, -50%);

  background: var(--main-color);
  border-radius: var(--main-border-radius);

  text-align: center;
  padding: 15px;
  padding-top: 30px;

  box-shadow: 0px 20px 30px 0px rgb(25, 25, 25);

  transition: all 0.2s ease-out;

  &.expanded {
    height: 290px;
  }

  &.full {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border-radius: 1000;
    background-color: rgb(10, 10, 10);
  }
}

.loading-bar {
  position: absolute;
  bottom: 0;
  left: 0;
}

.version {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: min-content;
  height: min-content;
  transform: translateX(-50%);

  padding: 4px;

  font-family: var(--main-font-text);
  font-size: 0.75em;
  font-weight: thin;
  color: white;

  z-index: 1002;
}

h1 {
  font-family: var(--main-font-glados);
  font-size: 3em;
  font-weight: thin;
  padding: 0;
  padding-top: 5px;
  // padding-bottom: 30px;
  margin: 0;

  transition: all 0.2s ease-out;

  &.expanded {
    padding-top: 35px;
  }
}

h2 {
  font-family: var(--main-font-head);
  font-size: 1.1em;
  font-weight: thin;
  padding: 0;
  padding-top: 20px;
  margin: 0;

  transition: all 0.2s ease-out;
}

input {
  position: absolute;
  left: 25px;
  right: 25px;

  // width: 280px;
  height: 30px;

  border: none;
  border-radius: 3px;

  transition: background 0.2s ease;
}

input:hover {
  background: lightgray;
}

button {
  position: absolute;
  left: 25px;
  right: 25px;

  font-family: var(--main-font-head);
  font-weight: 700;

  height: 30px;

  border: none;
  border-radius: 3px;

  transition: background 0.2s ease;
}

button:focus,
button:hover {
  background: lightgray;
}

.input-username {
  bottom: 115px;
}

.input-password {
  bottom: 75px;
}

.button-login {
  bottom: 25px;
}

.rfid-auth {
  position: absolute;
  top: 20px;
  right: 20px;

  width: 22px;
  height: 22px;

  color: white;

  z-index: 1002;
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-move-enter-active {
  transition: all 0.35s ease-in-out;
}
.fade-move-leave-active {
  transition: all 0.1s ease-in-out;
}

.fade-move-enter-from,
.fade-move-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
