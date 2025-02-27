<script setup lang="ts">
import { ref, watch } from 'vue'

import { useLanguageStore } from '@/stores/language'

import SettingsUsersTable from '@/components/settings/SettingsUsersTable.vue'
import SettingsUsersCreate from '@/components/settings/SettingsUsersCreate.vue'
import SettingsUsersUpdate from '@/components/settings/SettingsUsersUpdate.vue'

const languageStore = useLanguageStore()

const selectedUserID = ref<number>(0)
const mode = ref<string>('create')

watch(selectedUserID, () => {
  if (selectedUserID.value == 0) {
    mode.value = 'create'
  } else {
    mode.value = 'update'
  }
})
</script>

<template>
  <div class="scope">
    <div class="content">
      <div id="grid">
        <div id="registered-h1">
          <h1>{{ languageStore.l.settings.users.banner }}</h1>
        </div>
        <div id="registered">
          <SettingsUsersTable v-model:selectedUserID="selectedUserID" />
        </div>

        <div id="user-h1" v-if="mode == 'create'">
          <h1>{{ languageStore.l.settings.users.create }}</h1>
        </div>
        <div id="user" v-if="mode == 'create'">
          <SettingsUsersCreate />
        </div>

        <div id="user-h1" v-if="mode == 'update'">
          <h1>{{ languageStore.l.settings.users.update }} #{{ selectedUserID }}</h1>
        </div>
        <div id="user" v-if="mode == 'update'">
          <SettingsUsersUpdate v-model:selectedUserID="selectedUserID" />
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
    'user-h1'
    'user';
}

#registered {
  grid-area: registered;
}

#registered-h1 {
  grid-area: registered-h1;
}

#user {
  grid-area: user;
}

#user-h1 {
  grid-area: user-h1;
  padding-top: 20px;
}
</style>
