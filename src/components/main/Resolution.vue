<script setup lang="ts">
import { ref, computed } from "vue";

import { useResolutionStore } from "@/stores/resolution";
import FullScreenWarning from "@/components/main/FullScreenWarning.vue";

const resolutionStore = useResolutionStore();
const gtMinWidth = computed<boolean>(() => resolutionStore.gtMinWidth);

const text = ref<string>("Screen Resolution Not Supported");
</script>

<template>
  <FullScreenWarning v-bind:show="!gtMinWidth" v-model:text="text" />
</template>

<style scoped lang="scss"></style>
