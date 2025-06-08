<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import { setTheme } from '@/helper/theme.helper'
import { usersRequest } from '@/requests/api/users'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

import type { AvailableOption } from '@/models/controls'
import type { UserSchema, UserUpdateSchema } from '@/schemas/user'
import type { ErrorDetailSchema, ErrorValidationSchema } from '@/schemas/common'

import Toggle from '@vueform/toggle'
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
const availableOptionsTheme: Array<AvailableOption> = [
  { text: 'Light', value: 'light' },
  { text: 'Dark', value: 'dark' },
]
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
      setTheme(data.theme || 'dark')

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
        <div id="theme" class="grid-item-center">
          <LabeledSelect
            v-model:value="formUserUpdate.theme"
            v-bind:options="availableOptionsTheme"
            :placeholder="languageStore.l.account.input.themePlaceholder"
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

    <div
      class="form-base-container form-base-container-bottom-space"
      v-if="
        userStore.user.work_hours_per_week &&
        userStore.user.auto_break_from &&
        userStore.user.auto_break_to
      "
    >
      <div class="auto-break-header">{{ languageStore.l.account.input.autoBreakByDay }}</div>
      <div id="grid-break">
        <div id="auto-break-mon" class="grid-item-left">
          <Toggle v-model="formUserUpdate.auto_break_mon" />
        </div>
        <div id="auto-break-mon-text" class="grid-item-left">
          {{ languageStore.l.account.input.autoBreakMon }}
        </div>
        <div id="auto-break-tue" class="grid-item-left">
          <Toggle v-model="formUserUpdate.auto_break_tue" />
        </div>
        <div id="auto-break-tue-text" class="grid-item-left">
          {{ languageStore.l.account.input.autoBreakTue }}
        </div>
        <div id="auto-break-wed" class="grid-item-left">
          <Toggle v-model="formUserUpdate.auto_break_wed" />
        </div>
        <div id="auto-break-wed-text" class="grid-item-left">
          {{ languageStore.l.account.input.autoBreakWed }}
        </div>
        <div id="auto-break-thu" class="grid-item-left">
          <Toggle v-model="formUserUpdate.auto_break_thu" />
        </div>
        <div id="auto-break-thu-text" class="grid-item-left">
          {{ languageStore.l.account.input.autoBreakThu }}
        </div>
        <div id="auto-break-fri" class="grid-item-left">
          <Toggle v-model="formUserUpdate.auto_break_fri" />
        </div>
        <div id="auto-break-fri-text" class="grid-item-left">
          {{ languageStore.l.account.input.autoBreakFri }}
        </div>
        <div id="auto-break-sat" class="grid-item-left">
          <Toggle v-model="formUserUpdate.auto_break_sat" />
        </div>
        <div id="auto-break-sat-text" class="grid-item-left">
          {{ languageStore.l.account.input.autoBreakSat }}
        </div>
        <div id="auto-break-sun" class="grid-item-left">
          <Toggle v-model="formUserUpdate.auto_break_sun" />
        </div>
        <div id="auto-break-sun-text" class="grid-item-left">
          {{ languageStore.l.account.input.autoBreakSun }}
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
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-template-columns: 50% calc(50% - 10px);
  grid-template-areas:
    'username username'
    'full-name full-name'
    'email email'
    'work-hours work-hours'
    'auto-break-from auto-break-to'
    'auto-logout auto-logout'
    'language language'
    'theme theme';
}

@media screen and (max-width: $max-width-tablet) {
  #grid {
    grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px;
    grid-template-columns: auto;
    grid-template-areas:
      'username'
      'full-name'
      'email'
      'work-hours'
      'auto-break-from'
      'auto-break-to'
      'auto-logout'
      'language'
      'theme';
  }
}

#grid-break {
  width: 100%;
  height: 100%;

  display: grid;
  grid-gap: 2px;

  padding-left: 15px;

  grid-template-rows: 30px 30px 30px 30px 30px 30px 30px;
  grid-template-columns: 60px auto;
  grid-template-areas:
    'auto-break-mon auto-break-mon-text'
    'auto-break-tue auto-break-tue-text'
    'auto-break-wed auto-break-wed-text'
    'auto-break-thu auto-break-thu-text'
    'auto-break-fri auto-break-fri-text'
    'auto-break-sat auto-break-sat-text'
    'auto-break-sun auto-break-sun-text';
}

#auto-break-mon {
  grid-area: auto-break-mon;
}

#auto-break-mon-text {
  grid-area: auto-break-mon-text;
}

#auto-break-tue {
  grid-area: auto-break-tue;
}

#auto-break-tue-text {
  grid-area: auto-break-tue-text;
}

#auto-break-wed {
  grid-area: auto-break-wed;
}

#auto-break-wed-text {
  grid-area: auto-break-wed-text;
}

#auto-break-thu {
  grid-area: auto-break-thu;
}

#auto-break-thu-text {
  grid-area: auto-break-thu-text;
}

#auto-break-fri {
  grid-area: auto-break-fri;
}

#auto-break-fri-text {
  grid-area: auto-break-fri-text;
}

#auto-break-sat {
  grid-area: auto-break-sat;
}

#auto-break-sat-text {
  grid-area: auto-break-sat-text;
}

#auto-break-sun {
  grid-area: auto-break-sun;
}

#auto-break-sun-text {
  grid-area: auto-break-sun-text;
}

#language {
  grid-area: language;
}

#theme {
  grid-area: theme;
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

.auto-break-header {
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 15px;
}
</style>
