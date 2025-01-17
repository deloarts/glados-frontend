<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useLanguageStore } from "@/stores/language";
import { boughtItemsRequest } from "@/requests/items";

const props = defineProps<{
  itemId: string
}>()

const languageStore = useLanguageStore();

const changelog = ref<Array<string>>([""]);

function fetchChangelog() {
  boughtItemsRequest
    .getItemsIDChangelog(Number(props.itemId))
    .then((response) => {
      if (response.status == 200) {
        changelog.value = response.data;
      }
    });
}

onMounted(() => fetchChangelog());

</script>

<template>
  <div class="scope">
    <div class="container">
      <h1>
        {{ languageStore.l.boughtItem.changelog.changelog }}
      </h1>
      <div v-for="log in changelog" class="changelog-item" v-bind:key="log">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  width: 100%;
  height: 200px;
  cursor: default;
}

.container {
  padding: 4px;
  margin: 4px;

  background-color: var(--main-background-color-accent-1);
  border-radius: var(--main-border-radius);

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
