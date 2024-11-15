<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

import { useLanguageStore } from "@/stores/language";
import { useBoughtItemsStore } from "@/stores/boughtItems";
import { boughtItemsRequest } from "@/requests/items";

const languageStore = useLanguageStore();
const boughtItemsStore = useBoughtItemsStore();

const changelog = ref<Array<string>>([""]);

function fetchChangelog() {
  if (boughtItemsStore.getSelection().length > 0) {
    boughtItemsRequest
      .getItemsIdChangelog(boughtItemsStore.getSelection()[0])
      .then((response) => {
        changelog.value = response.data;
      });
  }
}

onMounted(() => fetchChangelog());

watch(
  () => boughtItemsStore.getSelection(),
  (newSelection: Array<number>, oldSelection: Array<number>) => {
    if (newSelection != oldSelection) {
      changelog.value = [];
      fetchChangelog();
    }
  },
);
</script>

<template>
  <div class="scope">
    <div v-if="boughtItemsStore.getSelection().length == 1" class="container">
      <h1>
        {{ languageStore.l.boughtItem.changelog.changelogOfItem }}
        {{ boughtItemsStore.getSelection()[0] }}
      </h1>
      <div v-for="log in changelog" class="changelog-item" v-bind:key="log">
        {{ log }}
      </div>
    </div>
    <div
      v-else-if="boughtItemsStore.getSelection().length > 1"
      class="container"
    >
      <h1>{{ languageStore.l.boughtItem.changelog.changelog }}</h1>
      <div class="changelog-item">
        {{ languageStore.l.boughtItem.changelog.tooManySelected }}d
      </div>
    </div>
    <div v-else class="container">
      <h1>{{ languageStore.l.boughtItem.changelog.changelog }}</h1>
      <div class="changelog-item">
        {{ languageStore.l.boughtItem.changelog.nothingSelected }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.scope {
  width: 100%;
  height: 200px;
  cursor: default;
}

.container {
  padding: 4px;
  margin: 4px;

  background-color: $main-background-color-dark;
  border-radius: $main-border-radius;

  height: 178px;
  overflow: auto;
}

h1 {
  font-family: "Play", "Calibri";
  font-size: 16px;
  font-weight: bold;

  margin: 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 5px;
}

.changelog-item {
  font-family: "Calibri";
  font-size: 14px;

  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 20px;

  white-space: pre-wrap;
}
</style>
