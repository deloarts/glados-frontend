<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { useBoughtItemFilterStore } from '@/stores/filter'
import { useBoughtItemsStore } from '@/stores/boughtItems'
import { useResolutionStore } from '@/stores/resolution'

import ButtonArrowLeft from '@/components/elements/ButtonArrowLeft.vue'
import ButtonArrowDoubleLeft from '@/components/elements/ButtonArrowDoubleLeft.vue'
import ButtonArrowRight from '@/components/elements/ButtonArrowRight.vue'
import ButtonArrowDoubleRight from '@/components/elements/ButtonArrowDoubleRight.vue'
import ButtonPage from '@/components/elements/ButtonPage.vue'
import ButtonItem from '@/components/elements/ButtonItem.vue'

// Stores
const languageStore = useLanguageStore()
const boughtItemsStore = useBoughtItemsStore()
const filterStore = useBoughtItemFilterStore()
const resolutionStore = useResolutionStore()

const gtMinWidthTablet = computed<boolean>(() => resolutionStore.gtMinWidthTablet)

// Buttons
const showPageButton = ref<boolean>(true)

const buttonFirstPage = computed<string>(() => {
  return gtMinWidthTablet.value ? 'First' : ''
})
const buttonLastPage = computed<string>(() => {
  return gtMinWidthTablet.value ? 'Last' : ''
})
const buttonPreviousPage = computed<string>(() => {
  return gtMinWidthTablet.value ? 'Previous' : ''
})
const buttonNextPage = computed<string>(() => {
  return gtMinWidthTablet.value ? 'Next' : ''
})
const buttonPage = computed<string>(() => {
  return `${boughtItemsStore.page.current + 1} | ${boughtItemsStore.page.pages}`
})
const buttonItem = computed<string>(() => {
  return `${boughtItemsStore.items.length} | ${boughtItemsStore.page.total}`
})

function onFirstPage() {
  filterStore.state.skip = 0
  boughtItemsStore.getItems()
}

function onLastPage() {
  filterStore.state.skip = Math.floor(boughtItemsStore.page.total / boughtItemsStore.page.limit) * boughtItemsStore.page.limit
  boughtItemsStore.getItems()
}

function onNextPage() {
  // FIXME: Bug on multi page skip
  let currentLimit = filterStore.state.limit
  let currentSkip = filterStore.state.skip

  if (currentLimit == null) {
    currentLimit = 25
  }
  if (currentSkip == null) {
    currentSkip = 0
  }

  let newSkip = currentSkip + currentLimit
  if (newSkip > boughtItemsStore.page.total) {
    newSkip = currentSkip
  }
  filterStore.state.skip = newSkip
  boughtItemsStore.getItems()
}

function onPreviousPage() {
  let currentLimit = filterStore.state.limit
  let currentSkip = filterStore.state.skip

  if (currentLimit == null) {
    currentLimit = 25
  }
  if (currentSkip == null) {
    currentSkip = 0
  }

  let newSkip = currentSkip - currentLimit
  if (newSkip < 0) {
    newSkip = 0
  }
  filterStore.state.skip = newSkip
  boughtItemsStore.getItems()
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
