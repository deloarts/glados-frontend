<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

import { useBoughtItemsStore } from "@/stores/boughtItems";
import { boughtItemsRequest } from "@/requests/items";

const boughtItemsStore = useBoughtItemsStore();

const changelog = ref<Array<string>>([""]);

function fetchChangelog() {
  if (boughtItemsStore.selectedIDs.length > 0) {
    boughtItemsRequest
      .getItemsIdChangelog(boughtItemsStore.selectedIDs[0])
      .then((response) => {
        changelog.value = response.data;
      });
  }
}

onMounted(() => fetchChangelog());

watch(
  () => boughtItemsStore.selectedIDs,
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
    <div v-if="boughtItemsStore.selectedIDs.length > 0" class="container">
      <h1>Changelog of item #{{ boughtItemsStore.selectedIDs[0] }}</h1>
      <div v-for="log in changelog" class="changelog-item">{{ log }}</div>
    </div>
    <div v-else class="container">
      <h1>Changelog</h1>
      <div class="changelog-item">No item selected</div>
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
  font-family: "Play", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.25em;
  margin: 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 5px;
}

.changelog-item {
  margin: 0;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 20px;

  white-space: pre-wrap;
}
</style>
