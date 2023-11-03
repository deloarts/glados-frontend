<script setup>
import { useRoute } from "vue-router";

import ButtonUserEdit from "@/components/elements/ButtonUserEdit.vue";
import ButtonCloudKey from "@/components/elements/ButtonCloudKey.vue";

// Router
const route = useRoute();

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
</script>

<template>
  <div class="controls-base-scope">
    <div id="account-controls" class="controls-base-container">
      <router-link :to="'/account/me'"
        ><ButtonUserEdit
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/account/me') }"
          text="My Account"
        ></ButtonUserEdit
      ></router-link>
      <router-link :to="'/account/pat'"
        ><ButtonCloudKey
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/account/pat') }"
          text="Access Token"
        ></ButtonCloudKey
      ></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/controls/controlsBase.scss";
</style>
