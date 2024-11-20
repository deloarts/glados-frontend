<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { setTheme } from "@/helper/theme.helper";

import IconThemeDark from "@/components/icons/IconThemeDark.vue";
import IconThemeLight from "@/components/icons/IconThemeLight.vue";

const userStore = useUserStore();

function toggleTheme() {
  if (userStore.user.theme == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}
</script>

<template>
  <div class="header-button">
    <IconThemeDark
      v-if="userStore.user.theme == null || userStore.user.theme == 'dark'"
      class="header-button-icon"
      @click="toggleTheme"
    />
    <IconThemeLight v-else class="header-button-icon" @click="toggleTheme" />
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/header.scss";
</style>
