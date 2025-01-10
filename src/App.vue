<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { useWakeLock } from '@vueuse/core'

import Resolution from '@/components/main/Resolution.vue'
import Connection from '@/components/main/Connection.vue'
import Notification from '@/components/main/Notification.vue'
import Header from '@/components/main/Header.vue'
import Footer from '@/components/main/Footer.vue'
import Sidebar from '@/components/main/Sidebar.vue'
import RouterDisplay from '@/components/main/RouterDisplay.vue'

import { useResolutionStore } from './stores/resolution'
import { useProjectsStore } from '@/stores/projects'
import { useUsersStore, useUserStore } from '@/stores/user'

const resolutionStore = useResolutionStore()
const projectsStore = useProjectsStore()
const userStore = useUserStore()
const usersStore = useUsersStore()

const hideSidebar = ref<boolean>(false)
const { isSupported, request, release } = useWakeLock()

onBeforeMount(() => {
  projectsStore.getItems()
  userStore.get()
  usersStore.get()

  if (!resolutionStore.gtMinWidthTablet) {
    hideSidebar.value = true
  }

  if (isSupported) {
    request('screen')
  }
})

onBeforeUnmount(() => {
  release()
})
</script>
<template>
  <div id="app">
    <Resolution />
    <Notification />
    <Connection />
    <div class="grid" v-bind:class="{ 'sidebar-hidden': hideSidebar }">
      <div class="header">
        <Header :show-quick-menu="userStore.user.id != null"></Header>
      </div>
      <div class="footer">
        <Footer></Footer>
      </div>
      <div class="sidebar">
        <Sidebar v-model:hide-sidebar="hideSidebar"></Sidebar>
      </div>
      <div class="display">
        <RouterDisplay></RouterDisplay>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
html {
  background-color: var(--main-background-color);
}

body {
  background-color: var(--main-background-color);
}

.grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  color: var(--main-text-color);
  background: var(--main-background-color);

  display: grid;
  grid-gap: 0;
  grid-template-rows: var(--header-height) auto var(--footer-height);
  grid-template-columns: var(--sidebar-width) auto;
  grid-template-areas:
    'header header'
    'sidebar display'
    'footer footer';

  transition: 300ms;
}

.sidebar-hidden {
  grid-template-columns: 0px auto;
}

.header {
  grid-area: header;
}

.footer {
  grid-area: footer;
}

.sidebar {
  grid-area: sidebar;
}

.display {
  grid-area: display;
  overflow-x: hidden;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
