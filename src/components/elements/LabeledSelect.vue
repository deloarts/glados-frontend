<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

import LabeledLabel from './LabeledLabel.vue'
import { useLanguageStore } from '@/stores/language'

import type { AvailableOption } from '@/models/controls'

const languageStore = useLanguageStore()

interface Props {
  value: boolean | number | string | Date | null | undefined
  options: Array<AvailableOption>
  placeholder: string
  required?: boolean
  disabled?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
})
const emit = defineEmits<{
  (e: 'update:value', v: boolean | number | string | Date | null | undefined): void
}>()

const inputSearch = ref<HTMLElement>()
const optionIndex = ref<number | null>(null)
const filteredOptions = ref<Array<AvailableOption>>()
const searchText = ref<string | null>()
const computedText = computed<string | null>(() => {
  return optionIndex.value != null ? props.options[optionIndex.value].text : null
})

const showDropdown = ref<boolean>(false)

function onClick() {
  searchText.value = null
  filteredOptions.value = props.options
  showDropdown.value = true
}

function onFilteredItem(index: number) {
  if (filteredOptions.value) {
    emit('update:value', filteredOptions.value[index].value)
  }
  updateOptionIndex()
}

function onFocusOut() {
  setTimeout(() => {
    showDropdown.value = false
  }, 100)
}

function updateOptionIndex() {
  for (let i = 0; i < props.options.length; i++) {
    if (props.value == props.options[i].value) {
      optionIndex.value = i
    }
  }
}

function filterOptions() {
  filteredOptions.value = props.options.filter((item) => {
    if (!searchText.value) {
      return item
    } else if (
      searchText.value &&
      item.text.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1
    ) {
      return item
    }
  })
}

watch(
  () => props.options,
  () => {
    updateOptionIndex()
  },
)

watch(
  () => props.value,
  () => {
    updateOptionIndex()
  },
)

watch(searchText, () => {
  filterOptions()
})

watch(optionIndex, () => {
  let newValue = null
  if (optionIndex.value != null) {
    newValue = props.options[optionIndex.value].value
  }
  emit('update:value', newValue)
})

watch(inputSearch, () => {
  if (inputSearch.value) {
    inputSearch.value.focus()
  }
})

onMounted(updateOptionIndex)
</script>

<template>
  <div class="labeled-scope">
    <div class="labeled-container">
      <input
        v-if="!showDropdown"
        class="labeled-input"
        v-model="computedText"
        :readonly="!showDropdown"
        :disabled="props.disabled"
        @click="onClick()"
      />
      <input
        v-else
        ref="inputSearch"
        class="labeled-input labeled-input-search"
        v-model="searchText"
        placeholder="Search"
        @focusout="onFocusOut()"
      />
      <LabeledLabel
        :value="props.placeholder"
        :tooltip="props.tooltip"
        :required="props.required"
      />
      <Transition>
        <div v-if="showDropdown && !props.disabled" class="labeled-input-dropdown">
          <div
            class="labeled-input-dropdown-item"
            v-for="(option, index) in filteredOptions"
            :key="option.text"
            @click="onFilteredItem(index)"
          >
            {{ option.text }}
          </div>
          <div v-if="filteredOptions?.length == 0" class="labeled-input-dropdown-no-items">
            {{ languageStore.l.main.inputSearchNoItems }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/common/labeled.scss';

.labeled-input {
  cursor: pointer;
}

.labeled-input-search {
  cursor: text;
}

.labeled-input-dropdown {
  z-index: 9999;
  position: absolute;

  width: calc(100% - 18px);
  height: auto;
  max-height: 200px;

  overflow: auto;

  padding: 0;

  margin: 0;
  margin-left: 10px;
  margin-top: 5px;

  background-color: var(--input-background);

  border: 1px solid var(--main-color);
  border-radius: var(--main-border-radius);

  font-family: var(--main-font-text);
  font-size: var(--main-font-text-size);
}

.labeled-input-dropdown-item {
  padding: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: var(--main-color-text);
  background-color: var(--input-background);
}

.labeled-input-dropdown-item:hover {
  color: white;
  background-color: var(--main-color);
}

.labeled-input-dropdown-no-items {
  padding: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-style: italic;

  color: var(--main-color-text);
  background-color: var(--input-background);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  max-height: 0px;
  overflow: hidden;
}
</style>
