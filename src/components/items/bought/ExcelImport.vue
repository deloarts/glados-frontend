<script setup lang="ts">
import { ref, watch } from "vue";

import { boughtItemsRequest } from "@/requests/items";
import { useNotificationStore } from "@/stores/notification";

import { ErrorDetails } from "@/models/errors";

import ButtonExcel from "@/components/elements/ButtonExcel.vue";
import ButtonAbort from "@/components/elements/ButtonAbort.vue";
import Spinner from "@/components/spinner/LoadingSpinner.vue";
import DropZone from "@/components/elements/DropZone.vue";
import useFileList from "@/compositions/file-list";

interface ResponseWarning {
  row: number;
  errors: Array<ErrorDetails>;
}

// Props & Emits
const props = defineProps<{
  showUploader: boolean;
  onSuccess: Function;
}>();

const emit = defineEmits<{
  (e: "update:showUploader", v: boolean): void;
}>();

// Stores
const notificationStore = useNotificationStore();

// Files
const { files, addFiles, removeFile } = useFileList();

// Handler
let uploading = ref<boolean>(false);
let warningsList = ref<Array<ResponseWarning>>([]);

function onInputChange(e: any) {
  addFiles(e.target.files);
  e.target.value = null; // reset so that selecting the same file again will still cause it to fire this change
}

function onAbort() {
  uploading.value = false;
  warningsList.value = [];
  emit("update:showUploader", false);
}

function onTemplate() {
  boughtItemsRequest.getItemsExcelTemplate().then((response) => {
    if (response.status == 200) {
      let blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      let url = window.URL.createObjectURL(blob);
      window.open(url);
      emit("update:showUploader", false);
    } else {
      notificationStore.warning = "Could not download template file.";
    }
  });
}

function uploadFile() {
  uploading.value = true;

  let formData = new FormData();
  formData.append("file", files.value[0].file);

  boughtItemsRequest
    .postItemsExcel(formData)
    .then((response) => {
      uploading.value = false;
      if (response.status == 200) {
        notificationStore.info = "EXCEL import successful.";
        props.onSuccess();
        emit("update:showUploader", false);
      } else if (response.status == 422) {
        notificationStore.warning = "EXCEL file content is incomplete.";
        warningsList.value = response.data.detail;
      } else {
        notificationStore.warning = response.data.detail;
        emit("update:showUploader", false);
      }
    })
    .catch((error) => {
      notificationStore.warning = "Could not process file.";
      emit("update:showUploader", false);
    });
}

function textErrorInput(text) {
  if (text == null) {
    return "an empty cell";
  } else {
    return text;
  }
}

watch(files, () => {
  if (files.value.length > 0) {
    uploadFile();
    files.value = [];
  }
});
</script>

<template>
  <div class="scope" v-if="props.showUploader">
    <div class="coat" v-on:click="onAbort"></div>
    <div class="center">
      <div v-if="warningsList.length == 0" class="dnd">
        <DropZone
          class="drop-area"
          @files-dropped="addFiles"
          #default="{ dropZoneActive }"
        >
          <label for="file-input">
            <div v-if="uploading">
              <Spinner class="spinner"></Spinner>
            </div>
            <div v-else-if="dropZoneActive">
              <span>Drop Them Here</span>
            </div>
            <div v-else>
              <span>Drag Your Files Here</span>
            </div>
            <input
              type="file"
              id="file-input"
              :accept="'.xlsx'"
              multiple
              @change="onInputChange"
            />
          </label>
        </DropZone>
        <div>
          <ButtonAbort
            class="buttonAbort"
            text="Abort"
            v-on:click="onAbort"
          ></ButtonAbort>
          <ButtonExcel
            class="buttonTemplate"
            text="Template"
            v-on:click="onTemplate"
          ></ButtonExcel>
        </div>
      </div>
      <div v-else class="warnings">
        <h1>Import Validation Errors</h1>
        <div class="warningsWrapper">
          <ol>
            <li
              class="warningsItem"
              v-for="(warning, i) in warningsList"
              :key="i"
            >
              <span class="bold bigger">Error in row #{{ warning.row }}:</span>
              <ul>
                <li v-for="(error, j) in warningsList[i].errors" :key="j">
                  <span class="bold">{{ error.loc.join(", ") }}</span
                  >: {{ error.msg }}, but received
                  <em>{{ textErrorInput(error.input) }}</em>
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div>
          <ButtonAbort
            class="buttonAbort"
            text="Close"
            v-on:click="onAbort"
          ></ButtonAbort>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.scope {
  color: white;
}

.coat {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: $main-background-color;

  opacity: 0.9;
}

.center {
  z-index: 1001;
  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);

  padding: $main-padding;

  background: $main-background-color;
  border-width: $main-border-width;
  border-style: $main-border-style;
  border-color: $main-border-color;
  border-radius: $main-border-radius;

  text-align: center;
}
.dnd {
  width: 350px;
  height: 190px;
  // padding: 30px;
  // padding-bottom: 30px;
}
.drop-area {
  width: 100%;
  height: 155px;

  text-align: center;

  border: 1px solid $main-color;
  border-radius: 0.25em;

  color: white;
  background: $main-background-color-dark;
  cursor: move;
  transition: background 0.2s ease;
}

.drop-area div {
  padding-top: 70px;
}

.drop-area .spinner {
  position: absolute;
  top: 18px;
  left: 185px;
}

.warnings {
  width: auto;
  height: auto;
  padding-bottom: 30px;
}
.warningsItem {
  padding-bottom: 20px;
  white-space: pre-wrap;
}
.warningsWrapper {
  width: 800px;
  height: 400px;
  overflow: auto;
  font-family: Calibri, Arial, Helvetica, sans-serif;
  text-align: left;
}

.bold {
  font-weight: bold;
}

.bigger {
  font-size: 1.1em;
}

button {
  // width: 135px;
  // height: 35px;
  margin-top: 15px;
  float: right;
}

.buttonAbort {
  margin-left: 5px;
}

.buttonTemplate {
  margin-right: 5px;
}

input {
  display: none;
}

h1 {
  font-family: "Play", "Segoe UI", "Arial";
  font-size: 1.5em;
  font-weight: thin;
}
</style>
