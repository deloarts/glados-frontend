import { ref } from "vue";
import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", () => {
  const boughtItemStatus = ref({});

  return { boughtItemStatus };
});
