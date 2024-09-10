<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeMount } from "vue";
//@ts-ignore
import moment from "moment";
//@ts-ignore
import Toggle from "@vueform/toggle/dist/toggle.js";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { useUnitsStore } from "@/stores/units";
import { useProjectsStore } from "@/stores/projects";

import type { BoughtItemCreateSchema } from "@/schemas/boughtItem";
import type { AvailableOption } from "@/models/controls";

import SelectBase from "@/components/elements/SelectBase.vue";
import SelectProject from "@/components/elements/SelectProject.vue";

// Props & Emits
const props = defineProps<{
  formData: BoughtItemCreateSchema;
}>();

const emit = defineEmits<{
  (e: "update:formData", v: BoughtItemCreateSchema): void;
}>();

// Computed
const createFormData = computed<BoughtItemCreateSchema>(() => props.formData);

// Stores
const unitStore = useUnitsStore();
const projectsStore = useProjectsStore();

// Options
let availableOptionsProjects: Array<AvailableOption> = [];

// Dates
const pickedDesiredDate = ref<Date>(null);
const formatDesiredDate = (pickedDesiredDate: Date) => {
  const day = pickedDesiredDate.getDate();
  const month = pickedDesiredDate.getMonth() + 1;
  const year = pickedDesiredDate.getFullYear();
  return `${day}.${month}.${year}`;
};

function setOptionsProjects() {
  var temp = [];
  for (let i = 0; i < projectsStore.projects.length; i++) {
    if (projectsStore.projects[i].is_active) {
      temp.push({
        text: `${projectsStore.projects[i].number} - ${projectsStore.projects[i].customer} - ${projectsStore.projects[i].description}`,
        value: projectsStore.projects[i].id,
      });
    }
  }
  availableOptionsProjects = temp;
}

// Form stuff
const name = ref("");

function buildPartnumber() {
  const partnumber =
    name.value +
    " - " +
    createFormData.value.definition +
    " - " +
    createFormData.value.manufacturer;
  let data = createFormData.value;
  data.partnumber = partnumber;
  emit("update:formData", data);
}

watch(
  () => createFormData,
  (current, previous) => {
    let data = createFormData.value;
    if (
      data.desired_delivery_date != null &&
      data.desired_delivery_date != undefined
    ) {
      const date = Date.parse(String(data.desired_delivery_date));
      pickedDesiredDate.value = new Date(date);
    }
    buildPartnumber();
    emit("update:formData", data);
  },
  { deep: true },
);

watch(name, () => {
  buildPartnumber();
});

watch(pickedDesiredDate, () => {
  let data = createFormData.value;
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

onMounted(() => {
  createFormData.value.unit = unitStore.boughtItemUnits.default;
});
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="project" class="grid-item-center">
          <SelectProject
            v-model:selection="createFormData.project_id"
            :options="availableOptionsProjects"
          />
        </div>
        <div id="machine" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-bind:value="projectsStore.getMachine(createFormData.project_id)"
            placeholder="Machine"
            readonly
          />
        </div>
        <div id="quantity" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.quantity"
            type="number"
            placeholder="Quantity *"
          />
        </div>
        <div id="unit" class="grid-item-center">
          <SelectBase
            v-model:selection="createFormData.unit"
            :options="unitStore.boughtItemUnits.values"
          />
        </div>
        <div id="name" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="name"
            placeholder="Name *"
          />
        </div>
        <div id="definition" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.definition"
            placeholder="Definition *"
          />
        </div>
        <div id="manufacturer" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.manufacturer"
            placeholder="Manufacturer *"
          />
        </div>
        <div id="supplier" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.supplier"
            placeholder="Supplier"
          />
        </div>
        <div id="group" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.group_1"
            placeholder="Group"
          />
        </div>
        <div id="weblink" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.weblink"
            placeholder="Weblink"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <Datepicker
            class="form-base-date-input"
            v-model="pickedDesiredDate"
            :format="formatDesiredDate"
            :clearable="true"
            placeholder="Desired Delivery Date"
            dark
          />
        </div>
        <div id="note-general" class="grid-item-center">
          <textarea
            class="form-base-text-input-multiline"
            v-model="createFormData.note_general"
            placeholder="Note"
          ></textarea>
        </div>
        <div id="note-supplier" class="grid-item-center">
          <textarea
            class="form-base-text-input-multiline"
            v-model="createFormData.note_supplier"
            placeholder="Note Supplier"
          ></textarea>
        </div>
        <div id="notify" class="grid-item-center">
          <Toggle v-model="createFormData.notify_on_delivery"></Toggle>
        </div>
        <div id="notify-text" class="grid-item-left">Notify me on delivery</div>
        <div id="priority" class="grid-item-center">
          <Toggle v-model="createFormData.high_priority"></Toggle>
        </div>
        <div id="priority-text" class="grid-item-left">High priority</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/form/formBase.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 25px 25px;
  grid-template-columns: 50px 350px 150px 620px;
  grid-template-areas:
    "project project project note-general"
    "machine machine machine note-general"
    "quantity quantity unit note-general"
    "name name name note-general"
    "definition definition definition note-general"
    "manufacturer manufacturer manufacturer note-supplier"
    "supplier supplier supplier note-supplier"
    "group group group note-supplier"
    "weblink weblink weblink note-supplier"
    "desired desired desired note-supplier"
    "notify notify-text notify-text notify-text"
    "priority priority-text priority-text priority-text";
}

@media screen and (max-width: $max-width-desktop) {
  #grid {
    grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 120px 120px 25px 25px;
    grid-template-columns: 50px auto 150px;
    grid-template-areas:
      "project project project"
      "machine machine machine"
      "quantity quantity unit"
      "name name name"
      "definition definition definition"
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

#machine {
  grid-area: machine;
}

#quantity {
  grid-area: quantity;
}

#unit {
  grid-area: unit;
}

#name {
  grid-area: name;
}

#definition {
  grid-area: definition;
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
