<script setup lang="ts">
import { ref } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'
import { useApiKeysStore } from '@/stores/apiKeys'
import { apiKeysRequest } from '@/requests/apiKeys'

import ButtonDelete from '@/components/elements/ButtonDelete.vue'
import Prompt from '@/components/main/UserPrompt.vue'

const props = defineProps<{
  selectedKeyID: number
}>()
const emit = defineEmits<{
  (e: 'update:selectedKeyID', v: number): void
}>()

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()
const apiKeyStore = useApiKeysStore()

const showDeletePrompt = ref<boolean>(false)

function deleteKey() {
  apiKeysRequest.deleteApiKeys(props.selectedKeyID).then((response) => {
    apiKeyStore.get()
    emit('update:selectedKeyID', 0)
    if (response.status == 200) {
      notificationStore.addInfo(languageStore.l.notification.info.deletedApiKey)
    } else {
      notificationStore.addWarn(response.data.detail)
    }
  })
}
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="name" class="grid-item-center">
          <input
            class="form-base-text-input"
            :value="apiKeyStore.getByID(props.selectedKeyID)?.name"
            type="text"
            disabled
          />
        </div>
        <div id="api-key" class="grid-item-center">
          <input
            class="form-base-text-input"
            :value="apiKeyStore.getByID(props.selectedKeyID)?.api_key"
            type="text"
            disabled
          />
        </div>
        <div id="btn">
          <ButtonDelete
            v-on:click="showDeletePrompt = true"
            :text="languageStore.l.settings.apiKeys.button.delete"
          />
        </div>
      </div>
    </div>
  </div>

  <Prompt
    text="Delete API key?"
    yes-is-danger
    v-model:show="showDeletePrompt"
    v-bind:on-yes="deleteKey"
    v-bind:on-no="
      () => {
        showDeletePrompt = false
      }
    "
  />
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 40px 40px 40px;
  grid-template-columns: 50px auto;
  grid-template-areas:
    'name name'
    'api-key api-key'
    'btn btn';
}

#btn {
  grid-area: btn;
}

#name {
  grid-area: name;
}

#api-key {
  grid-area: api-key;
}
</style>
