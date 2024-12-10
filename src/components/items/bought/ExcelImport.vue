<script setup lang="ts">
import { ref, watch } from 'vue'
//@ts-ignore
import Toggle from '@vueform/toggle/dist/toggle.js'

import { useLanguageStore } from '@/stores/language'
import { useBoughtItemsBatchImportStore } from '@/stores/boughtItems'

import ButtonAbort from '@/components/elements/ButtonAbort.vue'
import Spinner from '@/components/spinner/LoadingSpinner.vue'
import DropZone from '@/components/elements/DropZone.vue'
//@ts-ignore
import useFileList from '@/compositions/file-list'

const props = defineProps<{
  showUploader: boolean
}>()

const emit = defineEmits<{
  (e: 'update:showUploader', v: boolean): void
}>()

const languageStore = useLanguageStore()
const boughtItemsBatchImportStore = useBoughtItemsBatchImportStore()

const serverSideValidation = ref<boolean>(false)

const { files, addFiles, removeFile } = useFileList()

function onInputChange(e: any) {
  addFiles(e.target.files)
  e.target.value = null // reset so that selecting the same file again will still cause it to recognize this change
}

function onAbort() {
  boughtItemsBatchImportStore.clearWarnings()
  emit('update:showUploader', false)
}

function textErrorInput(text: string | null) {
  if (text == null) {
    return languageStore.l.boughtItem.xlsx.anEmptyCell
  } else {
    return text
  }
}

watch(files, () => {
  if (files.value.length > 0) {
    boughtItemsBatchImportStore
      .importFile(files.value[0].file, !serverSideValidation.value)
      .then((response) => {
        if (response.status != 422) {
          emit('update:showUploader', false)
        }
      })
    files.value = []
  }
})
</script>

<template>
  <div class="scope" v-if="props.showUploader">
    <div class="coat" v-on:click="onAbort"></div>
    <div class="center">
      <div v-if="boughtItemsBatchImportStore.warnings.length == 0" class="dnd">
        <DropZone class="drop-area" @files-dropped="addFiles" #default="{ dropZoneActive }">
          <label for="file-input">
            <div v-if="boughtItemsBatchImportStore.importing">
              <Spinner class="spinner"></Spinner>
            </div>
            <div v-else-if="dropZoneActive">
              <span>{{ languageStore.l.boughtItem.xlsx.dropHere }}</span>
            </div>
            <div v-else>
              <span>{{ languageStore.l.boughtItem.xlsx.dragHere }}</span>
            </div>
            <input type="file" id="file-input" :accept="'.xlsx'" multiple @change="onInputChange" />
          </label>
        </DropZone>
        <div class="drop-area-element-wrapper">
          <ButtonAbort
            class="drop-area-elements"
            :text="languageStore.l.boughtItem.button.cancel"
            v-on:click="onAbort"
          />
          <div class="drop-area-elements">
            <div class="drop-area-element-text">Server-Side Validation</div>
          </div>
          <div class="drop-area-elements">
            <Toggle class="drop-area-element-toggle" v-model="serverSideValidation" />
          </div>
        </div>
      </div>
      <div v-else class="warnings">
        <h1>{{ languageStore.l.boughtItem.xlsx.importValidationErrors }}</h1>
        <div class="warningsWrapper">
          <ol>
            <li
              class="warningsItem"
              v-for="(warning, i) in boughtItemsBatchImportStore.warnings"
              :key="i"
            >
              <span class="bold bigger"
                >{{ languageStore.l.boughtItem.xlsx.errorInRow }}{{ warning.row }}:</span
              >
              <ul>
                <li v-for="(error, j) in boughtItemsBatchImportStore.warnings[i].errors" :key="j">
                  <span class="bold">{{ error.loc.join(', ') }}</span
                  >: {{ error.msg }},
                  {{ languageStore.l.boughtItem.xlsx.butReceived }}
                  <em>{{ textErrorInput(error.input) }}</em>
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div>
          <ButtonAbort
            class="button-abort"
            :text="languageStore.l.boughtItem.button.cancel"
            v-on:click="onAbort"
          ></ButtonAbort>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  color: var(--main-text-color);
}

.coat {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: var(--main-background-color);

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

  padding: var(--main-padding);

  background: var(--main-background-color);
  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--main-border-color);
  border-radius: var(--main-border-radius);

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

  border: 1px solid var(--main-color);
  border-radius: 0.25em;

  color: var(--main-text-color);
  background: var(--main-background-color-accent-1);
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

.button-abort {
  float: right;
  margin-top: 15px;
}

.drop-area-element-wrapper {
  padding-top: 15px;
}

.drop-area-elements {
  float: right;
}

.drop-area-element-toggle {
  padding-top: 8px;
}

.drop-area-element-text {
  padding-top: 8px;
  padding-right: 15px;
  padding-left: 8px;
}

input {
  display: none;
}

h1 {
  font-family: 'Play', 'Segoe UI', 'Arial';
  font-size: 1.5em;
  font-weight: thin;
}
</style>
