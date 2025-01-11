<script setup lang="ts">
import FullScreenWarning from '@/components/main/FullScreenWarning.vue'
import { useBrowserDetect } from 'vue3-detect-browser'

const { isEdge, isChrome, isOpera } = useBrowserDetect()
</script>

<template>
  <FullScreenWarning
    v-bind:show="!isEdge && !isChrome && !isOpera"
    text="Browser not supported"
    sub="Please use Chrome, Edge or Opera"
  />
</template>

<style scoped lang="scss"></style>
