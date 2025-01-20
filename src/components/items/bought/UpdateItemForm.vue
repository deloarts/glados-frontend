<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import Toggle from '@vueform/toggle'

import config from '@/config'
import { useLanguageStore } from '@/stores/language'
import { useUnitsStore } from '@/stores/units'
import { useProjectsStore } from '@/stores/projects'

import LabeledInput from '@/components/elements/LabeledInput.vue'
import LabeledTextarea from '@/components/elements/LabeledTextarea.vue'
import LabeledSelect from '@/components/elements/LabeledSelect.vue'
import LabeledDatepicker from '@/components/elements/LabeledDatepicker.vue'

import type { BoughtItemUpdateSchema } from '@/schemas/boughtItem'
import type { AvailableOption } from '@/models/controls'

// Props & Emits
const props = defineProps<{
  formData: BoughtItemUpdateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: BoughtItemUpdateSchema): void
}>()

// Computed
const updateFormData = computed<BoughtItemUpdateSchema>(() => props.formData)
const namePlaceholder = computed<string>(() => {
  if (config.items.displayPartnumberAsName) {
    return languageStore.l.boughtItem.input.namePlaceholder
  } else {
    return languageStore.l.boughtItem.input.partnumberPlaceholder
  }
})

// Stores
const languageStore = useLanguageStore()
const unitStore = useUnitsStore()
const projectsStore = useProjectsStore()

// Options
const availableOptionsProjects = ref<Array<AvailableOption>>([])
const availableOptionsProjectsInactive = ref<Array<AvailableOption>>([])

function setOptionsProjects() {
  projectsStore.getAll().then(() => {
    const tempActive = []
    const tempInactive = []
    for (let i = 0; i < projectsStore.all.length; i++) {
      if (projectsStore.all[i].is_active) {
        tempActive.push({
          text: `${projectsStore.all[i].number} - ${projectsStore.all[i].customer} - ${projectsStore.all[i].description}`,
          value: String(projectsStore.all[i].id),
        })
      } else {
        tempInactive.push({
          text: `${projectsStore.all[i].number} - ${projectsStore.all[i].customer} - ${projectsStore.all[i].description}`,
          value: String(projectsStore.all[i].id),
        })
      }
    }
    availableOptionsProjects.value = tempActive
    availableOptionsProjectsInactive.value = tempInactive
  })
}

watch(
  () => updateFormData,
  () => {
    const data = updateFormData.value
    emit('update:formData', data)
  },
  { deep: true },
)

onMounted(() => {
  setOptionsProjects()
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div class="grid">
        <div id="project" class="grid-item-center">
          <LabeledSelect
            v-if="projectsStore.getProjectByID(updateFormData.project_id)?.is_active"
            v-model:value="updateFormData.project_id"
            v-model:options="availableOptionsProjects"
            :placeholder="languageStore.l.boughtItem.input.projectNumberPlaceholder"
            :required="true"
          />
          <LabeledInput
            v-else
            :value="projectsStore.getProjectByID(updateFormData.project_id)?.number"
            :placeholder="languageStore.l.boughtItem.input.projectNumberPlaceholder"
            :disabled="true"
            :required="true"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <LabeledInput
            :value="projectsStore.getProductNumber(updateFormData.project_id)"
            :placeholder="languageStore.l.boughtItem.input.productNumberPlaceholder"
            :disabled="true"
          />
        </div>
        <div id="quantity" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.quantity"
            :placeholder="languageStore.l.boughtItem.input.quantityPlaceholder"
            :required="true"
            type="number"
          />
        </div>
        <div id="unit" class="grid-item-center">
          <LabeledSelect
            v-model:value="updateFormData.unit"
            v-bind:options="
              unitStore.boughtItemUnits.values.map((value) => ({ text: value, value }))
            "
            :placeholder="languageStore.l.boughtItem.input.unitPlaceholder"
          />
        </div>
        <div id="partnumber" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.partnumber"
            :placeholder="namePlaceholder"
            :required="true"
          />
        </div>
        <div id="order-number" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.order_number"
            :placeholder="languageStore.l.boughtItem.input.orderNumberPlaceholder"
            :required="true"
          />
        </div>
        <div id="manufacturer" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.manufacturer"
            :placeholder="languageStore.l.boughtItem.input.manufacturerPlaceholder"
            :required="true"
          />
        </div>
        <div id="supplier" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.supplier"
            :placeholder="languageStore.l.boughtItem.input.supplierPlaceholder"
          />
        </div>
        <div id="group" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.group_1"
            :placeholder="languageStore.l.boughtItem.input.group1Placeholder"
          />
        </div>
        <div id="weblink" class="grid-item-center">
          <LabeledInput
            v-model:value="updateFormData.weblink"
            :placeholder="languageStore.l.boughtItem.input.weblinkPlaceholder"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <LabeledDatepicker
            v-model:value="updateFormData.desired_delivery_date"
            :placeholder="languageStore.l.boughtItem.input.desiredDatePlaceholder"
          />
        </div>
        <div id="note-general" class="grid-item-center">
          <LabeledTextarea
            v-model:value="updateFormData.note_general"
            :placeholder="languageStore.l.boughtItem.input.noteGeneralPlaceholder"
          />
        </div>
        <div id="note-supplier" class="grid-item-center">
          <LabeledTextarea
            v-model:value="updateFormData.note_supplier"
            :placeholder="languageStore.l.boughtItem.input.noteSupplierPlaceholder"
          />
        </div>
        <div id="notify" class="grid-item-center">
          <Toggle v-model="updateFormData.notify_on_delivery"></Toggle>
        </div>
        <div id="notify-text" class="grid-item-left">
          {{ languageStore.l.boughtItem.toggle.notifyOnDelivery }}
        </div>
        <div id="priority" class="grid-item-center">
          <Toggle v-model="updateFormData.high_priority"></Toggle>
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

.grid {
  grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 25px 25px;
  grid-template-columns: 50px 350px 150px 620px;
  grid-template-areas:
    'project project project note-general'
    'product-number product-number product-number note-general'
    'quantity quantity unit note-general'
    'partnumber partnumber partnumber note-general'
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
  .grid {
    grid-template-rows: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px 120px 120px 25px 25px;
    grid-template-columns: 50px auto 150px;
    grid-template-areas:
      'project project project'
      'product-number product-number product-number'
      'quantity quantity unit'
      'partnumber partnumber partnumber'
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
