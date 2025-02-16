<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import Datepicker from '@vuepic/vue-datepicker'

import LabeledLabel from './LabeledLabel.vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

interface Props {
  value: Date | null | undefined
  placeholder: string
  type?: string
  format?: string
  returnAsDate?: boolean
  required?: boolean
  disabled?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  format: 'YYYY-MM-DD',
  returnAsDate: false,
  required: false,
  disabled: false,
})
const emit = defineEmits<{
  (e: 'update:value', v: Date | null | undefined): void
}>()

const computedValue = computed<Date | null | undefined>({
  get() {
    return props.value
  },
  set(newValue) {
    emit('update:value', newValue)
    return newValue
  },
})

const formatDate = (pickedDate: Date) => {
  return moment(pickedDate).format(props.format)
}
</script>

<template>
  <div class="labeled-scope">
    <div class="labeled-container">
      <div class="labeled-input-date">
        <Datepicker
          v-model="computedValue"
          :format="formatDate"
          :clearable="true"
          :dark="userStore.user.theme == 'dark'"
        />
      </div>
      <LabeledLabel
        :value="props.placeholder"
        :tooltip="props.tooltip"
        :required="props.required"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/common/labeled.scss';

.labeled-input-date {
  width: calc(100% - 15px);
  height: calc(100% - 15px);

  color: var(--main-text-color);
  background-color: transparent;

  padding: 0;
  padding-right: 10px;

  margin: 0;
  margin-top: 15px;
  margin-left: 10px;

  border: none;
  transition: all 0.2s ease;
}
</style>
