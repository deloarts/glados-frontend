<script setup lang="ts">
import AccountUpdateForm from "@/components/account/AccountUpdateForm.vue";

import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.account.banner.myAccount }}</h1>
      <AccountUpdateForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  width: 100%;
  height: 100%;
}
</style>
