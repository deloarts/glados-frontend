<script setup lang="ts">
import AccountSecurityForm from '@/components/account/AccountSecurityForm.vue'

import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.account.banner.security }}</h1>
      <AccountSecurityForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  width: 100%;
  height: 100%;
}
</style>
