<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeMount } from 'vue'
//@ts-ignore
import moment from 'moment'
//@ts-ignore
import Toggle from '@vueform/toggle'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import { useUnitsStore } from '@/stores/units'
import { useProjectsStore } from '@/stores/projects'

import type { BoughtItemCreateSchema } from '@/schemas/boughtItem'
import type { AvailableOption } from '@/models/controls'

import SelectBase from '@/components/elements/SelectBase.vue'
import SelectProject from '@/components/elements/SelectProject.vue'

// Props & Emits
const props = defineProps<{
  formData: BoughtItemCreateSchema
}>()

const emit = defineEmits<{
  (e: 'update:formData', v: BoughtItemCreateSchema): void
}>()

// Computed
const createFormData = computed<BoughtItemCreateSchema>(() => props.formData)

// Stores
const languageStore = useLanguageStore()
const userStore = useUserStore()
const unitStore = useUnitsStore()
const projectsStore = useProjectsStore()

// Options
let availableOptionsProjects: Array<AvailableOption> = []

// Dates
const pickedDesiredDate = ref<Date | null>(null)
const formatDesiredDate = (pickedDesiredDate: Date) => {
  const day = pickedDesiredDate.getDate()
  const month = pickedDesiredDate.getMonth() + 1
  const year = pickedDesiredDate.getFullYear()
  return `${day}.${month}.${year}`
}

function setOptionsProjects() {
  var temp = []
  for (let i = 0; i < projectsStore.items.length; i++) {
    if (projectsStore.items[i].is_active) {
      temp.push({
        text: `${projectsStore.items[i].number} - ${projectsStore.items[i].customer} - ${projectsStore.items[i].description}`,
        value: String(projectsStore.items[i].id),
      })
    }
  }
  availableOptionsProjects = temp
}

// Form stuff
const name = ref('')

function buildPartnumber() {
  const partnumber =
    name.value +
    ' - ' +
    createFormData.value.order_number +
    ' - ' +
    createFormData.value.manufacturer
  let data = createFormData.value
  data.partnumber = partnumber
  emit('update:formData', data)
}

watch(
  () => createFormData,
  (current, previous) => {
    let data = createFormData.value
    if (data.desired_delivery_date != null && data.desired_delivery_date != undefined) {
      const date = Date.parse(String(data.desired_delivery_date))
      pickedDesiredDate.value = new Date(date)
    }
    buildPartnumber()
    emit('update:formData', data)
  },
  { deep: true },
)

watch(name, () => {
  buildPartnumber()
})

watch(pickedDesiredDate, () => {
  let data = createFormData.value
  if (pickedDesiredDate.value instanceof Date) {
    //@ts-ignore
    data.desired_delivery_date = moment(pickedDesiredDate.value).format('YYYY-MM-DD')
  } else {
    data.desired_delivery_date = null
  }
  emit('update:formData', data)
})

watch(
  () => projectsStore.$state,
  () => {
    setOptionsProjects()
  },
  { deep: true },
)

onBeforeMount(setOptionsProjects)

onMounted(() => {
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
          <SelectProject
            v-model:selection="createFormData.project_id"
            :options-active="availableOptionsProjects"
            :options-inactive="[]"
          />
        </div>
        <div id="product-number" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-bind:value="projectsStore.getProductNumber(createFormData.project_id)"
            :placeholder="languageStore.l.boughtItem.input.productNumberPlaceholder"
            readonly
          />
        </div>
        <div id="quantity" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.quantity"
            type="number"
            :placeholder="languageStore.l.boughtItem.input.quantityPlaceholder"
          />
        </div>
        <div id="unit" class="grid-item-center">
          <SelectBase
            v-model:selection="createFormData.unit"
            :options="unitStore.boughtItemUnits.values"
          />
        </div>
        <div id="name" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="name"
            :placeholder="languageStore.l.boughtItem.input.namePlaceholder"
          />
        </div>
        <div id="order-number" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.order_number"
            :placeholder="languageStore.l.boughtItem.input.orderNumberPlaceholder"
          />
        </div>
        <div id="manufacturer" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.manufacturer"
            :placeholder="languageStore.l.boughtItem.input.manufacturerPlaceholder"
          />
        </div>
        <div id="supplier" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.supplier"
            :placeholder="languageStore.l.boughtItem.input.supplierPlaceholder"
          />
        </div>
        <div id="group" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.group_1"
            :placeholder="languageStore.l.boughtItem.input.group1Placeholder"
          />
        </div>
        <div id="weblink" class="grid-item-center">
          <input
            class="form-base-text-input"
            v-model="createFormData.weblink"
            :placeholder="languageStore.l.boughtItem.input.weblinkPlaceholder"
          />
        </div>
        <div id="desired" class="grid-item-center">
          <Datepicker
            class="form-base-date-input"
            v-model="pickedDesiredDate"
            :format="formatDesiredDate"
            :clearable="true"
            :placeholder="languageStore.l.boughtItem.input.desiredDatePlaceholder"
            :dark="userStore.user.theme == 'dark'"
          />
        </div>
        <div id="note-general" class="grid-item-center">
          <textarea
            class="form-base-text-input-multiline"
            v-model="createFormData.note_general"
            :placeholder="languageStore.l.boughtItem.input.noteGeneralPlaceholder"
          ></textarea>
        </div>
        <div id="note-supplier" class="grid-item-center">
          <textarea
            class="form-base-text-input-multiline"
            v-model="createFormData.note_supplier"
            :placeholder="languageStore.l.boughtItem.input.noteSupplierPlaceholder"
          ></textarea>
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
  grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 25px 25px;
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
    'notify notify-text notify-text notify-text'
    'priority priority-text priority-text priority-text';
}

@media screen and (max-width: $max-width-desktop) {
  #grid {
    grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 120px 120px 25px 25px;
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
      'notify notify-text notify-text'
      'priority priority-text priority-text';
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
  padding-top: 10px;
  padding-bottom: 10px;
}

#note-supplier {
  grid-area: note-supplier;
  padding-top: 10px;
  padding-bottom: 15px;
}
</style>
