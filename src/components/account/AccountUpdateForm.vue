<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import { usersRequest } from '@/requests/users'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

import type { AvailableOption } from '@/models/controls'
import type { UserUpdateSchema } from '@/schemas/user'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledSelect from '@/components/elements/LabeledSelect.vue'
import ButtonUserUpdate from '@/components/elements/ButtonUserUpdate.vue'

const languageStore = useLanguageStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

const formUserUpdate = ref<UserUpdateSchema>({
  username: userStore.user.username,
  full_name: userStore.user.full_name,
  email: userStore.user.email,
  language: userStore.user.language,
})

// Options
let availableOptionsLanguage: Array<AvailableOption> = []

function setOptionsLanguage() {
  const temp = []
  for (let i = 0; i < languageStore.languageOptions.length; i++) {
    temp.push({
      text: `${languageStore.languageOptions[i].text}`,
      value: languageStore.languageOptions[i].value,
    })
  }
  availableOptionsLanguage = temp
}

function updateUser() {
  usersRequest.putUsersMe(formUserUpdate.value).then((response) => {
    if (response.status == 200) {
      userStore.user = response.data
      languageStore.apply(userStore.user.language)
      notificationStore.addInfo(languageStore.l.notification.info.updatedUserData)
    } else if (response.status == 422) {
      notificationStore.addWarn(languageStore.l.notification.warn.userDataIncomplete)
    } else {
      notificationStore.addWarn(response.data.detail)
    }
  })
}

onBeforeMount(() => {
  setOptionsLanguage()
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="username" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.username"
            :placeholder="languageStore.l.account.input.usernamePlaceholder"
            :disabled="true"
          />
        </div>
        <div id="full-name" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.full_name"
            :placeholder="languageStore.l.account.input.fullNamePlaceholder"
          />
        </div>
        <div id="email" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.email"
            :placeholder="languageStore.l.account.input.emailPlaceholder"
          />
        </div>
        <div id="password" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.password"
            :placeholder="languageStore.l.account.input.passwordPlaceholder"
          />
        </div>
        <div id="language" class="grid-item-center">
          <LabeledSelect
            v-model:value="formUserUpdate.language"
            v-bind:options="availableOptionsLanguage"
            :placeholder="languageStore.l.account.input.languagePlaceholder"
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
  grid-template-rows: 50px 50px 50px 50px 50px auto;
  grid-template-columns: 50px auto;
  grid-template-areas:
    'username username'
    'full-name full-name'
    'email email'
    'password password'
    'language language'
    'btn btn';
}

#btn {
  grid-area: btn;
}

#language {
  grid-area: language;
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
