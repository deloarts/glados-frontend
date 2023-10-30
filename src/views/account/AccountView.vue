<script setup>
import AccountUpdate from "@/components/account/AccountUpdate.vue";
import AccountPersonalAccessToken from "@/components/account/AccountPersonalAccessToken.vue";
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <h1>My Account</h1>
      <AccountUpdate />
    </div>
    <hr>
    <div class="views-content">
      <h1>Personal Access Token</h1>
      <AccountPersonalAccessToken />
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/views.scss';

.gray {
  color: gray;
}
</style>