<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'

import IconTranslate from '@/components/icons/IconTranslate.vue'

const languageStore = useLanguageStore()
const userStore = useUserStore()

function toggleLang() {
  if (userStore.user.language == 'enGB') {
    languageStore.set('deAT')
  } else {
    languageStore.set('enGB')
  }
}
</script>

<template>
  <div class="header-button">
    <IconTranslate class="header-button-icon" @click="toggleLang" />
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/header.scss';
</style>
