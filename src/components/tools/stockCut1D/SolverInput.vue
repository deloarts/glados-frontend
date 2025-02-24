<!-- eslint-disable @typescript-eslint/no-unsafe-function-type -->

<script setup lang="ts">
import { computed } from 'vue'

import type { StockCut1DJobSchema } from '@/schemas/stockCut1d'

import ButtonPlus from '@/components/elements/ButtonPlus.vue'
import ButtonSolve from '@/components/elements/ButtonSolve.vue'
import ButtonLoading from '@/components/elements/ButtonLoading.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

import { useLanguageStore } from '@/stores/language'

const props = defineProps<{
  solverInput: StockCut1DJobSchema
  solving: boolean
  onSolve: Function
  onAdd: Function
}>()

const languageStore = useLanguageStore()

const solverInput = computed<StockCut1DJobSchema>(() => props.solverInput)

function removeRow(index: number) {
  const target_sizes = []
  for (let i = 0; i < solverInput.value.target_sizes.length; i++) {
    if (i != index) {
      target_sizes.push(solverInput.value.target_sizes[i])
    }
  }
  solverInput.value.target_sizes = target_sizes
}
function removeAll() {
  solverInput.value.target_sizes = [{ length: 0, quantity: 0 }]
}
</script>

<template>
  <div class="controls-base-scope">
    <div class="controls-base-container">
      <div id="btn-add">
        <ButtonPlus
          v-on:click="props.onAdd()"
          class="controls-base-element"
          :text="languageStore.l.tools.buttons.add"
        />
      </div>
      <div id="btn-solve">
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
      </div>
    </div>

    <div class="form-base-container">
      <div class="form-base-title">
        {{ languageStore.l.tools.banner.stock }}
      </div>
      <div id="grid" class="grid-input">
        <div id="stock-length-text" class="grid-item-left">
          {{ languageStore.l.tools.labels.stockLength }}
        </div>
        <div id="stock-length" class="grid-item-center">
          <input class="form-base-text-input" type="number" v-model="solverInput.max_length" />
        </div>

        <div id="cut-width-text" class="grid-item-left">
          {{ languageStore.l.tools.labels.cutWidth }}
        </div>
        <div id="cut-width" class="grid-item-center">
          <input class="form-base-text-input" type="number" v-model="solverInput.cut_width" />
        </div>
      </div>
    </div>

    <div class="table-base-container">
      <div class="table-base-title">
        {{ languageStore.l.tools.banner.items }}
      </div>
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="cut-length">
              {{ languageStore.l.tools.table.cutLength }}
            </th>
            <th class="first sticky-col" id="quantity">
              {{ languageStore.l.tools.table.quantity }}
            </th>
            <th class="first sticky-col" id="clear">
              <IconDelete v-on:click="removeAll()" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in solverInput.target_sizes" :key="index">
            <td id="cut-length" class="sticky-col">
              <input v-model="item.length" />
            </td>
            <td id="quantity" class="sticky-col">
              <input v-model="item.quantity" />
            </td>
            <td id="clear" class="sticky-col">
              <IconDelete v-on:click="removeRow(index)" />
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
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.table-base-container {
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.grid-input {
  grid-template-rows: 40px 40px;
  grid-template-columns: 130px auto;
  grid-template-areas:
    'stock-length-text stock-length'
    'cut-width-text cut-width';
}

.grid-command {
  grid-template-rows: 32px;
  grid-template-columns: min-content min-content;
  grid-template-areas: 'btn-add btn-solve';
}

#btn-solve {
  grid-area: btn-solve;
}

#btn-add {
  grid-area: btn-add;
}

#stock-length-text {
  padding-left: 10px;
  grid-area: stock-length-text;
}

#stock-length {
  grid-area: stock-length;
}

#cut-width-text {
  padding-left: 10px;
  grid-area: cut-width-text;
}

#cut-width {
  grid-area: cut-width;
}

#clear {
  width: 35px;
  min-width: 35px;
  max-width: 35px;

  text-align: center;
}
</style>
