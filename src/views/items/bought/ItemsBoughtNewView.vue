<script setup>
import { ref } from "vue"

import ControlsNew from "@/components/items/bought/ControlsNew.vue"
import CreateItemForm from "@/components/items/bought/CreateItemForm.vue"

// Form stuff
const formData = ref({
  high_priority: false,
  notify_on_delivery: false,
  project: null,
  machine: null,
  quantity: null,
  unit: null,
  partnumber: null,
  definition: null,
  supplier: null,
  manufacturer: null,
  note_general: null,
  note_supplier: null,
  desired_delivery_date: null
})
</script>

<template>
  <div class="scope">
    <div class="grid">
      <div id="controls" class="controls">
        <ControlsNew v-model:form-data="formData" />
      </div>
      <div id="data" class="data">
        <CreateItemForm v-model:form-data="formData" />
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

.grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 250px;
  right: 0;

  display: grid;

  grid-gap: 0;
  grid-template-columns: 100%;
  grid-template-rows: 150px auto;
  grid-template-areas: "controls"
    "data"
}

.grid .controls {
  padding: 10px;
}

.grid .data {
  overflow: auto;
  padding: 10px;
  border-radius: 5px;
}

// grid
#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>