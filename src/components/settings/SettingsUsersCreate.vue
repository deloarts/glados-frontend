<script setup lang="ts">
import { ref } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUsersStore, useUserStore } from '@/stores/user'
import { usersRequest } from '@/requests/users'

import type { UserCreateSchema } from '@/schemas/user'
import type { ErrorDetailSchema } from '@/schemas/common'

import Toggle from '@vueform/toggle'
import LabeledInput from '@/components/elements/LabeledInput.vue'
import ButtonUserCreate from '@/components/elements/ButtonUserCreate.vue'

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const userStore = useUserStore()
const usersStore = useUsersStore()

const formData = ref<UserCreateSchema>({
  is_active: false,
  is_superuser: false,
  is_adminuser: false,
  is_guestuser: false,
  username: '',
  full_name: '',
  email: '',
  password: '',
  rfid: null,
})

function createUser() {
  usersRequest.postUsers(formData.value).then((response) => {
    userStore.get()
    usersStore.get()

    if (response.status == 200) {
      notificationStore.addInfo(languageStore.l.notification.info.createdUser)
      formData.value = {
        is_active: false,
        is_superuser: false,
        is_adminuser: false,
        is_guestuser: false,
        username: '',
        full_name: '',
        email: '',
        password: '',
        rfid: null,
      }
    } else if (response.status == 422) {
      notificationStore.addWarn(languageStore.l.notification.warn.userDataIncomplete)
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
}
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="guestuser" class="grid-item-center">
          <Toggle v-model="formData.is_guestuser" />
        </div>
        <div id="guestuser-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.guestuser }}
        </div>
        <div id="superuser" class="grid-item-center">
          <Toggle v-model="formData.is_superuser" />
        </div>
        <div id="superuser-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.superUser }}
        </div>
        <div id="adminuser" class="grid-item-center">
          <Toggle v-model="formData.is_adminuser" />
        </div>
        <div id="adminuser-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.adminUser }}
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="formData.is_active" />
        </div>
        <div id="active-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.active }}
        </div>
        <div id="username" class="grid-item-center">
          <LabeledInput
            v-model:value="formData.username"
            :placeholder="languageStore.l.settings.users.input.usernamePlaceholder"
            :required="true"
          />
        </div>
        <div id="full-name" class="grid-item-center">
          <LabeledInput
            v-model:value="formData.full_name"
            :placeholder="languageStore.l.settings.users.input.fullNamePlaceholder"
            :required="true"
          />
        </div>
        <div id="email" class="grid-item-center">
          <LabeledInput
            v-model:value="formData.email"
            :placeholder="languageStore.l.settings.users.input.mailPlaceholder"
            :required="true"
          />
        </div>
        <div id="password" class="grid-item-center">
          <LabeledInput
            v-model:value="formData.password"
            :placeholder="languageStore.l.settings.users.input.passwordPlaceholder"
            :required="true"
          />
        </div>
        <div id="rfid" class="grid-item-center">
          <LabeledInput
            v-model:value="formData.rfid"
            :placeholder="languageStore.l.settings.users.input.rfidPlaceholder"
          />
        </div>
        <div id="btn">
          <ButtonUserCreate
            v-on:click="createUser"
            :text="languageStore.l.settings.users.button.create"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 50px 50px 50px 50px 50px 25px 25px 25px 25px auto;
  grid-template-columns: 50px auto;
  grid-template-areas:
    'username username'
    'full-name full-name'
    'email email'
    'password password'
    'rfid rfid'
    'active active-text'
    'guestuser guestuser-text'
    'superuser superuser-text'
    'adminuser adminuser-text'
    'btn btn';
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

#rfid {
  grid-area: rfid;
}

#email {
  grid-area: email;
}
</style>
