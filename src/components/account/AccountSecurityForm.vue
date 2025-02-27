<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'

import { usersRequest } from '@/requests/api/users'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

import type { UserSchema, UserUpdateSchema } from '@/schemas/user'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import ButtonUserUpdate from '@/components/elements/ButtonUserUpdate.vue'
import ButtonLoading from '@/components/elements/ButtonLoading.vue'

const languageStore = useLanguageStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

const formUserUpdate = ref<UserUpdateSchema>(JSON.parse(JSON.stringify(userStore.user)))
const errorsByElement = ref({
  password: false,
})
const loading = ref<boolean>(false)

const retypedPassword = ref<string>('')
const passwordsMatch = computed<boolean>(() => {
  return formUserUpdate.value.password == retypedPassword.value
})

function updateUser() {
  loading.value = true
  errorsByElement.value = {
    password: false,
  }
  if (!formUserUpdate.value.password) {
    notificationStore.addWarn(languageStore.l.notification.warn.passwordCannotBeEmpty)
    formUserUpdate.value.password = ''
    retypedPassword.value = ''
    return
  }
  if (!passwordsMatch.value) {
    notificationStore.addWarn(languageStore.l.notification.warn.passwordsDontMatch)
    formUserUpdate.value.password = ''
    retypedPassword.value = ''
    return
  }

  usersRequest.putUsersMe(formUserUpdate.value).then((response) => {
    setTimeout(() => {
      loading.value = false
    }, 400)

    if (response.status == 200) {
      const data = response.data as UserSchema
      userStore.user = data
      formUserUpdate.value = JSON.parse(JSON.stringify(userStore.user))

      errorsByElement.value.password = false
      formUserUpdate.value.password = ''
      retypedPassword.value = ''

      languageStore.apply(userStore.user.language)
      notificationStore.addInfo(languageStore.l.notification.info.updatedUserData)
    } else if (response.status == 422) {
      const data = response.data as ErrorValidationSchema
      for (let i = 0; i < data.detail.length; i++) {
        if (data.detail[i].loc[1] == 'password') {
          errorsByElement.value.password = true
          formUserUpdate.value.password = ''
          retypedPassword.value = ''
          setTimeout(() => {
            errorsByElement.value.password = false
          }, 4000)
        }
      }
      notificationStore.addWarn(data.detail[0].msg)
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
    <div class="controls-base-container">
      <ButtonLoading
        v-if="loading"
        class="controls-base-element"
        :text="languageStore.l.account.button.save"
      />
      <ButtonUserUpdate
        v-else
        class="controls-base-element"
        v-on:click="updateUser"
        :text="languageStore.l.account.button.save"
      />
    </div>

    <div class="form-base-container form-base-container-bottom-space">
      <div id="grid">
        <div id="password" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.password"
            :placeholder="languageStore.l.account.input.passwordPlaceholder"
            :error="errorsByElement.password || (retypedPassword.length > 0 && !passwordsMatch)"
            type="password"
          />
        </div>
        <div id="password-retype" class="grid-item-center">
          <LabeledInput
            v-model:value="retypedPassword"
            :placeholder="languageStore.l.account.input.passwordRetypePlaceholder"
            :error="errorsByElement.password || (retypedPassword.length > 0 && !passwordsMatch)"
            type="password"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';
@use '@/scss/controls/controlsBase.scss';

.form-base-container {
  padding-top: 10px;
  margin-top: 15px;
}

#grid {
  grid-template-rows: 50px 50px;
  grid-template-columns: auto;
  grid-template-areas:
    'password'
    'password-retype';
}

#password {
  grid-area: password;
}

#password-retype {
  grid-area: password-retype;
}
</style>
