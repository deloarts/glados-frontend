<script setup lang="ts">
import { watch, ref, computed, onBeforeMount } from 'vue'
import moment from 'moment'

import { useLanguageStore } from '@/stores/language'

import type { UserTimeCreateSchema } from '@/schemas/userTime'
import type { TimeModel } from '@vuepic/vue-datepicker'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledDatepicker from '@/components/elements/LabeledDatepicker.vue'

// Stores
const languageStore = useLanguageStore()

// Props & Emits
const props = defineProps<{
  formData: UserTimeCreateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: UserTimeCreateSchema): void
}>()

const createFormData = computed<UserTimeCreateSchema>(() => props.formData)
const selectedDate = ref<Date>()
const selectedLogin = ref<TimeModel>()
const selectedLogout = ref<TimeModel | null>()

function setTime() {
  if (selectedLogin.value) {
    const login = moment(selectedDate.value)
    login.set('hours', Number(selectedLogin.value.hours))
    login.set('minutes', Number(selectedLogin.value.minutes))
    createFormData.value.login = login.toDate()
  } else {
    createFormData.value.login = null
  }

  if (selectedLogout.value) {
    const logout = moment(selectedDate.value)
    logout.set('hours', Number(selectedLogout.value.hours))
    logout.set('minutes', Number(selectedLogout.value.minutes))
    createFormData.value.logout = logout.toDate()
  } else {
    createFormData.value.logout = null
  }
}

watch(
  () => createFormData,
  () => {
    emit('update:formData', createFormData.value)
  },
  { deep: true },
)

watch(
  () => selectedDate,
  () => {
    setTime()
  },
  { deep: true },
)

watch(
  () => selectedLogin,
  () => {
    setTime()
  },
  { deep: true },
)

watch(
  () => selectedLogout,
  () => {
    setTime()
  },
  { deep: true },
)

onBeforeMount(() => {
  const now = moment()

  selectedDate.value = props.formData.login ? props.formData.login : now.toDate()
  selectedLogin.value = {
    hours: selectedDate.value.getHours(),
    minutes: selectedDate.value.getMinutes(),
    seconds: 0,
  }
  selectedLogout.value = null
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container form-base-container-bottom-space">
      <div id="grid">
        <div id="date" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="selectedDate"
            :placeholder="languageStore.l.userTime.input.datePlaceholder"
            :disable-time="true"
            :required="true"
            format="DD.MM.YYYY"
          />
        </div>
        <div id="login" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="selectedLogin"
            :placeholder="languageStore.l.userTime.input.loginPlaceholder"
            :time-only="true"
            :required="true"
            :disabled="selectedDate == null"
            format="HH:mm"
          />
        </div>
        <div id="logout" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="selectedLogout"
            :placeholder="languageStore.l.userTime.input.logoutPlaceholder"
            :time-only="true"
            :disabled="selectedDate == null"
            format="HH:mm"
          />
        </div>
        <div id="note" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.note"
            :placeholder="languageStore.l.userTime.input.notePlaceholder"
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

#grid {
  grid-template-rows: 50px 50px 50px 50px;
  grid-template-columns: 600px;
  grid-template-areas:
    'date'
    'login'
    'logout'
    'note';
}

@media screen and (max-width: $max-width-tablet) {
  #grid {
    grid-template-columns: auto;
  }
}

#date {
  grid-area: date;
}

#login {
  grid-area: login;
}

#logout {
  grid-area: logout;
}

#note {
  grid-area: note;
}
</style>
