<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUsersStore, useUserStore } from '@/stores/user'
import { usersRequest } from '@/requests/users'

import type { UserSchema, UserUpdateSchema } from '@/schemas/user'
import type { ErrorDetailSchema } from '@/schemas/common'

import Toggle from '@vueform/toggle'
import LabeledInput from '@/components/elements/LabeledInput.vue'
import ButtonUserUpdate from '@/components/elements/ButtonUserUpdate.vue'

// Props & Emits
const props = defineProps<{
  selectedUserID: number
}>()

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const userStore = useUserStore()
const usersStore = useUsersStore()

const formData = ref<UserUpdateSchema>({
  is_active: false,
  is_superuser: false,
  is_adminuser: false,
  is_guestuser: false,
  username: '',
  full_name: '',
  email: '',
  password: '',
  language: 'enGB',
  rfid: null,
})
const isSystemuser = ref<boolean>(false)

function getUser() {
  usersRequest.getUsersID(props.selectedUserID).then((response) => {
    const data = response.data as UserSchema
    formData.value = data
    isSystemuser.value = data.is_systemuser
  })
}

function updateUser() {
  if (isSystemuser.value) {
    notificationStore.addInfo(languageStore.l.notification.info.cannotUpdateSystemUser)
    return
  }
  usersRequest.putUsers(props.selectedUserID, formData.value).then((response) => {
    getUser()
    userStore.get()
    usersStore.get()
    if (response.status == 200) {
      notificationStore.addInfo(languageStore.l.notification.info.updatedUserData)
    } else if (response.status == 422) {
      notificationStore.addWarn(languageStore.l.notification.warn.userDataIncomplete)
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
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
        username: '',
        full_name: '',
        email: '',
        password: '',
        language: 'enGB',
        rfid: null,
      }
    } else {
      getUser()
    }
  },
)

onMounted(() => getUser())
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="guestuser" class="grid-item-center">
          <Toggle v-model="formData.is_guestuser"></Toggle>
        </div>
        <div id="guestuser-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.guestuser }}
        </div>
        <div id="superuser" class="grid-item-center">
          <Toggle v-model="formData.is_superuser"></Toggle>
        </div>
        <div id="superuser-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.superUser }}
        </div>
        <div id="adminuser" class="grid-item-center">
          <Toggle v-model="formData.is_adminuser"></Toggle>
        </div>
        <div id="adminuser-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.adminUser }}
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="formData.is_active"></Toggle>
        </div>
        <div id="active-text" class="grid-item-left">
          {{ languageStore.l.settings.users.toggle.active }}
        </div>
        <div id="username" class="grid-item-center">
          <LabeledInput
            v-model:value="formData.username"
            :placeholder="languageStore.l.settings.users.input.usernamePlaceholder"
            :required="true"
            :disabled="isSystemuser"
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
          />
        </div>
        <div id="rfid" class="grid-item-center">
          <LabeledInput
            v-model:value="formData.rfid"
            :placeholder="languageStore.l.settings.users.input.rfidPlaceholder"
          />
        </div>
        <div id="btn">
          <ButtonUserUpdate
            v-on:click="updateUser"
            :text="languageStore.l.settings.users.button.update"
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
  grid-template-rows: 50px 50px 50px 50px 50px 25px 25px 25px 25px 50px;
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
