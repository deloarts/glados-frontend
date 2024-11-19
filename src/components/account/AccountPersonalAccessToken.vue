<script setup lang="ts">
import AccountPersonalAccessTokenForm from "@/components/account/AccountPersonalAccessTokenForm.vue";

import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.account.banner.pat }}</h1>
      <AccountPersonalAccessTokenForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.scope {
  width: 100%;
  height: 100%;
}
</style>
