<script setup lang="ts">
import { ref, computed } from "vue";

import router from "@/router/index";
import { boughtItemsRequest } from "@/requests/items";

import { useLanguageStore } from "@/stores/language";
import { useUnitsStore } from "@/stores/units";
import { useNotificationStore } from "@/stores/notification";

import type { BoughtItemCreateMultiSchema } from "@/schemas/boughtItem";

import ExcelImport from "@/components/items/bought/ExcelImport.vue";

import ButtonItemCreate from "@/components/elements/ButtonItemCreate.vue";
import ButtonAbort from "@/components/elements/ButtonAbort.vue";
import ButtonPlus from "@/components/elements/ButtonPlus.vue";
import ButtonExcel from "@/components/elements/ButtonExcel.vue";

const props = defineProps<{
  multiData: Array<BoughtItemCreateMultiSchema>;
}>();
const emit = defineEmits<{
  (e: "update:multiData", v: Array<BoughtItemCreateMultiSchema>): void;
}>();

const computedMultiData = computed<Array<BoughtItemCreateMultiSchema>>({
  get() {
    return props.multiData;
  },
  set(newValue) {
    emit("update:multiData", newValue);
    return newValue;
  },
});

// Stores
const languageStore = useLanguageStore();
const unitsStore = useUnitsStore();
const notificationStore = useNotificationStore();

const showExcelImport = ref<boolean>(false);

function onCreate() {
  if (computedMultiData.value.length == 0) {
    notificationStore.addInfo("Create a row first");
    return;
  }

  const tempData = JSON.parse(JSON.stringify(props.multiData));
  computedMultiData.value = [];

  for (let i = 0; i < tempData.length; i++) {
    boughtItemsRequest
      .postItems(tempData[i])
      .then((response) => {
        if (response.status === 200) {
          notificationStore.addInfo(
            languageStore.l.notification.info.createdItem,
          );
        } else if (response.status === 422) {
          // Assign error msg to data
          for (let errIdx = 0; errIdx < response.data.detail.length; errIdx++) {
            tempData[i][`${response.data.detail[errIdx].loc[1]}_error`] =
              response.data.detail[errIdx].msg;
          }
          computedMultiData.value.push(tempData[i]);
        } else {
          computedMultiData.value.push(tempData[i]);
          notificationStore.addWarn(response.data.detail);
        }
      })
      .catch((error) => {
        computedMultiData.value.push(tempData[i]);
        console.log(error);
        notificationStore.addWarn(error);
      });
  }
}

function onAbort() {
  router.push({ name: "BoughtItems" });
}

function onNewRow() {
  const tempMultiData = JSON.parse(JSON.stringify(computedMultiData.value));
  const temp = [
    {
      project_id: null,
      partnumber: null,
      order_number: null,
      manufacturer: null,
      quantity: 1,
      unit: unitsStore.boughtItemUnits.default,
      supplier: null,
      group_1: null,
      weblink: null,
      note_general: null,
      note_supplier: null,
      desired_delivery_date: null,
      high_priority: null,
      notify_on_delivery: null,
    },
  ];
  for (let i = 0; i < tempMultiData.length; i++) {
    temp.push(tempMultiData[i]);
  }
  computedMultiData.value = temp;
}
</script>

<template>
  <div class="controls-base-scope">
    <div id="item-controls" class="controls-base-container">
      <ButtonItemCreate
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.createAll"
        v-on:click="onCreate"
      />
      <ButtonAbort
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.cancel"
        v-on:click="onAbort"
      />
    </div>
    <div id="item-controls" class="controls-base-container">
      <ButtonExcel
        class="controls-base-element"
        :text="languageStore.l.boughtItem.button.importExcel"
        v-on:click="showExcelImport = true"
      />
      <ButtonPlus
        class="controls-base-element"
        text="New Row"
        v-on:click="onNewRow"
      />
    </div>
  </div>

  <ExcelImport
    v-model:multi-data="computedMultiData"
    v-model:show-uploader="showExcelImport"
  />
</template>

<style scoped lang="scss">
@import "@/scss/controls/controlsBase.scss";
</style>
