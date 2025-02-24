<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'

const languageStore = useLanguageStore()
const userStore = useUserStore()

interface Props {
  pickedDate: Date | null
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'update:pickedDate', v: Date | null): void
}>()

const computedPickedDate = computed<Date | null>({
  get() {
    return props.pickedDate
  },
  set(newValue) {
    emit('update:pickedDate', newValue)
    return newValue
  },
})

const formatPickedDate = (pickedDate: Date) => {
  const day = pickedDate.getDate()
  const month = pickedDate.getMonth() + 1
  const year = pickedDate.getFullYear()
  return `${day}.${month}.${year}`
}
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="date" class="grid-item-center">
          <Datepicker
            class="form-base-date-input"
            v-model="computedPickedDate"
            :format="formatPickedDate"
            :clearable="false"
            :placeholder="languageStore.l.settings.logs.input.datePlaceholder"
            :dark="userStore.user.theme == 'dark'"
            :max-date="moment().toDate()"
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
  grid-template-rows: 40px;
  grid-template-columns: auto;
  grid-template-areas: 'date';
}

#date {
  grid-area: date;
}
</style>
