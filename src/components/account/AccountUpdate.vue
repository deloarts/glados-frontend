<script setup lang="ts">
import AccountUpdateForm from "@/components/account/AccountUpdateForm.vue";
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>My Account</h1>
      <AccountUpdateForm />
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
