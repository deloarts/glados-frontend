<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import { usersRequest } from '@/requests/api/users'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

import type { UserSchema, UserUpdateSchema } from '@/schemas/user'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import ButtonUserUpdate from '@/components/elements/ButtonUserUpdate.vue'

const languageStore = useLanguageStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

const formUserUpdate = ref<UserUpdateSchema>(JSON.parse(JSON.stringify(userStore.user)))
const errorsByElement = ref({
  password: false,
})

function updateUser() {
  errorsByElement.value = {
    password: false,
  }

  usersRequest.putUsersMe(formUserUpdate.value).then((response) => {
    if (response.status == 200) {
      const data = response.data as UserSchema
      userStore.user = data
      formUserUpdate.value = JSON.parse(JSON.stringify(userStore.user))
      languageStore.apply(userStore.user.language)
      notificationStore.addInfo(languageStore.l.notification.info.updatedUserData)
    } else if (response.status == 422) {
      const data = response.data as ErrorValidationSchema
      for (let i = 0; i < data.detail.length; i++) {
        if (data.detail[i].loc[1] == 'password') {
          errorsByElement.value.password = true
        }
      }
      notificationStore.addWarn(languageStore.l.notification.warn.userDataIncomplete)
    } else {
      const data = response.data as ErrorDetailSchema
      notificationStore.addWarn(data.detail)
    }
  })
}

async function loadUserData() {
  await userStore.get()
  formUserUpdate.value = JSON.parse(JSON.stringify(userStore.user))
}

onBeforeMount(() => {
  loadUserData()
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="password" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.password"
            :placeholder="languageStore.l.account.input.passwordPlaceholder"
            :error="errorsByElement.password"
          />
        </div>
        <div id="btn">
          <ButtonUserUpdate v-on:click="updateUser" :text="languageStore.l.account.button.save" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 50px auto;
  grid-template-columns: 50% calc(50% - 10px);
  grid-template-areas:
    'password password'
    'btn btn';
}

#btn {
  padding-top: 20px;
  grid-area: btn;
}

#password {
  grid-area: password;
}
</style>
