import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia"

export const useBoughtItemFilterStore = defineStore('boughtItemFilter', () => {
  const limit = ref("100")
  const ignoreDelivered = ref(false)
  const ignoreCanceled = ref(false)
  const ignoreLost = ref(false)
  const highPriority = ref(null)
  const creatorId = ref("")
  const createdDate = ref("")
  const changedDateFrom = ref("")
  const desiredDate = ref("")
  const requesterId = ref("")
  const requestedDate = ref("")
  const ordererId = ref("")
  const orderedDate = ref("")
  const expectedDate = ref("")
  const deliveredDate = ref("")
  const sortBy = ref("id")
  const id = ref("")
  const status = ref("")
  const project = ref("")
  const machine = ref("")
  const quantity = ref("")
  const unit = ref("")
  const partnumber = ref("")
  const definition = ref("")
  const manufacturer = ref("")
  const supplier = ref("")
  const group1 = ref("")
  const noteGeneral = ref("")
  const noteSupplier = ref("")
  const storagePlace = ref("")
  const takeOverId = ref("")

  function reset() {
    limit.value = "100"
    ignoreDelivered.value = false
    ignoreCanceled.value = false
    ignoreLost.value = false
    highPriority.value = null
    creatorId.value = ""
    createdDate.value = ""
    changedDateFrom.value = ""
    desiredDate.value = ""
    requesterId.value = ""
    requestedDate.value = ""
    ordererId.value = ""
    orderedDate.value = ""
    expectedDate.value = ""
    deliveredDate.value = ""
    sortBy.value = "id"
    id.value = ""
    status.value = ""
    project.value = ""
    machine.value = ""
    quantity.value = ""
    unit.value = ""
    partnumber.value = ""
    definition.value = ""
    manufacturer.value = ""
    supplier.value = ""
    group1.value = ""
    noteGeneral.value = ""
    noteSupplier.value = ""
    storagePlace.value = ""
    takeOverId.value = ""
    console.log("Reset bought items filter")
  }

  function allOpen() {
    reset()
    limit.value = ""
    sortBy.value = "high_priority,project,supplier,manufacturer"
    status.value = "open"
    console.log("Set filter to all open")
  }

  function allRequested() {
    reset()
    limit.value = ""
    sortBy.value = "high_priority,project,supplier,manufacturer"
    status.value = "requested"
    console.log("Set filter to all requested")
  }

  function allOrdered() {
    reset()
    limit.value = ""
    sortBy.value = "high_priority,project,supplier,manufacturer"
    status.value = "ordered"
    console.log("Set filter to all ordered")
  }

  function allActive() {
    reset()
    limit.value = ""
    ignoreDelivered.value = true
    ignoreCanceled.value = true
    ignoreLost.value = true
    sortBy.value = "high_priority,project,supplier,manufacturer"
    console.log("Set filter to all active")
  }

  function allPrioritized() {
    reset()
    limit.value = ""
    ignoreDelivered.value = true
    ignoreCanceled.value = true
    ignoreLost.value = true
    highPriority.value = true
    sortBy.value = "project,supplier,manufacturer"
    console.log("Set filter to all prioritized")
  }

  return { limit, ignoreDelivered, ignoreCanceled, ignoreLost, highPriority, creatorId, createdDate, changedDateFrom, desiredDate, requesterId, requestedDate, ordererId, orderedDate, expectedDate, deliveredDate, sortBy, id, status, project, machine, quantity, unit, partnumber, definition, manufacturer, supplier, group1, noteGeneral, noteSupplier, storagePlace, takeOverId, reset, allOpen, allRequested, allOrdered, allActive, allPrioritized }
})