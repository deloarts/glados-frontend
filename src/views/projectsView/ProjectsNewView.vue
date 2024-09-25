<script setup lang="ts">
import { ref } from "vue";

import type { ProjectCreateSchema } from "@/schemas/project";

import ControlsNew from "@/components/projects/ControlsNew.vue";
import CreateForm from "@/components/projects/CreateForm.vue";

const formData = ref<ProjectCreateSchema>({
  number: null,
  product_number: null,
  customer: null,
  description: null,
  designated_user_id: null,
  is_active: true,
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
          <CreateForm v-model:form-data="formData" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
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
