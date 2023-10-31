<script setup>
import { ref, onMounted } from "vue"
import { usersRequest } from "@/requests/users"
import { useNotificationStore } from "@/stores/notification.js"

import Toggle from "@vueform/toggle"
import ButtonUserUpdate from "@/components/elements/ButtonUserUpdate.vue"

// Stores
const notificationStore = useNotificationStore()

let formData = ref({
  username: "",
  full_name: "",
  email: "",
  password: "",
})

function getUser() {
  usersRequest.getUsersMe().then(response => {
    formData.value = response.data
  })
}
        
function updateUser() {
  usersRequest.putUsersMe(formData.value).then(response => {
    getUser()
    if (response.status == 200) {
      notificationStore.info = `Updated user ${formData.value.username}.`
    } else if (response.status == 422) {
      notificationStore.warning = "Data is incomplete."
    } else {
      notificationStore.warning = response.data.detail;
    }
  })
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="username" class="grid-item-center">
          <input class="form-base-text-input" v-model="formData.username" type="text" placeholder="Username" readonly>
        </div>
        <div id="full-name" class="grid-item-center">
          <input class="form-base-text-input" v-model="formData.full_name" placeholder="Name">
        </div>
        <div id="email" class="grid-item-center">
          <input class="form-base-text-input" v-model="formData.email" placeholder="Mail">
        </div>
        <div id="password" class="grid-item-center">
          <input class="form-base-text-input" v-model="formData.password" placeholder="Password">
        </div>
        <div id="btn">
          <ButtonUserUpdate v-on:click="updateUser" text="Save"></ButtonUserUpdate>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/form/formBase.scss';
@import '@/scss/grid/gridBase.scss';

#grid {
    grid-template-rows: 40px 40px 40px 40px auto;
    grid-template-columns: 50px auto;
    grid-template-areas: "username username"
        "full-name full-name"
        "email email"
        "password password"
        "btn btn"
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