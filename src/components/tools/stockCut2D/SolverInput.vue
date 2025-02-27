<!-- eslint-disable @typescript-eslint/no-unsafe-function-type -->

<script setup lang="ts">
import { computed } from 'vue'

import type { StockCut2DJobSchema } from '@/schemas/stockCut2D'

import ButtonPlus from '@/components/elements/ButtonPlus.vue'
import ButtonSolve from '@/components/elements/ButtonSolve.vue'
import ButtonLoading from '@/components/elements/ButtonLoading.vue'
import ButtonDownload from '@/components/elements/ButtonDownload.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import SelectBase from '@/components/elements/SelectBase.vue'
import Toggle from '@vueform/toggle'

import { useLanguageStore } from '@/stores/language'

const props = defineProps<{
  solverInput: StockCut2DJobSchema
  solving: boolean
  solved: boolean
  onSolve: Function
  onAddItem: Function
  onAddPanel: Function
  onExportPdf: Function
}>()

const languageStore = useLanguageStore()

const solverInput = computed<StockCut2DJobSchema>(() => props.solverInput)
const solverMethods = ['greedy', 'forward_greedy']

function removePanelRow(index: number) {
  const panels = []
  for (let i = 0; i < solverInput.value.params.panels.length; i++) {
    if (i != index) {
      panels.push(solverInput.value.params.panels[i])
    }
  }
  solverInput.value.params.panels = panels
}
function removeAllPanels() {
  solverInput.value.params.panels = [
    { id: `${languageStore.l.tools.labels.panel} 1`, width: 100, height: 100 },
  ]
}
function removeItemRow(index: number) {
  const items = []
  for (let i = 0; i < solverInput.value.params.items.length; i++) {
    if (i != index) {
      items.push(solverInput.value.params.items[i])
    }
  }
  solverInput.value.params.items = items
}
function removeAllItems() {
  solverInput.value.params.items = [
    {
      id: `${languageStore.l.tools.labels.item} 1`,
      width: 100,
      height: 100,
      can_rotate: true,
    },
  ]
}
</script>

