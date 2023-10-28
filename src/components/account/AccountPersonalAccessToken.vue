<script setup>
import { ref } from "vue"
import { usersRequest } from "@/requests/users"
import { useNotificationStore } from "@/stores/notification.js"

import Toggle from "@vueform/toggle"
import ButtonNewPersonalAccessToken from "@/components/elements/ButtonNewPersonalAccessToken.vue"

// Stores
const notificationStore = useNotificationStore()

let personalAccessToken = ref("")

function newToken() {
  usersRequest.putUsersMePAT().then(response => {
    if (response.status == 200) {
      notificationStore.info = `Created new token.`
      personalAccessToken.value = response.data
    } else {
      notificationStore.warning = response.data.detail
    }
  })
}
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="token" class="grid-item-center">
          <input class="text-input" v-model="personalAccessToken" type="text" placeholder="Secret" readonly>
        </div>
        <div id="btn">
          <ButtonNewPersonalAccessToken v-on:click="newToken" text="New Token"></ButtonNewPersonalAccessToken>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/grid/gridBase.scss';

#grid {
    grid-template-rows: 40px 40px;
    grid-template-columns: auto;
    grid-template-areas: "token"
        "btn"
}

#btn {
    grid-area: btn;
}

#token {
    grid-area: token;
}
</style>