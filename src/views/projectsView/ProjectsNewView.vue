<script setup lang="ts">
import { ref } from 'vue'

import type { ProjectCreateSchema } from '@/schemas/project'

import { useUserStore } from '@/stores/user'

import ControlsNew from '@/components/projects/ControlsNew.vue'
import CreateForm from '@/components/projects/CreateForm.vue'

// Stores
const userStore = useUserStore()

// Form stuff
const formData = ref<ProjectCreateSchema>({
  number: '',
  product_number: '',
  customer: '',
  description: '',
  designated_user_id: userStore.user.id,
  is_active: true,
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
