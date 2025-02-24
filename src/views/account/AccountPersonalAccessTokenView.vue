<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import config from '@/config'

import AccountControls from '@/components/account/AccountControls.vue'
import AccountPersonalAccessToken from '@/components/account/AccountPersonalAccessToken.vue'
import WarningForForm from '@/components/common/WarningForForm.vue'
import InfoForForm from '@/components/common/InfoForForm.vue'

import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
const expiration = computed<string>(() => {
  const exTime = moment().add(config.patExpireMinutes, 'minutes').format('DD.MM.YYYY')
  return `${languageStore.l.account.banner.patInfo}${exTime}`
})
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
        <div class="grid-area-info">
          <InfoForForm :text="expiration" />
        </div>
        <div class="grid-area-warning">
          <WarningForForm :text="languageStore.l.account.banner.patCreationWarning" />
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
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    'grid-area-controls'
    'grid-area-display'
    'grid-area-info'
    'grid-area-warning';
}

.grid-area-controls {
  grid-area: grid-area-controls;
}

.grid-area-warning {
  grid-area: grid-area-warning;
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
