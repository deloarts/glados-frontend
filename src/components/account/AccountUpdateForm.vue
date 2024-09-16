<script setup lang="ts">
import { ref } from "vue";

import { usersRequest } from "@/requests/users";
import { useNotificationStore } from "@/stores/notification";
import { useUserStore } from "@/stores/user";

import type { UserUpdateSchema } from "@/schemas/user";

import ButtonUserUpdate from "@/components/elements/ButtonUserUpdate.vue";

const userStore = useUserStore();
const notificationStore = useNotificationStore();

let formUserUpdate = ref<UserUpdateSchema>({
  username: userStore.user.username,
  full_name: userStore.user.full_name,
  email: userStore.user.email,
});

function updateUser() {
  usersRequest.putUsersMe(formUserUpdate.value).then((response) => {
    if (response.status == 200) {
      userStore.user = response.data;
      notificationStore.addInfo(
        `Updated user ${formUserUpdate.value.username}.`,
      );
    } else if (response.status == 422) {
      notificationStore.addWarn("Data is incomplete.");
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
        <div id="username" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formUserUpdate.username"
            type="text"
            placeholder="Username"
            readonly
          />
        </div>
        <div id="full-name" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formUserUpdate.full_name"
            placeholder="Name"
          />
        </div>
        <div id="email" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formUserUpdate.email"
            placeholder="Mail"
          />
        </div>
        <div id="password" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formUserUpdate.password"
            placeholder="Password"
          />
        </div>
        <div id="btn">
          <ButtonUserUpdate v-on:click="updateUser" text="Save" />
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
  grid-template-rows: 40px 40px 40px 40px auto;
  grid-template-columns: 50px auto;
  grid-template-areas:
    "username username"
    "full-name full-name"
    "email email"
    "password password"
    "btn btn";
}

#btn {
  grid-area: btn;
}

#username {
  grid-area: username;
}

#full-name {
  grid-area: full-name;
}

#password {
  grid-area: password;
}

#email {
  grid-area: email;
}
</style>
