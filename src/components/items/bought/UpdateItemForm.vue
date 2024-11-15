<script setup lang="ts">
import { ref, watch, computed, onBeforeMount } from "vue";
//@ts-ignore
import moment, { lang } from "moment";
import Toggle from "@vueform/toggle/dist/toggle.js";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { useLanguageStore } from "@/stores/language";
import { useUnitsStore } from "@/stores/units";
import { useProjectsStore } from "@/stores/projects";

import type { BoughtItemUpdateSchema } from "@/schemas/boughtItem";
import type { AvailableOption } from "@/models/controls";

import SelectBase from "@/components/elements/SelectBase.vue";
import SelectProject from "@/components/elements/SelectProject.vue";

// Props & Emits
const props = defineProps<{
  formData: BoughtItemUpdateSchema;
}>();

const emit = defineEmits<{
  (e: "update:formData", v: BoughtItemUpdateSchema): void;
}>();

// Computed
const updateFormData = computed<BoughtItemUpdateSchema>(() => props.formData);

// Stores
const languageStore = useLanguageStore();
const unitStore = useUnitsStore();
const projectsStore = useProjectsStore();

// Options
let availableOptionsProjectsActive: Array<AvailableOption> = [];
let availableOptionsProjectsInactive: Array<AvailableOption> = [];

// Dates
const pickedDesiredDate = ref<Date>(null);
const formatDesiredDate = (pickedDesiredDate: Date) => {
  const day = pickedDesiredDate.getDate();
  const month = pickedDesiredDate.getMonth() + 1;
  const year = pickedDesiredDate.getFullYear();
  return `${day}.${month}.${year}`;
};

function setOptionsProjects() {
  var tempActive = [];
  var tempInactive = [];
  for (let i = 0; i < projectsStore.items.length; i++) {
    if (projectsStore.items[i].is_active) {
      tempActive.push({
        text: `${projectsStore.items[i].number} - ${projectsStore.items[i].customer} - ${projectsStore.items[i].description}`,
        value: projectsStore.items[i].id,
      });
    } else {
      tempInactive.push({
        text: `${projectsStore.items[i].number} - ${projectsStore.items[i].customer} - ${projectsStore.items[i].description}`,
        value: projectsStore.items[i].id,
      });
    }
  }
  availableOptionsProjectsActive = tempActive;
  availableOptionsProjectsInactive = tempInactive;
}

watch(
  () => updateFormData,
  () => {
    let data = updateFormData.value;
    if (
      data.desired_delivery_date != null &&
      data.desired_delivery_date != undefined
    ) {
      const date = Date.parse(String(data.desired_delivery_date));
      pickedDesiredDate.value = new Date(date);
    }
    emit("update:formData", data);
  },
  { deep: true },
);

watch(pickedDesiredDate, () => {
  let data = updateFormData.value;
  if (pickedDesiredDate.value instanceof Date) {
    data.desired_delivery_date = moment(pickedDesiredDate.value).format(
      "YYYY-MM-DD",
    );
  } else {
    data.desired_delivery_date = null;
  }
  emit("update:formData", data);
});

watch(
  () => projectsStore.$state,
  () => {
    setOptionsProjects();
  },
  { deep: true },
);

