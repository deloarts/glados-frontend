<script setup lang="ts">
import { ref, computed } from 'vue'
import moment from 'moment'

import type { UserTimeCreateSchema } from '@/schemas/userTime'

import ControlsNew from '@/components/userTime/ControlsNew.vue'
import CreateForm from '@/components/userTime/CreateForm.vue'
import WarningForForm from '@/components/common/WarningForForm.vue'

import { useUserTimeStore } from '@/stores/userTime'
import { useLanguageStore } from '@/stores/language'

const userTimeStore = useUserTimeStore()
const languageStore = useLanguageStore()

// Form stuff
const formData = ref<UserTimeCreateSchema>({
  login: null,
  logout: null,
  note: '',
})

const warning = computed<string | null>(() => {
  if (userTimeStore.loggedInSince) {
    return languageStore.l.userTime.warnings.cannotCreateWhileLoggedIn
  }
  if (!formData.value.login) {
    return languageStore.l.userTime.warnings.loginMustBeProvided
  }
  if (formData.value.login && !formData.value.logout && moment(formData.value.login).date() != moment().date()) {
    return languageStore.l.userTime.warnings.loginMustBeToday
  }
  if (formData.value.logout && formData.value.login > formData.value.logout) {
    return languageStore.l.userTime.warnings.loginAfterLogout
  }
  return null
})
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <ControlsNew v-model:form-data="formData" />
        </div>
        <div id="data">
          <CreateForm v-model:form-data="formData" />
        </div>
        <div id="warning" v-if="warning">
          <WarningForForm :text="warning" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas:
    'controls'
    'data'
    'warning';
}

#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}

#warning {
  grid-area: warning;
}
</style>
