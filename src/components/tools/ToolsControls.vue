<script setup>
import { useRoute } from "vue-router";

import ButtonBlade from "@/components/elements/ButtonBlade.vue";

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
    <div id="settings-controls" class="controls-base-container">
      <router-link :to="'/tools/stock-cut-1d'"
        ><ButtonBlade
          class="controls-base-element"
          v-bind:class="{ active: routeIsActive('/tools/stock-cut-1d') }"
          text="Stock Cut 1D"
        ></ButtonBlade
      ></router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/controls/controlsBase.scss";
</style>
