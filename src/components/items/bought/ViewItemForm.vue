<script setup lang="ts">
import { computed } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { useUsersStore } from '@/stores/user'
import { capitalizeFirstLetter } from '@/helper/string.helper'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledTextarea from '@/components/elements/LabeledTextarea.vue'
import ButtonOpenLink from '@/components/elements/ButtonOpenLink.vue'

import type { BoughtItemSchema } from '@/schemas/boughtItem'

// Props & Emits
const props = defineProps<{
  itemData: BoughtItemSchema
}>()

// Stores
const languageStore = useLanguageStore()
const usersStore = useUsersStore()

// Computed
const quantityUnit = computed<string>(() => {
  return `${props.itemData.quantity} ${props.itemData.unit}`
})

function openLink() {
  if (props.itemData.weblink) {
    window.open(props.itemData.weblink, '_blank')
  }
}
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container form-base-container-bottom-space">
      <div class="grid">
        <div id="status" class="grid-item-center">
          <LabeledInput
            :value="capitalizeFirstLetter(props.itemData.status)"
            :placeholder="languageStore.l.boughtItem.input.statusPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="project" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.project_number"
            :placeholder="languageStore.l.boughtItem.input.projectNumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.product_number"
            :placeholder="languageStore.l.boughtItem.input.productNumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="quantity" class="grid-item-center">
          <LabeledInput
            :value="quantityUnit"
            :placeholder="languageStore.l.boughtItem.input.quantityPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="partnumber" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.partnumber"
            :placeholder="languageStore.l.boughtItem.input.partnumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="order-number" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.order_number"
            :placeholder="languageStore.l.boughtItem.input.orderNumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="manufacturer" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.manufacturer"
            :placeholder="languageStore.l.boughtItem.input.manufacturerPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="supplier" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.supplier"
            :placeholder="languageStore.l.boughtItem.input.supplierPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="group" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.group_1"
            :placeholder="languageStore.l.boughtItem.input.group1Placeholder"
            :disabled="true"
          />
        </div>
        <div id="weblink" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.weblink"
            :placeholder="languageStore.l.boughtItem.input.weblinkPlaceholder"
            :disabled="true"
          />
          <ButtonOpenLink text="" @click="openLink" class="button-open-link" />
        </div>
        <div id="weblink-button" class="grid-item-center"></div>
        <div id="created" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.created"
            :placeholder="languageStore.l.boughtItem.input.createdDate"
            :disabled="true"
          />
        </div>
        <div id="creator" class="grid-item-center">
          <LabeledInput
            :value="usersStore.getNameByID(props.itemData.creator_id)"
            :placeholder="languageStore.l.boughtItem.input.creator"
            :disabled="true"
          />
        </div>
        <div id="ordered" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.ordered_date"
            :placeholder="languageStore.l.boughtItem.input.orderedDate"
            :disabled="true"
          />
        </div>
        <div id="orderer" class="grid-item-center">
          <LabeledInput
            :value="usersStore.getNameByID(props.itemData.orderer_id)"
            :placeholder="languageStore.l.boughtItem.input.orderer"
            :disabled="true"
          />
        </div>
        <div id="delivered" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.delivery_date"
            :placeholder="languageStore.l.boughtItem.input.deliveryDate"
            :disabled="true"
          />
        </div>
        <div id="receiver" class="grid-item-center">
          <LabeledInput
            :value="usersStore.getNameByID(props.itemData.receiver_id)"
            :placeholder="languageStore.l.boughtItem.input.receiver"
            :disabled="true"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.desired_delivery_date"
            :placeholder="languageStore.l.boughtItem.input.desiredDatePlaceholder"
            :disabled="true"
          />
        </div>
        <div id="expected" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.expected_delivery_date"
            :placeholder="languageStore.l.boughtItem.input.expectedDatePlaceholder"
            :disabled="true"
          />
        </div>
        <div id="storage" class="grid-item-center">
          <LabeledInput
            :value="props.itemData.storage_place"
            :placeholder="languageStore.l.boughtItem.input.storage"
            :disabled="true"
          />
        </div>
        <div id="note-general" class="grid-item-center">
          <LabeledTextarea
            :value="props.itemData.note_general"
            :placeholder="languageStore.l.boughtItem.input.noteGeneralPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="note-supplier" class="grid-item-center">
          <LabeledTextarea
            :value="props.itemData.note_supplier"
            :placeholder="languageStore.l.boughtItem.input.noteSupplierPlaceholder"
            :disabled="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/variables.scss' as *;
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

.grid {
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-template-columns: 400px 400px auto;
  grid-template-areas:
    'status quantity group'
    'project product-number note-general'
    'partnumber partnumber note-general'
    'order-number order-number note-general'
    'manufacturer supplier note-general'
    'weblink weblink note-general'
    'desired expected note-supplier'
    'created creator note-supplier'
    'ordered orderer note-supplier'
    'delivered receiver note-supplier'
    'storage storage note-supplier';
}

@media screen and (max-width: $max-width-desktop) {
  .grid {
    grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 120px 120px;
    grid-template-columns: auto;
    grid-template-areas:
      'status'
      'project'
      'product-number'
      'quantity'
      'partnumber'
      'order-number'
      'manufacturer'
      'supplier'
      'group'
      'weblink'
      'creator'
      'created'
      'orderer'
      'ordered'
      'receiver'
      'delivered'
      'desired'
      'expected'
      'storage'
      'note-general'
      'note-supplier';
  }
}

.button-open-link {
  height: 38px;

  margin-top: 18px;
  margin-right: 6px;

  border-color: var(--input-border-color);
}

#status {
  grid-area: status;
}

#creator {
  grid-area: creator;
}

#created {
  grid-area: created;
}

#orderer {
  grid-area: orderer;
}

#ordered {
  grid-area: ordered;
}

#receiver {
  grid-area: receiver;
}

#storage {
  grid-area: storage;
}

#delivered {
  grid-area: delivered;
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

#expected {
  grid-area: expected;
}

#note-general {
  grid-area: note-general;
}

#note-supplier {
  grid-area: note-supplier;
}
</style>
