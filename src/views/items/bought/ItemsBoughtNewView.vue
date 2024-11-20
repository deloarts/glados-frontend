<script setup lang="ts">
import { ref } from "vue";

import type { BoughtItemCreateSchema } from "@/schemas/boughtItem";

import ControlsNew from "@/components/items/bought/ControlsNew.vue";
import CreateItemForm from "@/components/items/bought/CreateItemForm.vue";

// Form stuff
const formData = ref<BoughtItemCreateSchema>({
  high_priority: false,
  notify_on_delivery: false,
  project_id: null,
  quantity: null,
  unit: null,
  partnumber: null,
  order_number: null,
  supplier: null,
  manufacturer: null,
  group_1: null,
  weblink: null,
  note_general: null,
  note_supplier: null,
  desired_delivery_date: null,
});
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <ControlsNew v-model:form-data="formData" />
        </div>
        <div id="data">
          <CreateItemForm v-model:form-data="formData" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    "controls"
    "data";
}

#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>
