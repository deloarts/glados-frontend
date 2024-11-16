import { ref, watch, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import type { AvailableOption } from "@/models/controls";
import type { Language } from "@/models/language";

import { enGB } from "@/presets/language/en-gb";
import { deAT } from "@/presets/language/de-at";

export const useLanguageStore = defineStore("language", () => {
  const l = ref<Language>();
  const selected = ref<string>();
  const languageOptions = ref<Array<AvailableOption>>([
    { text: "English", value: "enGB" },
    { text: "German", value: "deAT" },
  ]);

  function apply(lang: "enGB" | "deAT") {
    selected.value = lang;
    if (lang == "enGB") {
      l.value = enGB;
      document.documentElement.lang = "en";
    } else if (lang == "deAT") {
      l.value = deAT;
      document.documentElement.lang = "de";
    } else {
      selected.value = "enGB";
      l.value = enGB;
      document.documentElement.lang = "en";
    }
  }

  watch(
    selected,
    () => {
      localStorage.setItem(
        "gladosSelectedLanguage",
        JSON.stringify(selected.value),
      );
    },
    { deep: true },
  );

  onBeforeMount(() => {
    apply("deAT");
    setInterval(() => {
      if (selected.value == "enGB") {
        apply("deAT");
      } else {
        apply("enGB");
      }
    }, 1000);
    return;

    const lsSelected = localStorage.getItem("gladosSelectedLanguage");

    if (lsSelected != null) {
      selected.value = lsSelected;
    } else {
      selected.value = "enGB";
    }
    // @ts-ignore
    apply(selected.value);
  });

  return { l, languageOptions, apply };
});
