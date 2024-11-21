<script setup lang="ts">
import { watch, computed } from "vue";
//@ts-ignore
import Toggle from "@vueform/toggle/dist/toggle.js";

import { useLanguageStore } from "@/stores/language";
import { useUsersStore, useUserStore } from "@/stores/user";

import type { ProjectCreateSchema } from "@/schemas/project";

import SelectUser from "@/components/elements/SelectUser.vue";

// Props & Emits
const props = defineProps<{
  formData: ProjectCreateSchema;
}>();

const emit = defineEmits<{
  (e: "update:formData", v: ProjectCreateSchema): void;
}>();

// Computed
const createFormData = computed<ProjectCreateSchema>(() => props.formData);

// Stores
const languageStore = useLanguageStore();
const userStore = useUserStore();
const usersStore = useUsersStore();

watch(
  () => createFormData,
  () => {
    emit("update:formData", createFormData.value);
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
            v-model="createFormData.number"
            :placeholder="
              languageStore.l.project.input.projectNumberPlaceholder
            "
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.product_number"
            :placeholder="
              languageStore.l.project.input.productNumberPlaceholder
            "
          />
        </div>
        <div id="customer" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.customer"
            :placeholder="languageStore.l.project.input.customerPlaceholder"
          />
        </div>
        <div id="description" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.description"
            :placeholder="languageStore.l.project.input.descriptionPlaceholder"
          />
        </div>
        <div id="designated" class="grid-item-center">
          <SelectUser
            v-if="
              userStore.user.is_superuser ||
              userStore.user.is_adminuser ||
              userStore.user.is_systemuser
            "
            v-model:selection="createFormData.designated_user_id"
            :options="usersStore.users"
            :placeholder="
              languageStore.l.project.input.designateUserPlaceholder
            "
          />
          <input
            v-else
            class="form-base-text-input"
            :value="userStore.user.full_name"
            disabled
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
@import "@/scss/form/formBase.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-rows: 40px 40px 40px 40px 40px 25px;
  grid-template-columns: 50px auto 150px;
  grid-template-areas:
    "project project project"
    "product-number product-number product-number"
    "customer customer customer"
    "description description description"
    "designated designated designated"
    "active active-text active-text";
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
