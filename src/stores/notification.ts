import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", () => {
  const info = ref<string>("");
  const warning = ref<string>("");

  function clearInfo() {
    info.value = "";
  }

  function clearWarning() {
    warning.value = "";
  }

  return { info, warning, clearInfo, clearWarning };
});