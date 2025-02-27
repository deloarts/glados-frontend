<script setup lang="ts">
import { ref } from 'vue'

import { stockCut2DRequest } from '@/requests/api/tools'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import type { StockCut2DJobSchema, StockCut2DResultSchema } from '@/schemas/stockCut2D'

import SolverInput from '@/components/tools/stockCut2D/SolverInput.vue'
import SolverOutput from '@/components/tools/stockCut2D/SolverOutput.vue'

// Stores
const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const solverInput = ref<StockCut2DJobSchema>({
  params: {
    items: [
      {
        id: 'Item 1',
        width: 100,
        height: 100,
        can_rotate: true,
      },
    ],
    panels: [
      {
        id: 'Panel 1',
        width: 1000,
        height: 500,
      },
    ],
    cut_width: 5,
    min_initial_usage: true,
  },
  method: 'greedy',
})

const solverOutput = ref<StockCut2DResultSchema>()

const solving = ref<boolean>(false)
const solved = ref<boolean>(false)

function onSolve() {
  solving.value = true
  solved.value = false

  stockCut2DRequest.postSolver(solverInput.value).then((response) => {
    if (response.status == 200) {
      setTimeout(() => {
        solved.value = true
      }, 250)
      solverOutput.value = response.data
      solverInput.value.params = response.data.params
      notificationStore.addInfo(`Solved`)
    } else if (response.status == 406) {
      notificationStore.addWarn(response.data.detail)
    } else if (response.status == 422) {
      notificationStore.addWarn('Input is incomplete')
    } else if (response.status == 507) {
      notificationStore.addWarn(response.data.detail)
    } else {
      notificationStore.addWarn('Something went really wrong')
    }
    setTimeout(() => {
      solving.value = false
    }, 250)
  })
}

function onAddItem() {
  solverInput.value.params.items.push({
    id: `${languageStore.l.tools.labels.item} ${solverInput.value.params.items.length + 1}`,
    width: 100,
    height: 100,
    can_rotate: true,
  })
}

function onAddPanel() {
  solverInput.value.params.panels.push({
    id: `${languageStore.l.tools.labels.panel} ${solverInput.value.params.panels.length + 1}`,
    width: 1000,
    height: 500,
  })
}

function onExportPDF() {
  if (!solved.value) {
    notificationStore.addInfo('Problem must first be solved')
  } else {
    stockCut2DRequest.postGenerate(solverOutput.value, 'pdf').then((response) => {
      if (response.status == 200) {
        const blob = new Blob([response.data], {
            type: 'application/pdf',
          }),
          url = window.URL.createObjectURL(blob)
        window.open(url)
      } else if (response.status == 422) {
        notificationStore.addWarn('Input is incomplete')
      } else if (response.status == 501) {
        notificationStore.addWarn('Output format not supported')
      } else if (response.status == 507) {
        notificationStore.addWarn(response.data.detail)
      }
    })
  }
}
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.tools.banner.stockCut2D }}</h1>
      <SolverInput
        :solver-input="solverInput"
        :solving="solving"
        :solved="solved"
        :on-solve="onSolve"
        :on-add-item="onAddItem"
        :on-add-panel="onAddPanel"
        :on-export-pdf="onExportPDF"
      />
      <Transition>
        <SolverOutput v-if="solved" :solver-output="solverOutput" />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  width: 100%;
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
