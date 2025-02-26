<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import { usersRequest } from '@/requests/api/users'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

import type { AvailableOption } from '@/models/controls'
import type { UserSchema, UserUpdateSchema } from '@/schemas/user'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledSelect from '@/components/elements/LabeledSelect.vue'
import ButtonUserUpdate from '@/components/elements/ButtonUserUpdate.vue'
import ButtonUndo from '@/components/elements/ButtonUndo.vue'
import ButtonLoading from '@/components/elements/ButtonLoading.vue'

const languageStore = useLanguageStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

const formUserUpdate = ref<UserUpdateSchema>(JSON.parse(JSON.stringify(userStore.user)))
const errorsByElement = ref({
  fullName: false,
  mail: false,
  workHours: false,
  breakFrom: false,
  breakTo: false,
})
const loading = ref<boolean>(false)
const loadingUndo = ref<boolean>(false)

// Options
let availableOptionsLanguage: Array<AvailableOption> = []
const availableOptionsAutoLogout: Array<AvailableOption> = [
  {
    text: languageStore.l.account.option.logMeOut,
    value: true,
  },
  {
    text: languageStore.l.account.option.keepMeLoggedIn,
    value: false,
  },
]

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
  loading.value = true

  errorsByElement.value = {
    fullName: false,
    mail: false,
    workHours: false,
    breakFrom: false,
    breakTo: false,
  }

  if (String(formUserUpdate.value.work_hours_per_week).length == 0) {
    formUserUpdate.value.work_hours_per_week = null
  }
  if (String(formUserUpdate.value.auto_break_from).length == 0) {
    formUserUpdate.value.auto_break_from = null
  }
  if (String(formUserUpdate.value.auto_break_to).length == 0) {
    formUserUpdate.value.auto_break_to = null
  }

  usersRequest.putUsersMe(formUserUpdate.value).then((response) => {
    setTimeout(() => {
      loading.value = false
    }, 400)

    if (response.status == 200) {
      const data = response.data as UserSchema
      userStore.user = data
      formUserUpdate.value = JSON.parse(JSON.stringify(userStore.user))
      languageStore.apply(userStore.user.language)
      notificationStore.addInfo(languageStore.l.notification.info.updatedUserData)
    } else if (response.status == 422) {
      const data = response.data as ErrorValidationSchema
      for (let i = 0; i < data.detail.length; i++) {
        if (data.detail[i].loc[1] == 'full_name') {
          errorsByElement.value.fullName = true
        }
        if (data.detail[i].loc[1] == 'email') {
          errorsByElement.value.mail = true
        }
        if (data.detail[i].loc[1] == 'work_hours_per_week') {
          errorsByElement.value.workHours = true
        }
        if (data.detail[i].loc[1] == 'auto_break_from') {
          errorsByElement.value.breakFrom = true
        }
        if (data.detail[i].loc[1] == 'auto_break_to') {
          errorsByElement.value.breakTo = true
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

async function onUndo() {
  loadingUndo.value = true
  await loadUserData()
  setTimeout(() => {
    loadingUndo.value = false
  }, 400)
}

onBeforeMount(() => {
  setOptionsLanguage()
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
      <ButtonLoading
        v-if="loadingUndo"
        class="controls-base-element"
        :text="languageStore.l.userTime.button.undo"
      />
      <ButtonUndo
        v-else
        class="controls-base-element"
        :text="languageStore.l.userTime.button.undo"
        v-on:click="onUndo"
      />
    </div>

    <div class="form-base-container form-base-container-bottom-space">
      <div id="grid">
        <div
          id="username"
          class="grid-item-center"
          v-on:click="
            notificationStore.addWarn(languageStore.l.notification.info.onlyAdminCanChangeUsername)
          "
        >
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
            :error="errorsByElement.fullName"
          />
        </div>
        <div id="email" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.email"
            :placeholder="languageStore.l.account.input.emailPlaceholder"
            :error="errorsByElement.mail"
          />
        </div>
        <div id="language" class="grid-item-center">
          <LabeledSelect
            v-model:value="formUserUpdate.language"
            v-bind:options="availableOptionsLanguage"
            :placeholder="languageStore.l.account.input.languagePlaceholder"
          />
        </div>
        <div id="work-hours" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.work_hours_per_week"
            :placeholder="languageStore.l.account.input.workHoursPerWeekPlaceholder"
            :error="errorsByElement.workHours"
            type="number"
          />
        </div>
        <div id="auto-break-from" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.auto_break_from"
            :placeholder="languageStore.l.account.input.autoBreakFromPlaceholder"
            :error="errorsByElement.breakFrom"
          />
        </div>
        <div id="auto-break-to" class="grid-item-center">
          <LabeledInput
            v-model:value="formUserUpdate.auto_break_to"
            :placeholder="languageStore.l.account.input.autoBreakToPlaceholder"
            :error="errorsByElement.breakTo"
          />
        </div>
        <div id="auto-logout" class="grid-item-center">
          <LabeledSelect
            v-model:value="formUserUpdate.auto_logout"
            v-bind:options="availableOptionsAutoLogout"
            :placeholder="languageStore.l.account.input.autoLogoutPlaceholder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/variables.scss' as *;
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';
@use '@/scss/controls/controlsBase.scss';

.form-base-container {
  padding-top: 10px;
  margin-top: 15px;
}

#grid {
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px;
  grid-template-columns: 50% calc(50% - 10px);
  grid-template-areas:
    'username username'
    'full-name full-name'
    'email email'
    'work-hours work-hours'
    'auto-break-from auto-break-to'
    'auto-logout auto-logout'
    'language language';
}

@media screen and (max-width: $max-width-tablet) {
  #grid {
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-template-columns: auto;
  grid-template-areas:
    'username'
    'full-name'
    'email'
    'work-hours'
    'auto-break-from'
    'auto-break-to'
    'auto-logout'
    'language';
}
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

#email {
  grid-area: email;
}

#work-hours {
  grid-area: work-hours;
}

#auto-break-from {
  grid-area: auto-break-from;
}

#auto-break-to {
  grid-area: auto-break-to;
}

#auto-logout {
  grid-area: auto-logout;
}
</style>
