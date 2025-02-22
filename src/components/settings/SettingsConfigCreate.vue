<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import JsonEditor from 'vue3-ts-jsoneditor'

import { hostRequest } from '@/requests/host'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'
import { useBoughtItemFilterStore } from '@/stores/filter'

import type { AvailableOption } from '@/models/controls'
import type { HostConfigBoughtItemsFilterSchema } from '@/schemas/host'
import type { ErrorDetailSchema } from '@/schemas/common'

import ButtonSave from '@/components/elements/ButtonSave.vue'
import SelectPreText from '@/components/elements/SelectPreText.vue'

// Props & Emits
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  selectedConfigName: string
}>()
const emit = defineEmits<{
  (e: 'update:selectedConfigName', v: string): void
}>()

// Stores
const languageStore = useLanguageStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()
const boughtItemsFilterStore = useBoughtItemFilterStore()

const jsonEditDarkTheme = computed<boolean>(() => {
  return userStore.user.theme == 'dark' ? true : false
})

const availableOptionsCategory: Array<AvailableOption> = [
  { text: 'Bought Item Filter Preset', value: 'boughItemFilterPreset' },
]
const selectedOptionCategory = ref<string>('')
const newConfigName = ref<string>('')
const defaultJson = ref<HostConfigBoughtItemsFilterSchema>()

function createConfig() {
  if (selectedOptionCategory.value == '') {
    notificationStore.addInfo(languageStore.l.notification.info.selectCategoryFirst)
  } else if (newConfigName.value == '') {
    notificationStore.addInfo(languageStore.l.notification.info.chooseNameFirst)
  } else {
    let data = defaultJson.value
    if (typeof data == 'string') data = JSON.parse(data)

    if (selectedOptionCategory.value == 'boughItemFilterPreset') {
      hostRequest.postConfigItemsBoughtFilter(newConfigName.value, data).then((response) => {
        if (response.status === 200) {
          notificationStore.addInfo(languageStore.l.notification.info.createNewConfig)
          boughtItemsFilterStore.get()
          emit('update:selectedConfigName', newConfigName.value)
        } else {
          const data = response.data as ErrorDetailSchema
          notificationStore.addWarn(data.detail)
        }
      })
    } else {
      notificationStore.addWarn('Category not available')
    }
  }
}

watch(selectedOptionCategory, () => {
  if (selectedOptionCategory.value == 'boughItemFilterPreset') {
    hostRequest.getConfigItemsBoughtFiltersDefault().then((response) => {
      if (response.status === 200) {
        defaultJson.value = response.data
      } else {
        notificationStore.addWarn('Failed to load default data')
      }
    })
  }
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container controls">
      <div id="grid" class="grid-command">
        <div id="select-category">
          <SelectPreText
            class="controls-base-element"
            text="Category"
            v-model:selection="selectedOptionCategory"
            :options="availableOptionsCategory"
          />
        </div>
        <div id="config-name" class="grid-item-center">
          <input class="form-base-text-input" v-model="newConfigName" placeholder="Config Name" />
        </div>
        <div id="btn-save">
          <ButtonSave
            v-on:click="createConfig"
            :text="languageStore.l.settings.config.button.save"
          />
        </div>
      </div>
    </div>

    <div class="form-base-container editor">
      <JsonEditor
        v-if="selectedOptionCategory != ''"
        v-model="defaultJson"
        mode="text"
        :mainMenuBar="false"
        :darkTheme="jsonEditDarkTheme"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

.controls {
  margin-bottom: 15px;
}

.editor {
  height: calc(100vh - 400px);
  margin-bottom: -4px;
}

@media screen and (max-width: 1000px) {
  .editor {
    height: auto;
  }
}

.grid-command {
  grid-template-rows: 32px;
  grid-template-columns: min-content 130px min-content;
  grid-template-areas: 'select-category config-name btn-save';
}

#select-category {
  grid-area: select-category;
}

#btn-save {
  grid-area: btn-save;
}

#config-name {
  grid-area: config-name;
}
</style>
