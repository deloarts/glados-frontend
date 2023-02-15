<script lang="ts">
import { boughtItemsRequest } from "@/requests/items";

export default {
  name: 'Changelog',
  props: [
    "selectedItemIds"
  ],
  data() {
    return {
      changelog: []
    };
  },
  methods: {
    fetchChangelog() {
      if (this.selectedItemIds.length > 0) {
        boughtItemsRequest.getItemsIdChangelog(this.selectedItemIds[0]).then(response => {
          this.changelog = response.data;
        })
      }
    },
  },
  watch: {
    selectedItemIds(new_id, old_id) {
      if (new_id != old_id) {
        this.changelog = [];
        this.fetchChangelog();
      }
    }
  },
  mounted() {
    this.fetchChangelog();
  }
};
</script>

<template>
  <div class="scope">
    <div v-if="selectedItemIds.length > 0" class="container">
      <h1>Changelog of item #{{ selectedItemIds[0] }}</h1>
      <div v-for="log in changelog" class="changelog-item">{{ log }}</div>
    </div>
    <div v-else class="container">
      <h1>Changelog</h1>
      <div class="changelog-item">No item selected</div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';

.scope {
  width: 100%;
  height: 100%;
  cursor: default;
}

.container {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;

  border-width: 1px;
  border-style: solid;
  border-color: $main-color;
  border-radius: 5px;

  height: 160px;
  overflow: auto;
}

h1 {
  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
}
</style>