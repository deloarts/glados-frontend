<script setup lang="ts">
import { computed } from "vue"

import { useLanguageStore } from '@/stores/language'

import InputPlaceholder from '@/components/elements/InputPlaceholder.vue';
import TextareaPlaceholder from "@/components/elements/TextareaPlaceholder.vue";
import type { BoughtItemSchema } from '@/schemas/boughtItem'

// Props & Emits
const props = defineProps<{
  itemData: BoughtItemSchema
}>()

// Stores
const languageStore = useLanguageStore()

// Computed
const quantityUnit = computed<string>(() => {
  return `${props.itemData.quantity} ${props.itemData.unit}`
})

</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div class="grid">
        <div id="project" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.project_number"
            :placeholder="languageStore.l.boughtItem.input.projectNumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.product_number"
            :placeholder="languageStore.l.boughtItem.input.productNumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="quantity" class="grid-item-center">
          <InputPlaceholder
            :value="quantityUnit"
            :placeholder="languageStore.l.boughtItem.input.quantityPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="partnumber" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.partnumber"
            :placeholder="languageStore.l.boughtItem.input.partnumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="order-number" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.order_number"
            :placeholder="languageStore.l.boughtItem.input.orderNumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="manufacturer" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.manufacturer"
            :placeholder="languageStore.l.boughtItem.input.manufacturerPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="supplier" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.supplier"
            :placeholder="languageStore.l.boughtItem.input.supplierPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="group" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.group_1"
            :placeholder="languageStore.l.boughtItem.input.group1Placeholder"
            :disabled="true"
          />
        </div>
        <div id="weblink" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.weblink"
            :placeholder="languageStore.l.boughtItem.input.weblinkPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <InputPlaceholder
            :value="props.itemData.desired_delivery_date"
            :placeholder="languageStore.l.boughtItem.input.desiredDatePlaceholder"
            :disabled="true"
          />
        </div>
        <div id="note-general" class="grid-item-center">
          <TextareaPlaceholder
            :value="props.itemData.note_general"
            :placeholder="languageStore.l.boughtItem.input.noteGeneralPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="note-supplier" class="grid-item-center">
          <TextareaPlaceholder
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
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;
  grid-template-columns: 50px 350px 150px 620px;
  grid-template-areas:
    'project project project note-general'
    'product-number product-number product-number note-general'
    'quantity quantity quantity note-general'
    'partnumber partnumber partnumber note-general'
    'order-number order-number order-number note-general'
    'manufacturer manufacturer manufacturer note-supplier'
    'supplier supplier supplier note-supplier'
    'group group group note-supplier'
    'weblink weblink weblink note-supplier'
    'desired desired desired note-supplier';
}

@media screen and (max-width: $max-width-desktop) {
  .grid {
    grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 120px 120px;
    grid-template-columns: 50px auto 150px;
    grid-template-areas:
      'project project project'
      'product-number product-number product-number'
      'quantity quantity quantity'
      'partnumber partnumber partnumber'
      'order-number order-number order-number'
      'manufacturer manufacturer manufacturer'
      'supplier supplier supplier'
      'group group group'
      'weblink weblink weblink'
      'desired desired desired'
      'note-general note-general note-general'
      'note-supplier note-supplier note-supplier';
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
}

#note-supplier {
  grid-area: note-supplier;
}
</style>
