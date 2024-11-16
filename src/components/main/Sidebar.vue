<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import router from "@/router/index";
import { useLanguageStore } from "@/stores/language";
import { useUserStore } from "@/stores/user";
import { useResolutionStore } from "@/stores/resolution";

import IconLogout from "@/components/icons/IconLogout.vue";
import IconDashboard from "@/components/icons/IconDashboard.vue";
import IconProject from "@/components/icons/IconProject.vue";
import IconItems from "@/components/icons/IconItems.vue";
import IconAccount from "@/components/icons/IconAccount.vue";
import IconTools from "@/components/icons/IconTools.vue";
import IconSettings from "@/components/icons/IconSettings.vue";

// Router
const route = useRoute();

// Store
const languageStore = useLanguageStore();
const userStore = useUserStore();
const resolutionStore = useResolutionStore();

const is_adminuser = computed<boolean>(() => userStore.user.is_adminuser);
const gtMinWidthTablet = computed<boolean>(
  () => resolutionStore.gtMinWidthTablet,
);

// States
const showLabelLogout = ref<boolean>(false);
const showLabelDashboard = ref<boolean>(false);
const showLabelProjects = ref<boolean>(false);
const showLabelBoughtItems = ref<boolean>(false);
const showLabelAccount = ref<boolean>(false);
const showLabelTools = ref<boolean>(false);
const showLabelSettings = ref<boolean>(false);

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
          <div v-if="showLabelLogout" class="label">
            {{ languageStore.l.main.sideBar.logout }}
          </div>
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
          <div v-if="showLabelDashboard" class="label">
            {{ languageStore.l.main.sideBar.dashboard }}
          </div>
        </Transition>
      </router-link>
      <router-link
        :to="'/projects'"
        @mouseover="showLabelProjects = true"
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
        @mouseover="showLabelBoughtItems = true"
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
        :to="'/account'"
        @mouseover="showLabelAccount = true"
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
        @mouseover="showLabelTools = true"
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
        @mouseover="showLabelSettings = true"
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
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/sidebar.scss";
</style>
