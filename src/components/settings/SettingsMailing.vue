<script setup lang="ts">
import SettingsMailingShow from '@/components/settings/SettingsMailingShow.vue'
import SettingsMailingTest from '@/components/settings/SettingsMailingTest.vue'
import InfoForForm from '@/components/common/InfoForForm.vue'

import { useLanguageStore } from '@/stores/language'
const languageStore = useLanguageStore()
</script>

<template>
  <div class="scope">
    <div class="content">
      <div id="grid">
        <div id="banner">
          <h1>{{ languageStore.l.settings.mailing.banner }}</h1>
        </div>
        <div id="show">
          <SettingsMailingShow />
        </div>
        <div id="test">
          <SettingsMailingTest />
        </div>
        <div class="warning">
          <InfoForForm :text="languageStore.l.settings.mailing.setupInfo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/grid/gridBase.scss';

.scope {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
}

#grid {
  grid-template-columns: 100%;
  grid-template-rows: min-content;
  grid-template-areas:
    'banner'
    'warning'
    'show'
    'test';
}

#show {
  grid-area: show;
}

#test {
  grid-area: test;
}

#banner {
  grid-area: banner;
}

#warning {
  grid-area: warning;
}
</style>
