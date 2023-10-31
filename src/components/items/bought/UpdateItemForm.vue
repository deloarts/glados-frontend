<script setup>
import { ref, watch } from "vue"
import moment from "moment"

import { useUnitsStore } from "@/stores/units.js"

import SelectNewUpdate from "@/components/elements/SelectNewUpdate.vue"

import Toggle from "@vueform/toggle"
import Datepicker from "@vuepic/vue-datepicker"
import '@vuepic/vue-datepicker/dist/main.css'

// Props & Emits
const props = defineProps(["formData"])
const emit = defineEmits(["update:formData"])

// Stores
const unitStore = useUnitsStore()

// Dates
const pickedDesiredDate = ref()
const formatDesiredDate = (pickedDesiredDate) => {
  const day = pickedDesiredDate.getDate()
  const month = pickedDesiredDate.getMonth() + 1
  const year = pickedDesiredDate.getFullYear()
  return `${day}.${month}.${year}`
}

// Form stuff
let highPriority = false

watch(props.formData, () => {
  let data = props.formData
  if (data.desired_delivery_date != null && data.desired_delivery_date != undefined) {
    const date = Date.parse(String(data.desired_delivery_date))
    pickedDesiredDate.value = new Date(date)
  }
  emit("update:formData", data)
}, { deep: true })

watch(pickedDesiredDate, () => {
  let data = props.formData
  if (pickedDesiredDate.value instanceof Date) {
    data.desired_delivery_date = moment(pickedDesiredDate.value).format("YYYY-MM-DD")
  } else {
    data.desired_delivery_date = null
  }
  emit("update:formData", data)
})
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div id="grid">
        <div id="project" class="grid-item-center">
          <input class="form-base-text-input" v-model="props.formData.project" placeholder="Project *">
        </div>
        <div id="machine" class="grid-item-center">
          <input class="form-base-text-input" v-model="props.formData.machine" placeholder="Machine">
        </div>
        <div id="quantity" class="grid-item-center">
          <input class="form-base-text-input" v-model="props.formData.quantity" type="number" placeholder="Quantity *">
        </div>
        <div id="unit" class="grid-item-center">
            <SelectNewUpdate v-model:selection="formData.unit" :options="unitStore.boughtItemUnits.values"/>
        </div>
        <div id="partnumber" class="grid-item-center">
          <input class="form-base-text-input" v-model="props.formData.partnumber" placeholder="Partnumber *">
        </div>
        <div id="definition" class="grid-item-center">
          <input class="form-base-text-input" v-model="props.formData.definition" placeholder="Definition *">
        </div>
        <div id="manufacturer" class="grid-item-center">
          <input class="form-base-text-input" v-model="props.formData.manufacturer" placeholder="Manufacturer *">
        </div>
        <div id="supplier" class="grid-item-center">
          <input class="form-base-text-input" v-model="props.formData.supplier" placeholder="Supplier">
        </div>
        <div id="desired" class="grid-item-center">
          <Datepicker class="form-base-date-input" v-model="pickedDesiredDate" :format="formatDesiredDate" :clearable="true"
            placeholder="Desired Delivery Date" dark />
        </div>
        <div id="note-general" class="grid-item-center">
          <textarea class="form-base-text-input-multiline" v-model="props.formData.note_general" placeholder="Note"></textarea>
        </div>
        <div id="note-supplier" class="grid-item-center">
          <textarea class="form-base-text-input-multiline" v-model="props.formData.note_supplier"
            placeholder="Note Supplier"></textarea>
        </div>
        <div id="notify" class="grid-item-center">
          <Toggle v-model="props.formData.notify_on_delivery"></Toggle>
        </div>
        <div id="notify-text" class="grid-item-left">
          Notify me on delivery
        </div>
        <div id="priority" class="grid-item-center">
          <Toggle v-model="props.formData.high_priority"></Toggle>
        </div>
        <div id="priority-text" class="grid-item-left">
          High priority
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/form/formBase.scss';
@import '@/scss/grid/gridBase.scss';

#grid {
  grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 25px 25px;
  grid-template-columns: 50px 200px 150px 450px;
  grid-template-areas: "project project project note-general"
    "machine machine machine note-general"
    "quantity quantity unit note-general"
    "partnumber partnumber partnumber note-general"
    "definition definition definition note-supplier"
    "manufacturer manufacturer manufacturer note-supplier"
    "supplier supplier supplier note-supplier"
    "desired desired desired note-supplier"
    "notify notify-text notify-text notify-text"
    "priority priority-text priority-text priority-text"
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

#machine {
  grid-area: machine;
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

#definition {
  grid-area: definition;
}

#manufacturer {
  grid-area: manufacturer;
}

#supplier {
  grid-area: supplier;
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
  padding-bottom: 10px;
}
</style>