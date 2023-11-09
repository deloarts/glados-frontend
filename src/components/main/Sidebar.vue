<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import router from "@/router/index";
import { useUserStore } from "@/stores/user.js";
import { useResolutionStore } from "@/stores/resolution.js";

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
const resolutionStore = useResolutionStore();
const is_adminuser = computed(() => userStore.is_adminuser);
const gtMinWidthTablet = computed(() => resolutionStore.gtMinWidthTablet);

// States
const showLabelLogout = ref(false);
const showLabelDashboard = ref(false);
const showLabelBoughtItems = ref(false);
const showLabelAccount = ref(false);
const showLabelSettings = ref(false);

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
      <a
        ><IconLogout
          class="logout"
          v-on:click="logout()"
          @mouseover="showLabelLogout = true"
          @mouseleave="showLabelLogout = false"
        />
        <Transition>
          <div v-if="showLabelLogout" class="label">Logout</div>
        </Transition></a
      >
      <hr />
      <router-link
        :to="'/dashboard'"
        @mouseover="showLabelDashboard = true"
        @mouseleave="showLabelDashboard = false"
      >
        <IconDashboard v-bind:class="{ active: routeIsActive('/dashboard') }" />
        <Transition>
          <div v-if="showLabelDashboard" class="label">Dashboard</div>
        </Transition>
      </router-link>
      <router-link
        :to="'/items/bought'"
        @mouseover="showLabelBoughtItems = true"
        @mouseleave="showLabelBoughtItems = false"
      >
        <IconItems v-bind:class="{ active: routeIsActive('/items/bought') }" />
        <Transition>
          <div v-if="showLabelBoughtItems" class="label">Bought Items</div>
        </Transition>
      </router-link>
      <router-link
        :to="'/account'"
        @mouseover="showLabelAccount = true"
        @mouseleave="showLabelAccount = false"
      >
        <IconAccount v-bind:class="{ active: routeIsActive('/account') }" />
        <Transition>
          <div v-if="showLabelAccount" class="label">Account</div>
        </Transition>
      </router-link>
      <router-link
        :to="'/settings'"
        @mouseover="showLabelSettings = true"
        @mouseleave="showLabelSettings = false"
      >
        <IconSettings
          v-if="is_adminuser && gtMinWidthTablet"
          v-bind:class="{ active: routeIsActive('/settings') }"
        />
        <Transition>
          <div v-if="showLabelSettings" class="label">Settings</div>
        </Transition>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/sidebar.scss";
</style>
