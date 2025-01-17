<script setup lang="ts">
import { watch, computed, onBeforeMount } from 'vue'
import Toggle from '@vueform/toggle'

import { useLanguageStore } from '@/stores/language'
import { useUsersStore, useUserStore } from '@/stores/user'

import type { AvailableOption } from '@/models/controls'
import type { ProjectUpdateSchema } from '@/schemas/project'

import InputPlaceholder from '@/components/elements/InputPlaceholder.vue'
import SelectPlaceholder from '@/components/elements/SelectPlaceholder.vue'

// Props & Emits
const props = defineProps<{
  formData: ProjectUpdateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: ProjectUpdateSchema): void
}>()

// Computed
const updateFormData = computed<ProjectUpdateSchema>(() => props.formData)

// Stores
const languageStore = useLanguageStore()
const userStore = useUserStore()
const usersStore = useUsersStore()

// Options
let availableOptionsUsers: Array<AvailableOption> = []

function setOptionsUsers() {
  const temp = []
  for (let i = 0; i < usersStore.users.length; i++) {
    if (usersStore.users[i].is_active) {
      temp.push({
        text: `${usersStore.users[i].full_name} (${usersStore.users[i].email})`,
        value: usersStore.users[i].id.toString(),
      })
    }
  }
  availableOptionsUsers = temp
}

watch(
  () => updateFormData,
  () => {
    emit('update:formData', updateFormData.value)
  },
  { deep: true },
)

onBeforeMount(() => {
  setOptionsUsers()
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="project" class="grid-item-center">
          <InputPlaceholder
            v-model:value="updateFormData.number"
            :placeholder="languageStore.l.project.input.projectNumberPlaceholder"
            :required="true"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <InputPlaceholder
            v-model:value="updateFormData.product_number"
            :placeholder="languageStore.l.project.input.productNumberPlaceholder"
          />
        </div>
        <div id="customer" class="grid-item-center">
          <InputPlaceholder
            v-model:value="updateFormData.customer"
            :placeholder="languageStore.l.project.input.customerPlaceholder"
            :required="true"
          />
        </div>
        <div id="description" class="grid-item-center">
          <InputPlaceholder
            v-model:value="updateFormData.description"
            :placeholder="languageStore.l.project.input.descriptionPlaceholder"
            :required="true"
          />
        </div>
        <div id="designated" class="grid-item-center">
          <SelectPlaceholder
            v-if="
              userStore.user.is_superuser ||
              userStore.user.is_adminuser ||
              userStore.user.is_systemuser
            "
            v-model:value="updateFormData.designated_user_id"
            v-bind:options-active="availableOptionsUsers"
            v-bind:options-inactive="[]"
            :placeholder="languageStore.l.project.input.designateUserPlaceholder"
            :required="true"
          />      
          <InputPlaceholder
            v-else
            :value="userStore.user.full_name"
            :placeholder="languageStore.l.project.input.designateUserPlaceholder"
            :required="true"
            :disabled="true"
          />
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="updateFormData.is_active"></Toggle>
        </div>
        <div id="active-text" class="grid-item-left">
          {{ languageStore.l.project.toggle.projectState }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 50px 50px 50px 50px 50px 25px;
  grid-template-columns: 50px auto 150px;
  grid-template-areas:
    'project project project'
    'product-number product-number product-number'
    'customer customer customer'
    'description description description'
    'designated designated designated'
    'empty empty empty'
    'active active-text active-text';
}

#empty {
  grid-area: empty;
}

#project {
  grid-area: project;
}

#product-number {
  grid-area: product-number;
}

#customer {
  grid-area: customer;
}

#description {
  grid-area: description;
}

#designated {
  grid-area: designated;
}

#active {
  grid-area: active;
}

#active-text {
  grid-area: active-text;
}
</style>
