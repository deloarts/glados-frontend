<script setup lang="ts">
import router from '@/router/index'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'

import type { BoughtItemSchema } from '@/schemas/boughtItem'

import ButtonCopy from '@/components/elements/ButtonCopy.vue'
import ButtonEdit from '@/components/elements/ButtonEdit.vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'

const props = defineProps<{
  itemData: BoughtItemSchema
}>()

// Stores
const languageStore = useLanguageStore()
const userStore = useUserStore()

function onButtonCopy() {
  router.push(`/items/bought/copy/${props.itemData.id}`)
}

function onButtonEdit() {
  router.push(`/items/bought/edit/${props.itemData.id}`)
}

function onButtonClose() {
  router.push({ name: 'BoughtItems' })
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonEdit
        v-if="!userStore.user.is_guestuser"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.editItem"
        v-on:click="onButtonEdit"
      />
      <ButtonCopy
        v-if="!userStore.user.is_guestuser"
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.copyItem"
        v-on:click="onButtonCopy"
      />
      <ButtonAbort
        class="controls-base-element"
        :text="languageStore.l.main.buttonClose"
        v-on:click="onButtonClose"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
