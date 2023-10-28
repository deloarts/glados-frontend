import { ref } from "vue";
import { defineStore } from "pinia"

export const useUnitsStore = defineStore('units', () => {
  const boughtItemUnits = ref({ default: "", values: []})

  return { boughtItemUnits }
})
