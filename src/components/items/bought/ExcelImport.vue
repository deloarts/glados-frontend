<script lang="ts">
import { boughtItemsRequest } from "@/requests/items";
import DragAndDrop from "@/components/elements/DragAndDrop.vue";

export default {
    name: "ExcelImport",
    props: ["showUploader", "onSuccess"],
    emits:["update:showUploader"],
    components: { DragAndDrop },
    data() {
      return {
        // Globals
        notificationWarning: this.$notificationWarning,
        notificationInfo: this.$notificationInfo,

        filelist: [],
        warningsList: [],
        };
    },
    methods: {
      onAbort() {
        this.warningsList = [];
        this.$emit("update:showUploader", false);
      },
      onUpload() {
        let formData = new FormData();
        formData.append("file", this.filelist[0]);

        boughtItemsRequest.postItemsExcel(formData).then(response => {
          if (response.status == 200) {
            // @ts-ignore
            this.notificationInfo = "EXCEL import successful.";
            this.onSuccess();
            this.$emit("update:showUploader", false);
          }
          else if (response.status == 422) {
            // @ts-ignore
            this.notificationWarning = "EXCEL file content is incomplete.";
            this.warningsList = response.data.detail;
          }
          else {
            // @ts-ignore
            this.notificationWarning = response.data.detail;
            this.$emit("update:showUploader", false);
          }
        }).catch(error => {
          // @ts-ignore
          this.notificationWarning = "Could not process file.";
          this.$emit("update:showUploader", false);
        });
      },
      onTemplate() {
        boughtItemsRequest.getItemsExcelTemplate().then(response => {
          if (response.status == 200) {
            let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            let url = window.URL.createObjectURL(blob);

            window.open(url);
            this.$emit("update:showUploader", false);
          } else {
            // @ts-ignore
            this.notificationWarning = "Could not download template file.";
          }
        });
      }
    },
    mounted() {
    },
}
</script>

<template>
  <div class="scope" v-if="showUploader">
    <div class="coat"></div>
    <div class="center">
      <div v-if="warningsList.length == 0" id="dnd">
        <drag-and-drop filetype=".xlsx" v-model:filelist="filelist" v-bind:on-upload="onUpload"></drag-and-drop>
      </div>
      <div v-else id="warnings">
        <h1>Errors</h1>
        <div class="warningsWrapper">
          <ol><li v-for="(item, index) in warningsList" :key="item">{{ item }}</li></ol>
        </div>
      </div>
      <div><button id="btnTemplate" v-on:click="onTemplate">Get Template</button></div>
      <div><button id="btnAbort" v-on:click="onAbort">Abort</button></div>
      
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';

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

  // display: grid;
  // grid-gap: 20px;
  // grid-template-rows: 80px 30px;
  // grid-template-columns: 300px;
  // grid-template-areas: 'dnd'
  //   'warnings'
  //   'btnAbort';
      
  background: $main-background-color;
  border-style: solid;
  border-color: $main-color;
  border-width: 1px;
  border-radius: 5px;

  text-align: center;
  padding: 30px;
}

button {
  font-family: 'Play', 'Segoe UI', 'Arial';
  font-weight: 700;
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 3px;
  transition: background 0.2s ease;
  margin-top: 10px;
}

h1 {
  font-family: 'Play', 'Segoe UI', 'Arial';
  font-size: 1.5em;
  font-weight: thin;
}

li {
  padding-bottom: 10px;
}

.warningsWrapper {
  width: 300px;
  height: 400px;
  overflow: auto;
  font-family: Calibri, Arial, Helvetica, sans-serif;
  text-align: left;
}

#btnAbort {
  // grid-area: btnAbort;
  // width: 150px;
  // height: 30px;
  // padding-top: 30px;
  // padding-bottom: 30px;
  // padding-right: 5px;
}

#btnTemplate {
  // grid-area: btnTemplate;
  // width: auto;
  // height: auto;
  // padding-top: 30px;
  // padding-bottom: 30px;
  // padding-right: 5px;
}

#warnings {
  width: auto;
  height: auto;
  // padding: 30px;
  // grid-area: warnings;
  padding-bottom: 30px;
}

#dnd {
    width: 300px;
    height: 80px;
    padding: 0;
    // padding-top: 30px;
    padding-bottom: 30px;
    // grid-area: dnd;
}
</style>
