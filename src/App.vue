<script setup lang="ts">
import { onBeforeMount } from "vue";
import Resolution from "@/components/main/Resolution.vue";
import Connection from "@/components/main/Connection.vue";
import Notification from "@/components/main/Notification.vue";
import Header from "@/components/main/Header.vue";
import Footer from "@/components/main/Footer.vue";
import Sidebar from "@/components/main/Sidebar.vue";
import RouterDisplay from "@/components/main/RouterDisplay.vue";

import { useProjectsStore } from "@/stores/projects";
import { useUsersStore, useUserStore } from "@/stores/user";

const projectsStore = useProjectsStore();
const userStore = useUserStore();
const usersStore = useUsersStore();

onBeforeMount(() => {
  projectsStore.getItems();
  userStore.get();
  usersStore.get();
});
</script>
<template>
  <div id="app">
    <Resolution />
    <Notification />
    <Connection />
    <div class="grid">
      <div id="header">
        <Header title="Glados"></Header>
      </div>
      <div id="footer">
        <Footer></Footer>
      </div>
      <div id="sidebar">
        <Sidebar></Sidebar>
      </div>
      <div id="display">
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
  grid-template-rows: max-content auto 20px;
  grid-template-columns: 50px auto;
  grid-template-areas:
    "header header"
    "sidebar display"
    "footer footer";
}

#header {
  grid-area: header;
}

#footer {
  grid-area: footer;
}

#sidebar {
  grid-area: sidebar;
}

#display {
  grid-area: display;
  overflow-x: hidden;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}
</style>
