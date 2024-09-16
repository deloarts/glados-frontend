<script setup lang="ts">
import { ref } from "vue";
import { usersRequest } from "@/requests/users";
import { useNotificationStore } from "@/stores/notification";

import ButtonNewPersonalAccessToken from "@/components/elements/ButtonNewPersonalAccessToken.vue";

const notificationStore = useNotificationStore();

let personalAccessToken = ref<string>("");

function newToken() {
  usersRequest.putUsersMePAT().then((response) => {
    if (response.status == 200) {
      notificationStore.addInfo(`Created new token.`);
      personalAccessToken.value = response.data;
    } else {
      notificationStore.addWarn(response.data.detail);
    }
  });
}
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="token" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="personalAccessToken"
            type="text"
            placeholder="Secret"
            readonly
          />
        </div>
        <div id="btn">
          <ButtonNewPersonalAccessToken
            v-on:click="newToken"
            text="New Token"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/form/formBase.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-rows: 40px auto;
  grid-template-columns: auto;
  grid-template-areas:
    "token"
    "btn";
}

#btn {
  grid-area: btn;
}

#token {
  grid-area: token;
}
</style>
