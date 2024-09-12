<script setup lang="ts">
import { watch, computed } from "vue";
//@ts-ignore
import Toggle from "@vueform/toggle/dist/toggle.js";

import { useUsersStore } from "@/stores/user";

import type { ProjectUpdateSchema } from "@/schemas/project";

import SelectUser from "@/components/elements/SelectUser.vue";

// Props & Emits
const props = defineProps<{
  formData: ProjectUpdateSchema;
}>();

const emit = defineEmits<{
  (e: "update:formData", v: ProjectUpdateSchema): void;
}>();

// Computed
const updateFormData = computed<ProjectUpdateSchema>(() => props.formData);

// Stores
const usersStore = useUsersStore();

watch(
  () => updateFormData,
  () => {
    emit("update:formData", updateFormData.value);
  },
  { deep: true },
);
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="project" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.number"
            placeholder="Number *"
          />
        </div>
        <div id="machine" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.machine"
            placeholder="Machine"
          />
        </div>
        <div id="customer" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.customer"
            placeholder="Customer *"
          />
        </div>
        <div id="description" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.description"
            placeholder="Description *"
          />
        </div>
        <div id="designated" class="grid-item-center">
          <SelectUser
            v-model:selection="updateFormData.designated_user_id"
            :options="usersStore.users"
          />
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="updateFormData.is_active"></Toggle>
        </div>
        <div id="active-text" class="grid-item-left">Active</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/form/formBase.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-rows: 40px 40px 40px 40px 40px 25px;
  grid-template-columns: 50px auto 150px;
  grid-template-areas:
    "project project project"
    "machine machine machine"
    "customer customer customer"
    "description description description"
    "designated designated designated"
    "active active-text active-text";
}

#project {
  grid-area: project;
}

#machine {
  grid-area: machine;
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
