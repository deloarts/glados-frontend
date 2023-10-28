<script setup>
import { ref, watch, onMounted } from "vue"

import { useNotificationStore } from "@/stores/notification.js"
import { usersRequest } from "@/requests/users"
import { usersService } from "@/services/users.service"

import Toggle from "@vueform/toggle"
import ButtonUserUpdate from "@/components/elements/ButtonUserUpdate.vue"

// Props & Emits
const props = defineProps(["selectedUserID"])

// Stores
const notificationStore = useNotificationStore()

const formData = ref({
  id: 0,
  is_active: false,
  is_superuser: false,
  is_systemuser: false,
  username: "",
  full_name: "",
  email: "",
  password: "",
})

function getUser() {
  usersRequest.getUsersId(props.selectedUserID).then(response => {
    formData.value = response.data
  })
}
    
function updateUser() {
  usersRequest.putUsers(props.selectedUserID, formData.value).then(response => {
    getUser();
    usersService.clearCache();
    if (response.status == 200) {
      notificationStore.info = `Updated user ${formData.value.username}`
    } else if (response.status == 404) {
      notificationStore.warning = "User not found"
    } else if (response.status == 422) {
      notificationStore.warning = "Data is incomplete"
    } else {
      notificationStore.warning = "Failed to update user"
    }
  })
}

watch(props.selectedUserID, () => {
  if (props.selectedUserID == 0) {
    formData.value = {
      id: 0,
      is_active: false,
      is_superuser: false,
      is_systemuser: false,
      username: "",
      full_name: "",
      email: "",
      password: "",
    }
  } else {
    getUser()
  }
})

onMounted(() => getUser())
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="superuser" class="grid-item-center">
          <Toggle v-model="formData.is_superuser" :disabled="formData.is_systemuser"></Toggle>
        </div>
        <div id="superuser-text" class="grid-item-left">
          Superuser
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="formData.is_active" :disabled="formData.is_systemuser"></Toggle>
        </div>
        <div id="active-text" class="grid-item-left">
          Active
        </div>
        <div id="username" class="grid-item-center">
          <input class="text-input" v-model="formData.username" type="text" placeholder="Username"
            :disabled="formData.is_systemuser">
        </div>
        <div id="full-name" class="grid-item-center">
          <input class="text-input" v-model="formData.full_name" placeholder="Name">
        </div>
        <div id="email" class="grid-item-center">
          <input class="text-input" v-model="formData.email" placeholder="Mail">
        </div>
        <div id="password" class="grid-item-center">
          <input class="text-input" v-model="formData.password" placeholder="Password"
            :disabled="formData.is_systemuser">
        </div>
        <div id="btn">
          <ButtonUserUpdate v-on:click="updateUser" text="Update User"></ButtonUserUpdate>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 40px 40px 40px 40px 25px 25px 40px;
  grid-template-columns: 50px auto;
  grid-template-areas: "username username"
    "full-name full-name"
    "email email"
    "password password"
    "superuser superuser-text"
    "active active-text"
    "btn btn"
}

#btn {
  grid-area: btn;
}

#superuser {
  grid-area: superuser;
}

#superuser-text {
  grid-area: superuser-text;
}

#active {
  grid-area: active;
}

#active-text {
  grid-area: active-text;
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