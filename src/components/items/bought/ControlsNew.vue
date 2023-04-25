<script lang="ts">
import { boughtItemsRequest } from "@/requests/items";
import router from "@/router/index";

import ButtonCreate from "@/components/elements/ButtonCreate.vue";
import ButtonAbort from "@/components/elements/ButtonAbort.vue";

export default {
  name: 'ControlsNew',
  props: ["formData", "header"],
  emits: [],
  components: {
    ButtonCreate,
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
    onCreate() {
      boughtItemsRequest.postItems(this.formData).then(response => {
        if (response.status === 200) {
          // @ts-ignore
          this.notificationInfo = "Created item."
          router.push({ name:"BoughtItems"});
        }
        if (response.status === 422) {
          // @ts-ignore
          this.notificationWarning = "Data is incomplete."
        }
      }).catch(error => {

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
          {{ header }}
        </div>
        <div id="placeholder-1" class="grid-item-center">

        </div>
        <div id="placeholder-2" class="grid-item-center">
          <!-- Data: {{ formData }} -->
        </div>
        <div id="btn-1" class="grid-item-center">
          <ButtonCreate text="Create" v-on:click="onCreate" />
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