<template>
  <div class="form-base-scope">
    <div class="controls-base-container">
      <ButtonPlus
        v-on:click="props.onAddPanel()"
        class="controls-base-element"
        :text="languageStore.l.tools.buttons.addPanel"
      />
      <ButtonPlus
        v-on:click="props.onAddItem()"
        class="controls-base-element"
        :text="languageStore.l.tools.buttons.addItem"
      />
      <ButtonLoading
        v-if="props.solving"
        class="controls-base-element"
        :text="languageStore.l.tools.buttons.solving"
      />
      <ButtonSolve
        v-else
        v-on:click="props.onSolve()"
        class="controls-base-element"
        :text="languageStore.l.tools.buttons.solve"
      />
      <ButtonDownload
        v-on:click="props.onExportPdf()"
        class="controls-base-element"
        :text="languageStore.l.tools.buttons.exportPDF"
      />
    </div>

    <div class="form-base-container">
      <div class="form-base-title">
        {{ languageStore.l.tools.banner.definitions }}
      </div>
      <div id="grid" class="grid-input">
        <div id="method-text" class="grid-item-left">
          {{ languageStore.l.tools.labels.solverMethod }}
        </div>
        <div id="method" class="grid-item-left">
          <SelectBase v-model:selection="solverInput.method" :options="solverMethods" />
        </div>

        <div id="cut-width-text" class="grid-item-left">
          {{ languageStore.l.tools.labels.cutWidth }}
        </div>
        <div id="cut-width" class="grid-item-center">
          <input
            class="form-base-text-input"
            type="number"
            v-model="solverInput.params.cut_width"
          />
        </div>

        <div id="min-usage-text" class="grid-item-left">
          {{ languageStore.l.tools.labels.minimum }}
        </div>
        <div id="min-usage" class="grid-item-left">
          <Toggle v-model="solverInput.params.min_initial_usage"></Toggle>
        </div>
      </div>
    </div>

    <div class="table-base-container">
      <div class="table-base-title">
        {{ languageStore.l.tools.banner.panels }}
      </div>
      <table class="cursor-default">
        <thead>
          <tr>
            <th id="panel-id">
              {{ languageStore.l.tools.table.panelID }}
            </th>
            <th id="panel-width">
              {{ languageStore.l.tools.table.panelWidth }}
            </th>
            <th id="panel-height">
              {{ languageStore.l.tools.table.panelHeight }}
            </th>
            <th id="clear">
              <IconDelete v-on:click="removeAllPanels()" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(panel, index) in solverInput.params.panels" :key="index">
            <td id="panel-id">
              <input v-model="panel.id" />
            </td>
            <td id="panel-width">
              <input v-model="panel.width" />
            </td>
            <td id="panel-height">
              <input v-model="panel.height" />
            </td>
            <td id="clear">
              <IconDelete v-on:click="removePanelRow(index)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-base-container">
      <div class="table-base-title">
        {{ languageStore.l.tools.banner.items }}
      </div>
      <table class="cursor-default">
        <thead>
          <tr>
            <th id="item-id">
              {{ languageStore.l.tools.table.itemID }}
            </th>
            <th id="item-width">
              {{ languageStore.l.tools.table.itemWidth }}
            </th>
            <th id="item-height">
              {{ languageStore.l.tools.table.itemHeight }}
            </th>
            <th id="item-rotate">
              {{ languageStore.l.tools.table.rotate }}
            </th>
            <th id="clear">
              <IconDelete v-on:click="removeAllItems()" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in solverInput.params.items" :key="index">
            <td id="item-id">
              <input v-model="item.id" />
            </td>
            <td id="item-width">
              <input v-model="item.width" />
            </td>
            <td id="item-height">
              <input v-model="item.height" />
            </td>
            <td id="item-rotate">
              <Toggle v-model="item.can_rotate"></Toggle>
            </td>
            <td id="clear">
              <IconDelete v-on:click="removeItemRow(index)" />
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
@use '@/scss/grid/gridBase.scss';
@use '@/scss/controls/controlsBase.scss';

table {
  max-width: 600px;
  border-spacing: 4px 6px;
}

td,
th,
tr {
  text-align: left;
  border-radius: var(--main-border-radius);
  height: 20px;
}

// th {
//   margin: 0;
//   padding: 0;
//   padding-left: 10px;
// }

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

svg {
  height: 18px;
  width: 18px;
  cursor: pointer;
}

.form-base-container {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.table-base-container {
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.grid-command {
  grid-template-rows: 32px;
  grid-template-columns: min-content min-content min-content min-content;
  grid-template-areas: 'btn-add-panel btn-add-item btn-solve btn-export-pdf';
}

.grid-input {
  grid-template-rows: 40px 40px 40px;
  grid-template-columns: 130px auto;
  grid-template-areas:
    'method-text method'
    'cut-width-text cut-width'
    'min-usage-text min-usage';
}

#btn-solve {
  grid-area: btn-solve;
}

#btn-export-pdf {
  grid-area: btn-export-pdf;
}

#btn-add-panel {
  grid-area: btn-add-panel;
}

#btn-add-item {
  grid-area: btn-add-item;
}

#clear {
  width: 35px;
  min-width: 35px;
  max-width: 35px;

  text-align: center;
}

#method {
  grid-area: method;
}

#method-text {
  padding-left: 10px;
  grid-area: method-text;
}

#cut-width {
  grid-area: cut-width;
  width: 150px;
}

#cut-width-text {
  padding-left: 10px;
  grid-area: cut-width-text;
}

#min-usage {
  grid-area: min-usage;
}

#min-usage-text {
  padding-left: 10px;
  grid-area: min-usage-text;
}
</style>
