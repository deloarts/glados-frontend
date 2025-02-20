<script setup lang="ts">
import { onMounted } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { useApiKeysStore } from '@/stores/apiKeys'
import moment from 'moment'

// Props & Emits
const props = defineProps<{
  selectedKeyID: number
}>()
const emit = defineEmits<{
  (e: 'update:selectedKeyID', v: number): void
}>()

// Store
const languageStore = useLanguageStore()
const apiKeysStore = useApiKeysStore()

function onSelect(id: number) {
  if (props.selectedKeyID == id) {
    id = 0
  }
  emit('update:selectedKeyID', id)
}

function shortKey(value: string) {
  return `${value.slice(0, 10)} ... ${value.slice(-10)}`
}

onMounted(() => {
  apiKeysStore.get()
})
</script>

<template>
  <div class="table-base-scope">
    <div class="table-base-container">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="key-id">
              {{ languageStore.l.settings.apiKeys.table.id }}
            </th>
            <th class="first sticky-col" id="name">
              {{ languageStore.l.settings.apiKeys.table.name }}
            </th>
            <th class="first sticky-col" id="api-key">
              {{ languageStore.l.settings.apiKeys.table.apiKey }}
            </th>
            <th class="first sticky-col" id="created">
              {{ languageStore.l.settings.apiKeys.table.created }}
            </th>
            <th class="first sticky-col" id="expires">
              {{ languageStore.l.settings.apiKeys.table.expirationDate }}
            </th>
            <th class="first sticky-col" id="state">
              {{ languageStore.l.settings.apiKeys.table.state }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in apiKeysStore.apiKeys"
            :key="item.id"
            v-on:click="onSelect(item.id)"
            v-bind:class="{ selected: props.selectedKeyID == item.id }"
          >
            <td id="key-id" class="sticky-col">{{ item.id }}</td>
            <td id="name" class="sticky-col">{{ item.name }}</td>
            <td id="api-key" class="sticky-col">{{ shortKey(item.api_key) }}</td>
            <td id="created" class="sticky-col">{{ item.created }}</td>
            <td id="expires" class="sticky-col">{{ item.expiration_date }}</td>
            <td id="state" class="sticky-col active" v-bind:class="{ expired: item.expired }">
              {{ item.expired ? 'Expired' : 'Active' }}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/table/tableBase.scss';

#key-id {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
  text-align: center;
}

#name {
  width: 200px;
  min-width: 200px;
}

#api-key {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
}

#created {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  text-align: center;
}

#expires {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  text-align: center;
}

#state {
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

svg {
  width: 15px;
  height: 15px;
}

.active {
  color: var(--main-green);
}

.expired {
  color: var(--main-red);
}
</style>
