<script setup lang="ts">
import { ref } from 'vue'

import type { UserTimeCreateSchema } from '@/schemas/userTime'

import ControlsNew from '@/components/userTime/ControlsNew.vue'
import CreateForm from '@/components/userTime/CreateForm.vue'
import moment from 'moment'

// Form stuff
const formData = ref<UserTimeCreateSchema>({
  login: moment().toDate(),
  logout: moment().toDate(),
  note: ''
})
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
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    'controls'
    'data';
}

#controls {
  grid-area: controls;
}

#data {
  grid-area: data;
}
</style>
