<script setup lang="ts">
import { watch, onBeforeMount, onUnmounted } from "vue";

// @ts-ignore
import moment from "moment";

import { useProjectFilterStore } from "@/stores/filter";
import { useUsersStore } from "@/stores/user";
import { useProjectsStore } from "@/stores/projects";

import type { AvailableOption } from "@/models/controls";

import Spinner from "@/components/spinner/LoadingSpinner.vue";

// Props & Emits
const props = defineProps<{
  selectedProjectId: number;
  triggerGetNewData: boolean;
}>();

const emit = defineEmits<{
  (e: "update:selectedProjectId", v: number): void;
  (e: "update:triggerGetNewData", v: boolean): void;
}>();

// Store
const usersStore = useUsersStore();
const projectsStore = useProjectsStore();
const projectFilterStore = useProjectFilterStore();

// Select options
let availableOptionsState: Array<AvailableOption> = [
  { text: "All", value: "" },
  { text: "Active", value: String(true) },
  { text: "Inactive", value: String(false) },
];
let availableOptionsUsers: Array<AvailableOption> = [
  { text: "All", value: "" },
];

function removeSelection() {
  emit("update:selectedProjectId", null);
}

function addSelection(id: number) {
  emit("update:selectedProjectId", id);
}

function eventKeyUp(event: any) {
  if (event.key === "Escape") {
    removeSelection();
  }
}

function setOptionsUsers() {
  var tempAvailableOptions = [{ text: "All", value: "" }];
  for (let i = 0; i < usersStore.users.length; i++) {
    tempAvailableOptions.push({
      text: usersStore.users[i].full_name,
      value: String(usersStore.users[i].id),
    });
  }
  availableOptionsUsers = tempAvailableOptions;
}

onBeforeMount(() => {
  document.addEventListener("keyup", eventKeyUp);
  setOptionsUsers();
});

onUnmounted(() => {
  document.removeEventListener("keyup", eventKeyUp);
  projectFilterStore.reset();
  projectsStore.get();
});

watch(
  () => props.triggerGetNewData,
  () => {
    if (props.triggerGetNewData) {
      projectsStore.get();
      emit("update:triggerGetNewData", false);
      emit("update:selectedProjectId", null);
    }
  },
);

watch(
  () => projectFilterStore.$state,
  () => {
    projectsStore.get();
  },
  { deep: true },
);

watch(
  () => usersStore.$state,
  () => {
    setOptionsUsers();
  },
  { deep: true },
);
</script>

<template>
  <div class="scope" v-on:keyup.esc="removeSelection">
    <Spinner
      class="spinner"
      v-if="projectsStore.loading && projectsStore.projects.length == 0"
    />
    <div class="wrapper">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="number">#</th>
            <th class="first sticky-col" id="project-id">ID</th>
            <th class="first sticky-col" id="project">Project</th>
            <th class="first sticky-col" id="product-number">Product</th>
            <th class="first" id="customer">Customer</th>
            <th class="first" id="description">Description</th>
            <th class="first" id="designated">Designated User</th>
            <th class="first" id="created">Created</th>
            <th class="first" id="is-active">State</th>
          </tr>
          <tr>
            <th class="second sticky-col" id="number"></th>
            <th class="second sticky-col" id="project-id"></th>
            <th
              class="second sticky-col"
              id="project"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.number = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="projectFilterStore.state.number"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second sticky-col"
              id="product-number"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.productNumber = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="projectFilterStore.state.productNumber"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second sticky-col"
              id="customer"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.customer = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="projectFilterStore.state.customer"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second sticky-col"
              id="description"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.description = null;
                }
              "
            >
              <input
                class="filter-input"
                v-model="projectFilterStore.state.description"
                type="text"
                placeholder="Filter"
              />
            </th>
            <th
              class="second sticky-col"
              id="designated"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.designatedUserId = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="projectFilterStore.state.designatedUserId"
              >
                <option
                  v-for="(option, index) in availableOptionsUsers"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th class="second sticky-col" id="created"></th>
            <th
              class="second sticky-col"
              id="is-active"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.isActive = null;
                }
              "
            >
              <select
                class="filter-select"
                v-model="projectFilterStore.state.isActive"
              >
                <option
                  v-for="(option, index) in availableOptionsState"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in projectsStore.projects"
            :key="project.id"
            v-bind:class="{ selected: props.selectedProjectId == project.id }"
            v-on:click="addSelection(project.id)"
          >
            <td class="sticky-col" id="number">
              {{ index + 1 }}
            </td>
            <td class="sticky-col" id="project-id">
              {{ project.id }}
            </td>
            <td
              class="sticky-col"
              id="project"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.number = project.number;
                }
              "
            >
              {{ project.number }}
            </td>
            <td
              class="sticky-col"
              id="product-number"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.productNumber = project.product_number;
                }
              "
            >
              {{ project.product_number }}
            </td>
            <td
              id="customer"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.customer = project.customer;
                }
              "
            >
              {{ project.customer }}
            </td>
            <td
              id="description"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.description = project.description;
                }
              "
            >
              {{ project.description }}
            </td>
            <td
              id="designated"
              @contextmenu.prevent="
                () => {
                  projectFilterStore.state.designatedUserId =
                    project.designated_user_id;
                }
              "
            >
              {{ usersStore.getNameByID(project.designated_user_id) }}
            </td>
            <td id="created">
              {{ moment(project.created).format("YYYY-MM-DD") }}
            </td>
            <td id="is-active">
              <span v-if="project.is_active" class="green">Active</span>
              <span v-else class="red">Inactive</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/dataTable/filter.scss";

