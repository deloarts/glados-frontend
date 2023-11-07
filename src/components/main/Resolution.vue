<script setup>
import { ref, computed } from "vue";

import { useResolutionStore } from "@/stores/resolution.js";
import FullScreenWarning from "@/components/main/FullScreenWarning.vue";

// Stores
const resolutionStore = useResolutionStore();
const gtMinWidth = computed(() => resolutionStore.gtMinWidth);

const text = ref("Screen Resolution Not Supported");
</script>

<template>
  <FullScreenWarning
    v-bind:show="!gtMinWidth"
    v-model:text="text"
  ></FullScreenWarning>
</template>

<style scoped lang="scss"></style>
