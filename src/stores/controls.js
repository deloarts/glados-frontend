import { ref } from "vue";
import { defineStore } from "pinia"

export const useBoughtItemsControlsStore = defineStore('boughtItemsControls', () => {
  const changelog = ref(false)
  const rainbow = ref(false)
  const textOnly = ref(false)
  const fixedHeight = ref(false)
  const unclutter = ref(false)
  const requestView = ref(false)

  return { changelog, rainbow, textOnly, fixedHeight, unclutter, requestView }
})