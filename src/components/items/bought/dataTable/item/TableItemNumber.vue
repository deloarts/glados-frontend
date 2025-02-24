<script setup lang="ts">
import { computed } from 'vue'

import config from '@/config'
import TableItemRowNumber from '@/components/dataTable/TableItemRowNumber.vue'

import type { BoughtItemSchema } from '@/schemas/boughtItem'

import { boughtItemColumnWidths } from '@/presets/columnWidth'
import { useBoughtItemsControlsStore } from '@/stores/controls'

const controlsStore = useBoughtItemsControlsStore()

const props = defineProps<{
  index: number
  item: BoughtItemSchema
  width: typeof boughtItemColumnWidths
}>()
const emit = defineEmits<{
  (e: 'update:width', v: typeof boughtItemColumnWidths): void
}>()

const computedWidth = computed<typeof boughtItemColumnWidths>({
  get() {
    return props.width
  },
  set(newValue) {
    emit('update:width', newValue)
    return newValue
  },
})

const copyUrl = computed<string>(() => {
  return `${config.url.domain}/#/items/bought/view/${props.item.id}`
})
</script>

<template>
  <TableItemRowNumber
    :number="index + 1"
    :id="item.id"
    :copy-url="copyUrl"
    v-model:width="computedWidth.number"
    :fixed-height="controlsStore.state.fixedHeight"
  />
</template>

<style scoped lang="scss"></style>
