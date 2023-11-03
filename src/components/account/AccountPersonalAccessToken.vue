<script setup>
import AccountPersonalAccessTokenForm from "@/components/account/AccountPersonalAccessTokenForm.vue"
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>Personal Access Token</h1>
      <AccountPersonalAccessTokenForm></AccountPersonalAccessTokenForm>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

// h1 {
//   padding-left: 10px;
//   padding-top: 10px;
// }
</style>