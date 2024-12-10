<script setup lang="ts">
import { onMounted, watch } from 'vue'

import type { StockCut2DResultSchema } from '@/schemas/stockCut2D'

import { useLanguageStore } from '@/stores/language'

// Props & Emits
const props = defineProps<{
  solverOutput: StockCut2DResultSchema
}>()

const languageStore = useLanguageStore()

onMounted(() => {})
watch(
  () => props.solverOutput,
  () => {},
)
</script>

<template>
  <div class="form-base-scope">
    <div class="table-base-container">
      <div class="table-base-title">
        {{ languageStore.l.tools.banner.solution }}
      </div>
      <table class="cursor-default">
        <thead>
          <tr>
            <th id="panel-id" class="first sticky-col">
              {{ languageStore.l.tools.table.panelID }}
            </th>
            <th id="item-id" class="first sticky-col">
              {{ languageStore.l.tools.table.itemID }}
            </th>
            <th id="start-x" class="first sticky-col">X</th>
            <th id="start-y" class="first sticky-col">Y</th>
            <th id="rotated" class="first sticky-col">
              {{ languageStore.l.tools.table.rotated }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(used, index) in solverOutput.used" :key="index">
            <td id="panel-id" class="sticky-col">
              {{ used.panel.id }}
            </td>
            <td id="item-id" class="sticky-col">
              {{ used.item.id }}
            </td>
            <td id="start-x" class="sticky-col">
              {{ used.x }}
            </td>
            <td id="start-y" class="sticky-col">
              {{ used.y }}
            </td>
            <td id="rotated" class="sticky-col">
              {{ used.rotate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/table/tableBase.scss';
@use '@/scss/form/formBase.scss';

table {
  max-width: 600px;
  border-spacing: 4px 6px;
  table-layout: fixed;
}

td,
th {
  text-align: left;
  border-radius: var(--main-border-radius);
}

input {
  width: 100%;

  box-shadow: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  color: var(--main-text-color);
  background-color: transparent;

  outline: none;
  border: none;
  border-color: inherit;
}

.table-base-container {
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
