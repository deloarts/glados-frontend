<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

import IconDashboard from "@/components/icons/IconDashboard.vue"
import IconItems from "@/components/icons/IconItems.vue"
import IconAccount from "@/components/icons/IconAccount.vue"
import IconSettings from "@/components/icons/IconSettings.vue"

// Router
const route = useRoute()

const menuItems = ref([
  { name: 'Host', link: '/settings/host' },
  { name: 'Logs', link: '/settings/logs' },
  { name: 'Users', link: '/settings/users' },
  { name: 'API Keys', link: '/settings/api-keys' },
])

function routeIsActive(currentLink) {
  let activeRoute = route.path
  if (activeRoute != '/login') { localStorage.setItem("gladosActiveRoute", activeRoute) }
  if (activeRoute.includes(currentLink)) { return true }
  else { return false }
}
</script>

<template>
  <div class="sidebar">
    <div class="wrapper">
      <router-link v-for="menuItem in menuItems" :to="menuItem.link" :key="menuItem.name" v-bind:class="{ 'active': routeIsActive(menuItem.link) }">
        <span class="link-text">{{ menuItem.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/sidebar.scss';
.sidebar {
  width: 100%;
  height: 100%;
  background: $main-color-shade-1;
}
</style>
