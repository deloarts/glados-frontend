<script lang="ts">
import { boughtItemsRequest } from "@/requests/items"
import router from "@/router/index";

import ButtonUpdate from "@/components/elements/ButtonUpdate.vue";
import ButtonAbort from "@/components/elements/ButtonAbort.vue";

export default {
  name: 'ControlsEdit',
  props: ["formData"],
  emits: [],
  components: {
    ButtonUpdate,
    ButtonAbort,
  },
  data() {
    return {
      // Globals
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,
    };
  },
  methods: {
    onUpdate() {
      const itemId = this.$route.params.id;

      boughtItemsRequest.putItems(Number(itemId), this.formData).then(response => {
        if (response.status === 200) {
          // @ts-ignore
          this.notificationInfo = `Updated item #${itemId}.`;
          router.push({ name: "BoughtItems" });
        }
        else if (response.status === 422) {
          // @ts-ignore
          this.notificationWarning = "Data is incomplete.";
        }
        else {
          this.notificationWarning = response.data.detail;
        }
      }).catch(error => {
        console.log(error);
        this.notificationWarning = error;
      })
    }
  },
  watch: {
  },
  beforeMount() {
  }
};
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="header" class="grid-item-center">
          Edit Item #{{ $route.params.id }}
        </div>
        <div id="placeholder-2" class="grid-item-center">
          <!-- Data: {{ formData }} -->
        </div>
        <div id="placeholder-3" class="grid-item-center">
          <!-- Data: {{ formData }} -->
        </div>
        <div id="btn-1" class="grid-item-center">
          <ButtonUpdate text="Update" v-on:click="onUpdate" />
        </div>
        <div id="btn-2" class="grid-item-center">
          <ButtonAbort text="Abort" route-name="BoughtItems" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/gridBase.scss';
@import '@/assets/gridItemBoughtControlsNewEdit.scss';
</style>