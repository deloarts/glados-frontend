<script setup lang="ts">
import { ref, watch } from 'vue'

import { useLanguageStore } from '@/stores/language'

import SettingsKeyTable from '@/components/settings/SettingsKeyTable.vue'
import SettingsKeyCreate from '@/components/settings/SettingsKeyCreate.vue'
import SettingsKeyShow from './SettingsKeyShow.vue'

const languageStore = useLanguageStore()
const selectedKeyID = ref<number>(0)
const mode = ref<string>('create')

watch(selectedKeyID, () => {
  if (selectedKeyID.value == 0) {
    mode.value = 'create'
  } else {
    mode.value = 'view'
  }
})
</script>

<template>
  <div class="scope">
    <div class="content">
      <div id="grid">
        <div id="registered-h1">
          <h1>{{ languageStore.l.settings.apiKeys.banner }}</h1>
        </div>
        <div id="registered">
          <SettingsKeyTable v-model:selectedKeyID="selectedKeyID" />
        </div>

        <div id="key-h1" v-if="mode == 'create'">
          <h1>{{ languageStore.l.settings.apiKeys.create }}</h1>
        </div>
        <div id="key" v-if="mode == 'create'">
          <SettingsKeyCreate />
        </div>

        <div id="key-h1" v-if="mode == 'view'">
          <h1>{{ languageStore.l.settings.apiKeys.show }}</h1>
        </div>
        <div id="key" v-if="mode == 'view'">
          <SettingsKeyShow v-model:selectedKeyID="selectedKeyID" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/grid/gridBase.scss';

.scope {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
}

#grid {
  grid-template-columns: 100%;
  grid-template-rows: min-content 400px min-content min-content;
  grid-template-areas:
    'registered-h1'
    'registered'
    'key-h1'
    'key';
}

#registered {
  grid-area: registered;
}

#registered-h1 {
  grid-area: registered-h1;
}

#key {
  grid-area: key;
}

#key-h1 {
  grid-area: key-h1;
}
</style>
