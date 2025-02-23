<script setup lang="ts">
import { watch, computed } from 'vue'

import { useLanguageStore } from '@/stores/language'

import type { UserTimeUpdateSchema } from '@/schemas/userTime'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledDatepicker from '@/components/elements/LabeledDatepicker.vue'

// Props & Emits
const props = defineProps<{
  formData: UserTimeUpdateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: UserTimeUpdateSchema): void
}>()

// Computed
const updateFormData = computed<UserTimeUpdateSchema>(() => props.formData)

// Stores
const languageStore = useLanguageStore()

watch(
  () => updateFormData,
  () => {
    emit('update:formData', updateFormData.value)
  },
  { deep: true },
)
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container form-base-container-bottom-space">
      <div id="grid">
        <div id="login" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="updateFormData.login"
            :placeholder="languageStore.l.userTime.input.loginPlaceholder"
            :required="true"
            format="DD.MM.YYYY HH:mm:ss"
          />
        </div>
        <div id="logout" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="updateFormData.logout"
            :placeholder="languageStore.l.userTime.input.logoutPlaceholder"
            format="DD.MM.YYYY HH:mm:ss"
          />
        </div>
        <div id="note" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.note"
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
  grid-template-rows: 50px 50px 50px;
  grid-template-columns: 600px;
  grid-template-areas:
    'login'
    'logout'
    'note';
}

@media screen and (max-width: $max-width-tablet) {
  #grid {
    grid-template-columns: auto;
  }
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
