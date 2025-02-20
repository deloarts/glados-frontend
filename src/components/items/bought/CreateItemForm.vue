<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeMount } from 'vue'
import Toggle from '@vueform/toggle'

import config from '@/config'
import { useLanguageStore } from '@/stores/language'
import { useUnitsStore } from '@/stores/units'
import { useProjectsStore } from '@/stores/projects'

import type { BoughtItemCreateSchema } from '@/schemas/boughtItem'
import type { AvailableOption } from '@/models/controls'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledTextarea from '@/components/elements/LabeledTextarea.vue'
import LabeledSelect from '@/components/elements/LabeledSelect.vue'
import LabeledDatepicker from '@/components/elements/LabeledDatepicker.vue'

// Props & Emits
const props = defineProps<{
  formData: BoughtItemCreateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: BoughtItemCreateSchema): void
}>()

// Computed
const createFormData = computed<BoughtItemCreateSchema>(() => props.formData)
const namePlaceholder = computed<string>(() => {
  if (config.items.displayPartnumberAsName) {
    return languageStore.l.boughtItem.input.namePlaceholder
  } else if (config.items.nameIsPartnumber) {
    return languageStore.l.boughtItem.input.partnumberPlaceholder
  } else {
    return languageStore.l.boughtItem.input.namePlaceholder
  }
})

// Stores
const languageStore = useLanguageStore()
const unitStore = useUnitsStore()
const projectsStore = useProjectsStore()

// Options
const availableOptionsProjects = ref<Array<AvailableOption>>([])

function setOptionsProjects() {
  projectsStore.getAll().then(() => {
    const temp = []
    for (let i = 0; i < projectsStore.all.length; i++) {
      if (projectsStore.all[i].is_active) {
        temp.push({
          text: `${projectsStore.all[i].number} - ${projectsStore.all[i].customer} - ${projectsStore.all[i].description}`,
          value: String(projectsStore.all[i].id),
        })
      }
    }
    availableOptionsProjects.value = temp
  })
}

// Form stuff
const itemName = ref('')

function buildPartnumber() {
  let partnumber = ''
  if (config.items.nameIsPartnumber) {
    partnumber = itemName.value
  } else {
    partnumber =
      itemName.value +
      ' - ' +
      createFormData.value.order_number +
      ' - ' +
      createFormData.value.manufacturer
  }

  const data = createFormData.value
  data.partnumber = partnumber

  emit('update:formData', data)
}

watch(
  () => createFormData,
  () => {
    const data = createFormData.value
    buildPartnumber()
    emit('update:formData', data)
  },
  { deep: true },
)

watch(itemName, () => {
  buildPartnumber()
})

onBeforeMount(() => {})

onMounted(() => {
  setOptionsProjects()
  if (unitStore.boughtItemUnits.default) {
    createFormData.value.unit = unitStore.boughtItemUnits.default
  }
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="project" class="grid-item-center">
          <LabeledSelect
            v-model:value="createFormData.project_id"
            v-model:options="availableOptionsProjects"
            :placeholder="languageStore.l.boughtItem.input.projectNumberPlaceholder"
            :required="true"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <LabeledInput
            :value="projectsStore.getProductNumber(createFormData.project_id)"
            :placeholder="languageStore.l.boughtItem.input.productNumberPlaceholder"
            :disabled="true"
            :tooltip="languageStore.l.tooltips.productNumberIsFromProject"
          />
        </div>
        <div id="quantity" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.quantity"
            :placeholder="languageStore.l.boughtItem.input.quantityPlaceholder"
            :required="true"
            type="number"
          />
        </div>
        <div id="unit" class="grid-item-center">
          <LabeledSelect
            v-model:value="createFormData.unit"
            v-bind:options="
              unitStore.boughtItemUnits.values.map((value) => ({ text: value, value }))
            "
            :placeholder="languageStore.l.boughtItem.input.unitPlaceholder"
          />
        </div>
        <div id="name" class="grid-item-center">
          <LabeledInput v-model:value="itemName" :placeholder="namePlaceholder" :required="true" />
        </div>
        <div id="order-number" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.order_number"
            :placeholder="languageStore.l.boughtItem.input.orderNumberPlaceholder"
            :required="true"
          />
        </div>
        <div id="manufacturer" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.manufacturer"
            :placeholder="languageStore.l.boughtItem.input.manufacturerPlaceholder"
            :required="true"
          />
        </div>
        <div id="supplier" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.supplier"
            :placeholder="languageStore.l.boughtItem.input.supplierPlaceholder"
          />
        </div>
        <div id="group" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.group_1"
            :placeholder="languageStore.l.boughtItem.input.group1Placeholder"
          />
        </div>
        <div id="weblink" class="grid-item-center">
          <LabeledInput
            v-model:value="createFormData.weblink"
            :placeholder="languageStore.l.boughtItem.input.weblinkPlaceholder"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="createFormData.desired_delivery_date"
            :placeholder="languageStore.l.boughtItem.input.desiredDatePlaceholder"
            :return-as-date="true"
          />
        </div>
        <div id="note-general" class="grid-item-center">
          <LabeledTextarea
            v-model:value="createFormData.note_general"
            :placeholder="languageStore.l.boughtItem.input.noteGeneralPlaceholder"
          />
        </div>
        <div id="note-supplier" class="grid-item-center">
          <LabeledTextarea
            v-model:value="createFormData.note_supplier"
            :placeholder="languageStore.l.boughtItem.input.noteSupplierPlaceholder"
          />
        </div>
        <div id="notify" class="grid-item-center">
          <Toggle v-model="createFormData.notify_on_delivery"></Toggle>
        </div>
        <div id="notify-text" class="grid-item-left">
          {{ languageStore.l.boughtItem.toggle.notifyOnDelivery }}
        </div>
        <div id="priority" class="grid-item-center">
          <Toggle v-model="createFormData.high_priority"></Toggle>
        </div>
        <div id="priority-text" class="grid-item-left">
          {{ languageStore.l.boughtItem.toggle.highPriority }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/variables.scss' as *;
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 10px 25px 25px;
  grid-template-columns: 50px 350px 150px 620px;
  grid-template-areas:
    'project project project note-general'
    'product-number product-number product-number note-general'
    'quantity quantity unit note-general'
    'name name name note-general'
    'order-number order-number order-number note-general'
    'manufacturer manufacturer manufacturer note-supplier'
    'supplier supplier supplier note-supplier'
    'group group group note-supplier'
    'weblink weblink weblink note-supplier'
    'desired desired desired note-supplier'
    'empty empty empty empty'
    'notify notify-text notify-text notify-text'
    'priority priority-text priority-text priority-text';
}

@media screen and (max-width: $max-width-desktop) {
  #grid {
    grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 120px 120px 10px 25px 25px;
    grid-template-columns: 50px auto 150px;
    grid-template-areas:
      'project project project'
      'product-number product-number product-number'
      'quantity quantity unit'
      'name name name'
      'order-number order-number order-number'
      'manufacturer manufacturer manufacturer'
      'supplier supplier supplier'
      'group group group'
      'weblink weblink weblink'
      'desired desired desired'
      'note-general note-general note-general'
      'note-supplier note-supplier note-supplier'
      'empty empty empty'
      'notify notify-text notify-text'
      'priority priority-text priority-text';
  }
}

#empty {
  grid-area: empty;
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

#name {
  grid-area: name;
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
