<script setup lang="ts">
import { computed } from "vue"

interface Props {
  value: number | string | null | undefined
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
  (e: 'update:value', v: number | string | null | undefined): void
}>()

const computedValue = computed<number | string | null | undefined>({
  get() {
    return props.value
  },
  set(newValue) {
    emit('update:value', newValue)
    return newValue
  },
})

const placeholderText = computed<string>(() => {
  return props.required ? `${props.placeholder} *` : `${props.placeholder}`
})

</script>

<template>
  <div class="scope">
    <p>
      <textarea v-model="computedValue" :type="props.type" :disabled="props.disabled"></textarea>
      <span>{{ placeholderText }} </span>
    </p>
  </div>
</template>

<style scoped lang="scss">

.scope {
  width: 100%;
  height: 100%;
}

p {
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

textarea {
  width: calc(100% - 15px);
  height: calc(100% - 12px);

  color: var(--main-text-color);
  background-color: var(--input-background);

  font-family: var(--main-font-text);
  font-size: 1em;

  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;

  margin: 0;
  margin-top: 15px;
  margin-left: 10px;
  
  overflow: auto;
  resize: none;

  box-sizing: border-box;
  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--input-border-color);
  border-radius: var(--main-border-radius);
  outline: none;

  transition: all 0.2s ease;
}

textarea:hover {
  background-color: var(--main-background-color-hover);
}

textarea:focus {
  border-color: var(--main-color);
}
</style>