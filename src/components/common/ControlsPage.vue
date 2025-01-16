<script setup lang="ts">
import { ref, computed } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { useResolutionStore } from '@/stores/resolution'

import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'
import type { FilterStoreProtocol } from '@/protocols/filterStoreProtocol'

import ButtonArrowLeft from '@/components/elements/ButtonArrowLeft.vue'
import ButtonArrowDoubleLeft from '@/components/elements/ButtonArrowDoubleLeft.vue'
import ButtonArrowRight from '@/components/elements/ButtonArrowRight.vue'
import ButtonArrowDoubleRight from '@/components/elements/ButtonArrowDoubleRight.vue'
import ButtonPage from '@/components/elements/ButtonPage.vue'
import ButtonItem from '@/components/elements/ButtonItem.vue'

interface Props {
  itemStore: ItemStoreProtocol
  filterStore: FilterStoreProtocol
}

const props = withDefaults(defineProps<Props>(), {})

// Stores
const languageStore = useLanguageStore()
const resolutionStore = useResolutionStore()

const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

// Buttons
const showPageButton = ref<boolean>(true)

const buttonFirstPage = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.main.pagination.first : ''
})
const buttonLastPage = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.main.pagination.last : ''
})
const buttonPreviousPage = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.main.pagination.previous : ''
})
const buttonNextPage = computed<string>(() => {
  return gtMinWidthTablet.value ? languageStore.l.main.pagination.next : ''
})
const buttonPage = computed<string>(() => {
  return `${props.itemStore.page.current} | ${props.itemStore.page.pages}`
})
const buttonItem = computed<string>(() => {
  return `${props.itemStore.items.length} | ${props.itemStore.page.total}`
})

function onFirstPage() {
  props.filterStore.set('skip', 0)
  props.itemStore.getItems()
}

function onLastPage() {
  let newSkip =
    Math.floor(props.itemStore.page.total / props.itemStore.page.limit) * props.itemStore.page.limit

  if (newSkip == props.itemStore.page.total) {
    newSkip -= props.itemStore.page.limit
  }
  props.filterStore.set('skip', newSkip)
  props.itemStore.getItems()
}

function onNextPage() {
  let currentLimit = props.filterStore.state.limit
  let currentSkip = props.filterStore.state.skip

  if (currentLimit == null) {
    currentLimit = 25
  }
  if (currentSkip == null) {
    currentSkip = 0
  }

  let newSkip = +currentSkip + +currentLimit
  if (newSkip >= props.itemStore.page.total) {
    newSkip = currentSkip
  }
  props.filterStore.set('skip', newSkip)
  props.itemStore.getItems()
}

function onPreviousPage() {
  let currentLimit = props.filterStore.state.limit
  let currentSkip = props.filterStore.state.skip

  if (currentLimit == null) {
    currentLimit = 25
  }
  if (currentSkip == null) {
    currentSkip = 0
  }

  let newSkip = +currentSkip - +currentLimit
  if (newSkip < 0) {
    newSkip = 0
  }
  props.filterStore.set('skip', newSkip)
  props.itemStore.getItems()
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="filter-controls" class="controls-base-container">
      <ButtonArrowDoubleLeft
        class="controls-base-element"
        :text="buttonFirstPage"
        v-on:click="onFirstPage()"
      />
      <ButtonArrowLeft
        class="controls-base-element"
        :text="buttonPreviousPage"
        v-on:click="onPreviousPage()"
      />
      <ButtonPage
        v-if="showPageButton"
        class="controls-base-element"
        :text="buttonPage"
        v-on:click="showPageButton = false"
      />
      <ButtonItem
        v-else
        class="controls-base-element"
        :text="buttonItem"
        v-on:click="showPageButton = true"
      />
      <ButtonArrowRight
        class="controls-base-element"
        v-model:text="buttonNextPage"
        v-on:click="onNextPage()"
      />
      <ButtonArrowDoubleRight
        class="controls-base-element"
        :text="buttonLastPage"
        v-on:click="onLastPage()"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/controls/controlsBase.scss';
</style>
