<script setup>
import { ref, provide, watch, onBeforeMount } from "vue"

import constants from "@/constants"
import router from "@/router/index"
import { hostRequest } from "@/requests/host"
import { usersRequest } from "@/requests/users"
import { useUserStore, useUsersStore } from "@/stores/user.js"
import { useUnitsStore } from "@/stores/units.js"
import { useStatusStore } from "@/stores/status.js"

import Resolution from "@/components/main/Resolution.vue"
import Connection from "@/components/main/Connection.vue"
import Notification from "@/components/main/Notification.vue"
import Header from "@/components/main/Header.vue"
import Footer from "@/components/main/Footer.vue"
import Sidebar from "@/components/main/Sidebar.vue"
import RouterDisplay from "@/components/main/RouterDisplay.vue"

// Stores
const userStore = useUserStore()
const usersStore = useUsersStore()
const unitsStore = useUnitsStore()
const statusStore = useStatusStore()

// TODO: Make this a service!
function getCurrentUser() {
  usersRequest.getUsersMe().then(response => {
    if (response.status === 200) {
      console.log("Getting user from main app.")

      userStore.$patch({
        username: response.data.username,
        full_name: response.data.full_name,
        email: response.data.email,
        is_active: response.data.is_active,
        is_superuser: response.data.is_superuser,
        is_systemuser: response.data.is_systemuser,
        id: response.data.id,
        created: response.data.created
      })

      // Redirect the user to the app.
      // var previousRoute = localStorage.getItem("gladosActiveRoute")
      // if (previousRoute == "/login" || previousRoute == null) {
      //   previousRoute = "/"
      // }
      // router.push(previousRoute)
    } else {
      userStore.logout()
      router.push({ name: "Login" })
    }
  })
  setTimeout(getCurrentUser.bind(this), constants.fetchUserStore)
}

// TODO: Make this a service!
function getUsers() {
  usersRequest.getUsers().then(response => {
    if (response.status === 200) {
      console.log("Getting users from main app.")
      usersStore.$patch({ users: response.data })
    }
  })
  setTimeout(getUsers.bind(this), constants.fetchUserStore)
}

function getUnits() {
  hostRequest.getConfigItemsBoughtUnits().then(response => {
    if (response.status === 200) {
      console.log("Getting units from main app.")
      unitsStore.$patch({ boughtItemUnits: response.data })
    }
  })
}

function getStatus() {
  hostRequest.getConfigItemsBoughtStatus().then(response => {
    if (response.status === 200) {
      console.log("Getting status from main app.")
      statusStore.$patch({ boughtItemStatus: response.data })
    }
  })
}

onBeforeMount(() => {
  getCurrentUser()
  getUsers()
  getUnits()
  getStatus()
})

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

<style scoped lang='scss'>
@import '@/scss/variables.scss';

html {
  background-color: $main-background-color;
}

body {
  background-color: $main-background-color;
}

.grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  color: white;
  background: $main-background-color;

  display: grid;
  grid-template-rows: max-content auto 20px;
  grid-template-columns: 50px auto;
  grid-template-areas: 'header header'
    'sidebar display'
    'footer footer';
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
