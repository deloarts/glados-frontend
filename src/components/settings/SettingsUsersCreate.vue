<script setup>
import { ref, watch } from "vue";

import { useNotificationStore } from "@/stores/notification.js";
import { usersService } from "@/services/users.service";
import { usersRequest } from "@/requests/users";

import Toggle from "@vueform/toggle";
import ButtonUserCreate from "@/components/elements/ButtonUserCreate.vue";

// Stores
const notificationStore = useNotificationStore();

const formData = ref({
  is_active: false,
  is_superuser: false,
  is_adminuser: false,
  is_guestuser: false,
  username: "",
  full_name: "",
  email: "",
  password: "",
});

function createUser() {
  usersRequest.postUsers(formData.value).then((response) => {
    if (response.status == 200) {
      notificationStore.info = `Created user ${formData.value.username}.`;
      formData.value = {
        is_active: false,
        is_superuser: false,
        is_adminuser: false,
        is_guestuser: false,
        username: "",
        full_name: "",
        email: "",
        password: "",
      };
      usersService.clearCache();
      // } else if (response.status == 403) {
      //   notificationStore.warning = "Not enough permission"
    } else if (response.status == 406) {
      notificationStore.warning = "User already exists";
    } else if (response.status == 422) {
      notificationStore.warning = "Data is incomplete";
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
        <div id="guestuser" class="grid-item-center">
          <Toggle v-model="formData.is_guestuser"></Toggle>
        </div>
        <div id="guestuser-text" class="grid-item-left">Guest</div>
        <div id="superuser" class="grid-item-center">
          <Toggle v-model="formData.is_superuser"></Toggle>
        </div>
        <div id="superuser-text" class="grid-item-left">Superuser</div>
        <div id="adminuser" class="grid-item-center">
          <Toggle v-model="formData.is_adminuser"></Toggle>
        </div>
        <div id="adminuser-text" class="grid-item-left">Admin</div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="formData.is_active"></Toggle>
        </div>
        <div id="active-text" class="grid-item-left">Active</div>
        <div id="username" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="formData.username"
            type="text"
            placeholder="Username"
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
            placeholder="Password (at least 8 characters)"
          />
        </div>
        <div id="btn">
          <ButtonUserCreate
            v-on:click="createUser"
            text="Create User"
          ></ButtonUserCreate>
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
  grid-template-rows: 40px 40px 40px 40px 35px 35px 35px 35px 40px;
  grid-template-columns: 50px auto;
  grid-template-areas:
    "username username"
    "full-name full-name"
    "email email"
    "password password"
    "active active-text"
    "guestuser guestuser-text"
    "superuser superuser-text"
    "adminuser adminuser-text"
    "btn btn";
}

#btn {
  grid-area: btn;
}

#active {
  grid-area: active;
}

#active-text {
  grid-area: active-text;
}

#guestuser {
  grid-area: guestuser;
}

#guestuser-text {
  grid-area: guestuser-text;
}

#superuser {
  grid-area: superuser;
}

#superuser-text {
  grid-area: superuser-text;
}

#adminuser {
  grid-area: adminuser;
}

#adminuser-text {
  grid-area: adminuser-text;
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
