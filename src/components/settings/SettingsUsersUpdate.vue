<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

import { useNotificationStore } from "@/stores/notification";
import { usersRequest } from "@/requests/users";

import type { UserUpdateSchema } from "@/schemas/user";

import Toggle from "@vueform/toggle/dist/toggle.js";
import ButtonUserUpdate from "@/components/elements/ButtonUserUpdate.vue";

// Props & Emits
const props = defineProps<{
  selectedUserID: number;
}>();

// Stores
const notificationStore = useNotificationStore();

const formData = ref<UserUpdateSchema>({
  is_active: false,
  is_superuser: false,
  is_adminuser: false,
  is_guestuser: false,
  username: "",
  full_name: "",
  email: "",
  password: "",
});
const isSystemuser = ref<boolean>(false);

function getUser() {
  usersRequest.getUsersId(props.selectedUserID).then((response) => {
    formData.value = response.data;
    isSystemuser.value = response.data.is_systemuser;
  });
}

function updateUser() {
  if (isSystemuser.value) {
    notificationStore.info = "Systemuser cannot be updated";
    return;
  }

  usersRequest
    .putUsers(props.selectedUserID, formData.value)
    .then((response) => {
      getUser();
      if (response.status == 200) {
        notificationStore.info = `Updated user ${formData.value.username}`;
        // } else if (response.status == 403) {
        //   notificationStore.warning = "Not enough permission"
      } else if (response.status == 404) {
        notificationStore.warning = "User not found";
      } else if (response.status == 422) {
        notificationStore.warning = "Data is incomplete";
      } else {
        notificationStore.warning = response.data.detail;
      }
    });
}

watch(
  () => props.selectedUserID,
  () => {
    if (props.selectedUserID == 0) {
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
    } else {
      getUser();
    }
  },
);

onMounted(() => getUser());
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
            :disabled="isSystemuser"
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
            :disabled="isSystemuser"
          />
        </div>
        <div id="btn">
          <ButtonUserUpdate v-on:click="updateUser" text="Update User" />
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
