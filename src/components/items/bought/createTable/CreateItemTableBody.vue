<script setup lang="ts">
import { ref, computed } from "vue";

import { boughtItemsRequest } from "@/requests/items";

import { BoughtItemCreateMultiSchema } from "@/schemas/boughtItem";

import { boughtItemColumnWidths } from "@/presets/columnWidth";

import { useLanguageStore } from "@/stores/language";
import { useProjectsStore } from "@/stores/projects";
import { useNotificationStore } from "@/stores/notification";

import TableItemEmpty from "@/components/dataTable/TableItemEmpty.vue";
import DataTableBodyRow from "@/components/dataTable/DataTableBodyRow.vue";
import TableItemRowNumber from "@/components/dataTable/TableItemRowNumber.vue";

import CreateItemTableInput from "./CreateItemTableInput.vue";
import CreateItemTableSelectProject from "./CreateItemTableSelectProject.vue";
import CreateItemTableButtonCreate from "./CreateItemTableButtonCreate.vue";
import CreateItemTableButtonDelete from "./CreateItemTableButtonDelete.vue";

const languageStore = useLanguageStore();
const projectsStore = useProjectsStore();
const notificationStore = useNotificationStore();

const props = defineProps<{
  multiData: Array<BoughtItemCreateMultiSchema>;
  colW: typeof boughtItemColumnWidths;
}>();
const emit = defineEmits<{
  (e: "update:multiData", v: Array<BoughtItemCreateMultiSchema>): void;
  (e: "update:colW", v: typeof boughtItemColumnWidths): void;
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

const computedColW = computed<typeof boughtItemColumnWidths>({
  get() {
    return props.colW;
  },
  set(newValue) {
    emit("update:colW", newValue);
    return newValue;
  },
});

function onDelete(index: number) {
  computedMultiData.value.splice(index, 1);
}

function onCreate(index: number) {
  boughtItemsRequest
    .postItems(computedMultiData.value[index])
    .then((response) => {
      if (response.status === 200) {
        notificationStore.addInfo(
          languageStore.l.notification.info.createdItem,
        );
        computedMultiData.value.splice(index, 1);
      } else if (response.status === 422) {
        // Assign error msg to data
        for (let errIdx = 0; errIdx < response.data.detail.length; errIdx++) {
          computedMultiData.value[index][
            `${response.data.detail[errIdx].loc[1]}_error`
          ] = response.data.detail[errIdx].msg;
        }
      } else {
        notificationStore.addWarn(response.data.detail);
      }
    })
    .catch((error) => {
      console.log(error);
      notificationStore.addWarn(error);
    });
}
</script>

<template>
  <tbody>
    <DataTableBodyRow
      v-for="(item, index) in multiData"
      :key="index"
      :selected="false"
    >
      <CreateItemTableButtonCreate @click="onCreate(index)" />
      <CreateItemTableButtonDelete @click="onDelete(index)" />
      <TableItemRowNumber :number="index + 1" />
      <CreateItemTableSelectProject
        v-model:value="item.project_id"
        v-model:width="computedColW.projectNumber"
        :error="item.project_id_error"
        :center="true"
      />
      <CreateItemTableInput
        :value="projectsStore.getProductNumber(item.project_id)"
        v-model:width="computedColW.productNumber"
        :center="true"
      />
      <CreateItemTableInput
        v-model:value="item.quantity"
        v-model:width="computedColW.quantity"
        :error="item.quantity_error"
        :center="true"
      />
      <CreateItemTableInput
        v-model:value="item.unit"
        v-model:width="computedColW.unit"
        :error="item.unit_error"
        :center="true"
      />
      <CreateItemTableInput
        v-model:value="item.weblink"
        v-model:width="computedColW.weblink"
        :error="item.weblink_error"
      />
      <CreateItemTableInput
        v-model:value="item.partnumber"
        v-model:width="computedColW.partnumber"
        :error="item.partnumber_error"
      />
      <CreateItemTableInput
        v-model:value="item.order_number"
        v-model:width="computedColW.orderNumber"
        :error="item.order_number_error"
      />
      <CreateItemTableInput
        v-model:value="item.manufacturer"
        v-model:width="computedColW.manufacturer"
        :error="item.manufacturer_error"
      />
      <CreateItemTableInput
        v-model:value="item.supplier"
        v-model:width="computedColW.supplier"
        :error="item.supplier_error"
      />
      <CreateItemTableInput
        v-model:value="item.group_1"
        v-model:width="computedColW.group1"
        :error="item.group1_error"
      />
      <CreateItemTableInput
        v-model:value="item.note_general"
        v-model:width="computedColW.noteGeneral"
        :error="item.note_general_error"
      />
      <CreateItemTableInput
        v-model:value="item.note_supplier"
        v-model:width="computedColW.noteSupplier"
        :error="item.note_supplier_error"
      />
      <CreateItemTableInput
        v-model:value="item.desired_delivery_date"
        v-model:width="computedColW.desiredDate"
        :error="item.desired_delivery_date_error"
        :center="true"
      />
      <TableItemEmpty />
    </DataTableBodyRow>
  </tbody>
</template>

<style lang="scss"></style>
