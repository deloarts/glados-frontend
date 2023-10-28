<script setup>
import AccountUpdate from "@/components/account/AccountUpdate.vue";
import AccountPersonalAccessToken from "@/components/account/AccountPersonalAccessToken.vue";
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>My Account</h1>
      <AccountUpdate />
    </div>
    <hr>
    <div class="content">
      <h1>Personal Access Token</h1>
      <AccountPersonalAccessToken />
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

.content {
  padding: 30px;
}

.gray {
  color: gray;
}
</style>