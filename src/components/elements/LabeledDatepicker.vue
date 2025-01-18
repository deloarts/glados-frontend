<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import moment from 'moment'
import Datepicker from '@vuepic/vue-datepicker'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

interface Props {
  value: Date | null | undefined
  placeholder: string
  type?: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
})
const emit = defineEmits<{
  (e: 'update:value', v: Date | null | undefined): void
}>()

const pickedDesiredDate = ref<Date | null>(null)
const formatDesiredDate = (pickedDesiredDate: Date) => {
  const day = pickedDesiredDate.getDate()
  const month = pickedDesiredDate.getMonth() + 1
  const year = pickedDesiredDate.getFullYear()
  return `${day}.${month}.${year}`
}

const placeholderText = computed<string>(() => {
  return props.required ? `${props.placeholder} *` : `${props.placeholder}`
})

watch(
  () => props.value,
  () => {
    if (props.value != null && props.value != undefined) {
      const date = Date.parse(String(props.value))
      pickedDesiredDate.value = new Date(date)
    }
    emit('update:value', pickedDesiredDate.value)
  },
  { deep: true },
)

watch(pickedDesiredDate, () => {
  let newValue
  if (pickedDesiredDate.value instanceof Date) {
    newValue = moment(pickedDesiredDate.value).format('YYYY-MM-DD')
  } else {
    newValue = null
  }
  emit('update:value', newValue)
})
</script>

<template>
  <div class="labeled-scope">
    <div class="labeled-container">
      <div class="labeled-input-date">
        <Datepicker
          v-model="pickedDesiredDate"
          :format="formatDesiredDate"
          :clearable="true"
          :dark="userStore.user.theme == 'dark'"
        />
      </div>
      <div class="labeled-label">{{ placeholderText }}</div>
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
