<script setup lang="ts">
import { watch, computed } from 'vue'

import { useLanguageStore } from '@/stores/language'

import type { UserTimeCreateSchema } from '@/schemas/userTime'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledDatepicker from '@/components/elements/LabeledDatepicker.vue'

// Props & Emits
const props = defineProps<{
  formData: UserTimeCreateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: UserTimeCreateSchema): void
}>()

// Computed
const createFormData = computed<UserTimeCreateSchema>(() => props.formData)

// Stores
const languageStore = useLanguageStore()

watch(
  () => createFormData,
  () => {
    
    emit('update:formData', createFormData.value)
  },
  { deep: true },
)

</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="login" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="createFormData.login"
            :placeholder="languageStore.l.userTime.input.loginPlaceholder"
            :required="true"
            format="DD.MM.YYYY HH:mm:ss"
          />
        </div>
        <div id="logout" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="createFormData.logout"
            :placeholder="languageStore.l.userTime.input.logoutPlaceholder"
            format="DD.MM.YYYY HH:mm:ss"
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
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 50px 50px 50px;
  grid-template-columns: auto;
  grid-template-areas:
    'login'
    'logout'
    'note';
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
