<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import router from "@/router/index";
import { useUserStore } from "@/stores/user.js";

import IconLogout from "@/components/icons/IconLogout.vue";
import IconDashboard from "@/components/icons/IconDashboard.vue";
import IconItems from "@/components/icons/IconItems.vue";
import IconAccount from "@/components/icons/IconAccount.vue";
import IconSettings from "@/components/icons/IconSettings.vue";

const props = defineProps(["title"]);

// Router
const route = useRoute();

// Store
const userStore = useUserStore();
const is_adminuser = computed(() => userStore.is_adminuser);

function routeIsActive(currentLink) {
  let activeRoute = route.path;
  if (activeRoute != "/login") {
    localStorage.setItem("gladosActiveRoute", activeRoute);
  }
  if (activeRoute.includes(currentLink)) {
    return true;
  } else {
    return false;
  }
}

function logout() {
  localStorage.setItem("gladosTokenValue", "");
  localStorage.setItem("gladosTokenType", "");
  router.push({ name: "Login" });
}
</script>

<template>
  <div class="sidebar">
    <div class="wrapper">
      <a><IconLogout class="logout" v-on:click="logout()" /></a>
      <hr />
      <router-link :to="'/dashboard'"
        ><IconDashboard v-bind:class="{ active: routeIsActive('/dashboard') }"
      /></router-link>
      <router-link :to="'/items/bought'"
        ><IconItems v-bind:class="{ active: routeIsActive('/items/bought') }"
      /></router-link>
      <router-link :to="'/account'"
        ><IconAccount v-bind:class="{ active: routeIsActive('/account') }"
      /></router-link>
      <router-link :to="'/settings'"
        ><IconSettings
          v-if="is_adminuser"
          v-bind:class="{ active: routeIsActive('/settings') }"
      /></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/sidebar.scss";
</style>