.scope {
  height: 100%;
  width: calc(100% - 10px);
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 5px;

  overflow: hidden;
}

.wrapper {
  overflow-x: auto;
  overflow-y: auto;
  height: calc(100% - 20px);

  position: relative;

  background-color: $main-background-color-dark;

  border-style: solid;
  border-color: $main-background-color-dark;
  border-width: 10px;
  border-radius: $main-border-radius;
}

.checkbox-icon {
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.locked-icon {
  color: orange;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.green {
  color: lime;
}
.red {
  color: red;
}

table {
  border-collapse: separate;
  border-spacing: 0;

  table-layout: fixed;
  width: 100%;
  border-radius: $main-border-radius;
  background-color: $main-background-color-dark;
}

th {
  z-index: 10;
  font-family: "Play", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
}

tr {
  margin: 0;
  padding: 0;
  height: 24px;
}

tbody tr {
  border-bottom: solid thin $main-color;
}

tr:nth-child(even) > td {
  color: white;
  background: $table-row-even;
}

tr:nth-child(odd) > td {
  color: white;
  background: $table-row-odd;
}

tr:hover > td {
  background: $table-row-hover !important;
}

tr.selected > td {
  background: $table-row-active !important;
}

tr.selected:hover > td {
  background: $table-row-active-hover !important;
}

td {
  z-index: 0;
  height: 24px;

  font-size: 14px;

  margin: 0;
  padding: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: solid thin rgb(100, 100, 100);
  border-right: solid thin $table-head-background;
}

// Sticky rows & cols
.first {
  position: sticky;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  top: 0px;

  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;

  color: white;
  background: $table-head-background;
}

.second {
  position: sticky;
  height: 30px;
  min-height: 30px;
  max-height: 30px;
  top: 40px;

  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;

  // background: rgb(207, 207, 207);
  border-bottom: solid thin rgb(50, 50, 50);

  color: white;
  background: $table-head-background;
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  z-index: 20;
}

th.sticky-col {
  z-index: 40;
}

td.sticky-col {
  z-index: 30;
}

// columns
#number {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
  text-align: center;
}
#number.sticky-col {
  left: 0px;
}

#project-id {
  width: 45px;
  min-width: 45px;
  max-width: 45px;
  text-align: center;
}
#project-id.sticky-col {
  left: 37px;
}

#project {
  width: 90px;
  min-width: 90px;
  max-width: 90px;
}
#project.sticky-col {
  left: 84px;
}

#product-number {
  width: 90px;
  min-width: 90px;
  max-width: 90px;
}
#product-number.sticky-col {
  left: 176px;
}

#customer {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

#description {
  width: 250px;
  min-width: 250px;
  max-width: 250px;
}

#designated {
  width: 130px;
  min-width: 130px;
  max-width: 130px;
}

#created {
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  text-align: center;
}

#is-active {
  width: 60px;
  min-width: 60px;
  max-width: 60px;
  text-align: center;
}

.spinner {
  z-index: 999;
  position: absolute;
  width: auto;
  height: auto;
  left: 50vw;
  top: 260px;
  transform: translate(-50%, -50%);
}
</style>
