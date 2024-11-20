<script setup lang="ts">
import AccountControls from "@/components/account/AccountControls.vue";
import AccountPersonalAccessToken from "@/components/account/AccountPersonalAccessToken.vue";
import WarningForForm from "@/components/common/WarningForForm.vue";

import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid">
        <div class="grid-area-controls">
          <AccountControls />
        </div>
        <div class="grid-area-display">
          <AccountPersonalAccessToken />
        </div>
        <div class="grid-area-warning">
          <WarningForForm
            :text="languageStore.l.account.banner.patCreationWarning"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

.grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "grid-area-controls"
    "grid-area-display"
    "grid-area-warning";
}

.grid-area-controls {
  grid-area: grid-area-controls;
}

.grid-area-warning {
  grid-area: grid-area-warning;
}

.grid-area-display {
  grid-area: grid-area-display;
}

::-webkit-scrollbar {
  display: none;
}
</style>
