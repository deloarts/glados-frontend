<script setup>
import { watch, computed } from "vue"
import { useRouter, useRoute } from "vue-router"

import router from "@/router/index"
import config from "@/config"
import { useUserStore } from "@/stores/user.js"

import Spinner from "@/components/spinner/LoadingSpinner.vue"
import IconDashboard from "@/components/icons/IconDashboard.vue"
import IconItems from "@/components/icons/IconItems.vue"
import IconAccount from "@/components/icons/IconAccount.vue"
import IconSettings from "@/components/icons/IconSettings.vue"

const props = defineProps(["title"])

// Router
const route = useRoute()

// Store
const userStore = useUserStore()
const email = computed(() => userStore.email)
const full_name = computed(() => userStore.full_name)
const is_superuser = computed(() => userStore.is_superuser)

const debug = config.debug
let menuItems = [
  { name: 'Dashboard', link: '/dashboard' },
  { name: 'Items', link: '/items/bought' },
  { name: 'Account', link: '/account' },
]

function routeIsActive(currentLink) {
  let activeRoute = route.path
  if (activeRoute != '/login') { localStorage.setItem("gladosActiveRoute", activeRoute) }
  if (activeRoute.includes(currentLink)) { return true }
  else { return false }
}

function rebuildNavigation() {
  if (is_superuser) {
    menuItems = [
      { name: 'Dashboard', link: '/dashboard' },
      { name: 'Items', link: '/items/bought' },
      { name: 'Account', link: '/account' },
      { name: 'Settings', link: '/settings' },
    ];
  } else {
    menuItems = [
      { name: 'Dashboard', link: '/dashboard' },
      { name: 'Items', link: '/items/bought' },
      { name: 'Account', link: '/account' },
    ];
  }
}

function logout() {
  localStorage.setItem("gladosTokenValue", "");
  localStorage.setItem("gladosTokenType", "");
  router.push({name:"Login"});
}

watch(full_name, () => {
  rebuildNavigation()
})
</script>

<template>
  <div class="sidebar">
    <div class="wrapper">
      <hr v-if="debug" />
      <div v-if="debug" class="debug">DEVELOPMENT MODE</div>
      <hr />
      <div class="user">
        <div class="full-name">
          <Spinner v-if="full_name == null || full_name == ''" />
          {{ full_name }}
        </div>
        <div class="email">{{ email }}</div>
        <div class="logout" v-on:click="logout()">Logout</div>
      </div>
      <hr />
      <router-link v-for="menuItem in menuItems" :to="menuItem.link" :key="menuItem.name"
        v-bind:class="{ 'active': routeIsActive(menuItem.link) }">
        <span class="link-text">{{ menuItem.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/sidebar.scss';
</style>
