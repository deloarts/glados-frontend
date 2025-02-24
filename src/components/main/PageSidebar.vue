<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router/index'
import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useProjectsStore } from '@/stores/projects'
import { useUsersStore, useUserStore } from '@/stores/user'
import { useResolutionStore } from '@/stores/resolution'
import { useRfidAuthStore } from '@/stores/rfidAuth'

import IconLogout from '@/components/icons/IconLogout.vue'
import IconDashboard from '@/components/icons/IconDashboard.vue'
import IconProject from '@/components/icons/IconProject.vue'
import IconItems from '@/components/icons/IconItems.vue'
import IconAccount from '@/components/icons/IconAccount.vue'
import IconUserTime from '@/components/icons/IconUserTime.vue'
import IconTools from '@/components/icons/IconTools.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'

// Router
const route = useRoute()

// Store
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const userStore = useUserStore()
const usersStore = useUsersStore()
const projectsStore = useProjectsStore()
const resolutionStore = useResolutionStore()
const rfidAuthStore = useRfidAuthStore()

interface Props {
  hideSidebar: boolean
}
const props = withDefaults(defineProps<Props>(), {
  hideSidebar: false,
})
const emit = defineEmits<{
  (e: 'update:hideSidebar', v: boolean): void
}>()
const computedHideSidebar = computed<boolean>({
  get() {
    return props.hideSidebar
  },
  set(newValue) {
    emit('update:hideSidebar', newValue)
    return newValue
  },
})

const is_adminuser = computed<boolean>(() => userStore.user.is_adminuser)
const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

// States
const showLabelLogout = ref<boolean>(false)
const showLabelDashboard = ref<boolean>(false)
const showLabelProjects = ref<boolean>(false)
const showLabelBoughtItems = ref<boolean>(false)
const showLabelAccount = ref<boolean>(false)
const showLabelUserTime = ref<boolean>(false)
const showLabelTools = ref<boolean>(false)
const showLabelSettings = ref<boolean>(false)

function routeIsActive(currentLink: string) {
  const activeRoute = route.path
  if (activeRoute != '/login') {
    localStorage.setItem('gladosActiveRoute', activeRoute)
  }
  if (activeRoute.includes(currentLink)) {
    return true
  } else {
    return false
  }
}

function logout() {
  if (rfidAuthStore.loggedIn) {
    notificationStore.addInfo(languageStore.l.notification.info.removeCardToLogout)
    return
  }
  userStore.logout()
  usersStore.clear()
  projectsStore.clear()
  localStorage.setItem('gladosTokenValue', '')
  localStorage.setItem('gladosTokenType', '')
  router.push({ name: 'Login' })
}

function hideLabel() {
  setTimeout(() => {
    showLabelLogout.value = false
    showLabelDashboard.value = false
    showLabelProjects.value = false
    showLabelBoughtItems.value = false
    showLabelAccount.value = false
    showLabelUserTime.value = false
    showLabelTools.value = false
    showLabelSettings.value = false
  }, 2000)
}

watch(gtMinWidthTablet, () => {
  computedHideSidebar.value = !gtMinWidthTablet.value
})
</script>

<template>
  <div class="sidebar">
    <div class="wrapper">
      <a
        ><IconLogout
          class="logout"
          v-on:click="logout()"
          @mouseover="(showLabelLogout = true), hideLabel()"
          @mouseleave="showLabelLogout = false"
        />
        <Transition>
          <div v-if="showLabelLogout" class="label">
            {{ languageStore.l.main.sideBar.logout }}
          </div>
        </Transition></a
      >
      <hr />
      <router-link
        :to="'/dashboard'"
        @mouseover="(showLabelDashboard = true), hideLabel()"
        @mouseleave="showLabelDashboard = false"
      >
        <IconDashboard v-bind:class="{ active: routeIsActive('/dashboard') }" />
        <Transition>
          <div v-if="showLabelDashboard" class="label">
            {{ languageStore.l.main.sideBar.dashboard }}
          </div>
        </Transition>
      </router-link>
      <router-link
        :to="'/projects'"
        @mouseover="(showLabelProjects = true), hideLabel()"
        @mouseleave="showLabelProjects = false"
      >
        <IconProject v-bind:class="{ active: routeIsActive('/projects') }" />
        <Transition>
          <div v-if="showLabelProjects" class="label">
            {{ languageStore.l.main.sideBar.projects }}
          </div>
        </Transition>
      </router-link>
      <router-link
        :to="'/items/bought'"
        @mouseover="(showLabelBoughtItems = true), hideLabel()"
        @mouseleave="showLabelBoughtItems = false"
      >
        <IconItems v-bind:class="{ active: routeIsActive('/items/bought') }" />
        <Transition>
          <div v-if="showLabelBoughtItems" class="label">
            {{ languageStore.l.main.sideBar.boughtItems }}
          </div>
        </Transition>
      </router-link>
      <router-link
        v-if="userStore.user.work_hours_per_week"
        :to="'/user-time'"
        @mouseover="(showLabelUserTime = true), hideLabel()"
        @mouseleave="showLabelUserTime = false"
      >
        <IconUserTime v-bind:class="{ active: routeIsActive('/user-time') }" />
        <Transition>
          <div v-if="showLabelUserTime" class="label">
            {{ languageStore.l.main.sideBar.userTime }}
          </div>
        </Transition>
      </router-link>
      <router-link
        :to="'/account'"
        @mouseover="(showLabelAccount = true), hideLabel()"
        @mouseleave="showLabelAccount = false"
      >
        <IconAccount v-bind:class="{ active: routeIsActive('/account') }" />
        <Transition>
          <div v-if="showLabelAccount" class="label">
            {{ languageStore.l.main.sideBar.account }}
          </div>
        </Transition>
      </router-link>
      <router-link
        :to="'/tools'"
        @mouseover="(showLabelTools = true), hideLabel()"
        @mouseleave="showLabelTools = false"
      >
        <IconTools v-bind:class="{ active: routeIsActive('/tools') }" />
        <Transition>
          <div v-if="showLabelTools" class="label">
            {{ languageStore.l.main.sideBar.tools }}
          </div>
        </Transition>
      </router-link>
      <router-link
        :to="'/settings'"
        @mouseover="(showLabelSettings = true), hideLabel()"
        @mouseleave="showLabelSettings = false"
      >
        <IconSettings
          v-if="is_adminuser && gtMinWidthTablet"
          v-bind:class="{ active: routeIsActive('/settings') }"
        />
        <Transition>
          <div v-if="showLabelSettings" class="label">
            {{ languageStore.l.main.sideBar.settings }}
          </div>
        </Transition>
      </router-link>
    </div>
    <div
      v-if="!gtMinWidthTablet"
      @click="computedHideSidebar = !computedHideSidebar"
      class="show-sidebar-button"
      v-bind:class="{ 'show-sidebar-button-active': hideSidebar }"
    >
      <IconChevronLeft />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/sidebar.scss';
</style>
