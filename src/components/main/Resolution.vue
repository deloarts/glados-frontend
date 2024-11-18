<script setup lang="ts">
import { computed } from "vue";

import { useLanguageStore } from "@/stores/language";
import { useResolutionStore } from "@/stores/resolution";

import FullScreenWarning from "@/components/main/FullScreenWarning.vue";

const languageStore = useLanguageStore();
const resolutionStore = useResolutionStore();
const gtMinWidth = computed<boolean>(() => resolutionStore.gtMinWidth);
</script>

<template>
  <FullScreenWarning
    v-bind:show="!gtMinWidth"
    :text="languageStore.l.main.screenResolutionNotSupported"
  />
</template>

<style scoped lang="scss"></style>
