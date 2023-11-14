<script setup>
import { ref } from "vue";
import { usersRequest } from "@/requests/users";
import { useNotificationStore } from "@/stores/notification.js";
import { useUserStore } from "@/stores/user.js";

import ButtonUserUpdate from "@/components/elements/ButtonUserUpdate.vue";

// Stores
const userStore = useUserStore();
const notificationStore = useNotificationStore();

let formData = ref({
  username: userStore.username,
  full_name: userStore.full_name,
  email: userStore.email,
  password: "",
});

function updateUser() {
  usersRequest.putUsersMe(formData.value).then((response) => {
    if (response.status == 200) {
      userStore.$patch(response.data);
      notificationStore.info = `Updated user ${formData.value.username}.`;
    } else if (response.status == 422) {
      notificationStore.warning = "Data is incomplete.";
    } else {
      notificationStore.warning = response.data.detail;
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
            v-model="formData.username"
            type="text"
            placeholder="Username"
            readonly
          />
        </div>
        <div id="full-name" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formData.full_name"
            placeholder="Name"
          />
        </div>
        <div id="email" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formData.email"
            placeholder="Mail"
          />
        </div>
        <div id="password" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formData.password"
            placeholder="Password"
          />
        </div>
        <div id="btn">
          <ButtonUserUpdate
            v-on:click="updateUser"
            text="Save"
          ></ButtonUserUpdate>
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
