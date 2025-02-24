<script setup lang="ts">
import AccountControls from '@/components/account/AccountControls.vue'
import AccountSecurity from '@/components/account/AccountSecurity.vue'
import InfoForForm from '@/components/common/InfoForForm.vue'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'

const languageStore = useLanguageStore()
const userStore = useUserStore()
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid">
        <div class="grid-area-controls">
          <AccountControls />
        </div>
        <div class="grid-area-display">
          <AccountSecurity />
        </div>
        <div class="grid-area-info" v-if="userStore.user.hashed_rfid">
          <InfoForForm :text="languageStore.l.account.banner.rfidInfo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

.grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'grid-area-controls'
    'grid-area-display'
    'grid-area-info';
}

.grid-area-controls {
  grid-area: grid-area-controls;
}

.grid-area-info {
  grid-area: grid-area-info;
}

.grid-area-display {
  grid-area: grid-area-display;
}

::-webkit-scrollbar {
  display: none;
}
</style>
