<script setup lang="ts">
import { ref, watch, computed } from "vue"
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
  disabled: false
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
  <div class="scope">
    <div class="p">
      <div class="date-input">
        <Datepicker
          v-model="pickedDesiredDate"
          :format="formatDesiredDate"
          :clearable="true"
          :dark="userStore.user.theme == 'dark'"
        />
      </div>
      <span>{{ placeholderText }} </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  width: 100%;
  height: 100%;
}

.p {
  width: 100%;
  height: 100%;

  position: relative;
  display: inline-block;

  border: none;
  padding: 0;
  margin: 0;
}

span {
  width: max-content;
  height: min-content;

  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0;

  pointer-events: none;
  position: absolute;

  left: 0px;
  top: 1px;

  border: none;
  border-radius: var(--main-border-radius);

  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);

  color: white;
  background-color: var(--main-color);
  font-family: var(--main-font-head);
  font-size: 12px;
}

.date-input {
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