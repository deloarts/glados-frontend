<script setup lang="ts">
import { watch, computed, onBeforeMount } from 'vue'
import Toggle from '@vueform/toggle'

import { useLanguageStore } from '@/stores/language'
import { useUsersStore, useUserStore } from '@/stores/user'

import type { AvailableOption } from '@/models/controls'
import type { ProjectCreateSchema } from '@/schemas/project'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledSelect from '@/components/elements/LabeledSelect.vue'

// Props & Emits
const props = defineProps<{
  formData: ProjectCreateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: ProjectCreateSchema): void
}>()

// Computed
const createFormData = computed<ProjectCreateSchema>(() => props.formData)

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
  () => createFormData,
  () => {
    emit('update:formData', createFormData.value)
  },
  { deep: true },
)

onBeforeMount(() => {
  setOptionsUsers()
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container form-base-container-bottom-space">
      <div id="grid">
        <div id="project" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.number"
            :placeholder="languageStore.l.project.input.projectNumberPlaceholder"
            :required="true"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.product_number"
            :placeholder="languageStore.l.project.input.productNumberPlaceholder"
          />
        </div>
        <div id="customer" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.customer"
            :placeholder="languageStore.l.project.input.customerPlaceholder"
            :required="true"
          />
        </div>
        <div id="description" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.description"
            :placeholder="languageStore.l.project.input.descriptionPlaceholder"
            :required="true"
          />
        </div>
        <div id="designated" class="grid-item-center">
          <LabeledSelect
            v-if="
              userStore.user.is_superuser ||
              userStore.user.is_adminuser ||
              userStore.user.is_systemuser
            "
            v-model:value="createFormData.designated_user_id"
            v-bind:options="availableOptionsUsers"
            :placeholder="languageStore.l.project.input.designateUserPlaceholder"
            :required="true"
          />
          <LabeledInput
            v-else
            :value="userStore.user.full_name"
            :placeholder="languageStore.l.project.input.designateUserPlaceholder"
            :required="true"
            :disabled="true"
          />
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="createFormData.is_active"></Toggle>
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