onBeforeMount(setOptionsProjects);
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div class="grid">
        <div id="project" class="grid-item-center">
          <SelectProject
            v-model:selection="updateFormData.project_id"
            :options-active="availableOptionsProjectsActive"
            v-bind:options-inactive="availableOptionsProjectsInactive"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-bind:value="
              projectsStore.getProductNumber(updateFormData.project_id)
            "
            :placeholder="
              languageStore.l.boughtItem.input.productNumberPlaceholder
            "
            readonly
          />
        </div>
        <div id="quantity" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.quantity"
            type="number"
            :placeholder="languageStore.l.boughtItem.input.quantityPlaceholder"
          />
        </div>
        <div id="unit" class="grid-item-center">
          <SelectBase
            v-model:selection="updateFormData.unit"
            :options="unitStore.boughtItemUnits.values"
          />
        </div>
        <div id="partnumber" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.partnumber"
            :placeholder="
              languageStore.l.boughtItem.input.partnumberPlaceholder
            "
          />
        </div>
        <div id="order-number" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.order_number"
            :placeholder="
              languageStore.l.boughtItem.input.orderNumberPlaceholder
            "
          />
        </div>
        <div id="manufacturer" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.manufacturer"
            :placeholder="
              languageStore.l.boughtItem.input.manufacturerPlaceholder
            "
          />
        </div>
        <div id="supplier" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.supplier"
            :placeholder="languageStore.l.boughtItem.input.supplierPlaceholder"
          />
        </div>
        <div id="group" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.group_1"
            :placeholder="languageStore.l.boughtItem.input.group1Placeholder"
          />
        </div>
        <div id="weblink" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="updateFormData.weblink"
            :placeholder="languageStore.l.boughtItem.input.weblinkPlaceholder"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <Datepicker
            class="form-base-date-input"
            v-model="pickedDesiredDate"
            :format="formatDesiredDate"
            :clearable="true"
            :placeholder="
              languageStore.l.boughtItem.input.desiredDatePlaceholder
            "
            dark
          />
        </div>
        <div id="note-general" class="grid-item-center">
          <textarea
            class="form-base-text-input-multiline"
            v-model="updateFormData.note_general"
            :placeholder="
              languageStore.l.boughtItem.input.noteGeneralPlaceholder
            "
          ></textarea>
        </div>
        <div id="note-supplier" class="grid-item-center">
          <textarea
            class="form-base-text-input-multiline"
            v-model="updateFormData.note_supplier"
            :placeholder="
              languageStore.l.boughtItem.input.noteSupplierPlaceholder
            "
          ></textarea>
        </div>
        <div id="notify" class="grid-item-center">
          <Toggle v-model="updateFormData.notify_on_delivery"></Toggle>
        </div>
        <div id="notify-text" class="grid-item-left">
          {{ languageStore.l.boughtItem.toggle.notifyOnDelivery }}
        </div>
        <div id="priority" class="grid-item-center">
          <Toggle v-model="updateFormData.high_priority"></Toggle>
        </div>
        <div id="priority-text" class="grid-item-left">
          {{ languageStore.l.boughtItem.toggle.highPriority }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/form/formBase.scss";
@import "@/scss/grid/gridBase.scss";

.grid {
  grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 25px 25px;
  grid-template-columns: 50px 350px 150px 620px;
  grid-template-areas:
    "project project project note-general"
    "product-number product-number product-number note-general"
    "quantity quantity unit note-general"
    "partnumber partnumber partnumber note-general"
    "order-number order-number order-number note-general"
    "manufacturer manufacturer manufacturer note-supplier"
    "supplier supplier supplier note-supplier"
    "group group group note-supplier"
    "weblink weblink weblink note-supplier"
    "desired desired desired note-supplier"
    "notify notify-text notify-text notify-text"
    "priority priority-text priority-text priority-text";
}

@media screen and (max-width: $max-width-desktop) {
  .grid {
    grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 120px 120px 25px 25px;
    grid-template-columns: 50px auto 150px;
    grid-template-areas:
      "project project project"
      "product-number product-number product-number"
      "quantity quantity unit"
      "partnumber partnumber partnumber"
      "order-number order-number order-number"
      "manufacturer manufacturer manufacturer"
      "supplier supplier supplier"
      "group group group"
      "weblink weblink weblink"
      "desired desired desired"
      "note-general note-general note-general"
      "note-supplier note-supplier note-supplier"
      "notify notify-text notify-text"
      "priority priority-text priority-text";
  }
}

#notify {
  grid-area: notify;
}

#notify-text {
  grid-area: notify-text;
}

#priority {
  grid-area: priority;
}

#priority-text {
  grid-area: priority-text;
}

#project {
  grid-area: project;
}

#product-number {
  grid-area: product-number;
}

#quantity {
  grid-area: quantity;
}

#unit {
  grid-area: unit;
}

#partnumber {
  grid-area: partnumber;
}

#order-number {
  grid-area: order-number;
}

#manufacturer {
  grid-area: manufacturer;
}

#supplier {
  grid-area: supplier;
}

#group {
  grid-area: group;
}

#weblink {
  grid-area: weblink;
}

#desired {
  grid-area: desired;
}

#note-general {
  grid-area: note-general;
  padding-top: 10px;
  padding-bottom: 10px;
}

#note-supplier {
  grid-area: note-supplier;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
