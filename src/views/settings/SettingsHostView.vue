<script setup>
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue"
import SettingsHost from "@/components/settings/SettingsHost.vue"
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="sidebar">
          <SettingsSidebar></SettingsSidebar>
        </div>
        <div id="display">
          <SettingsHost></SettingsHost>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/views.scss';
@import '@/scss/grid/gridBase.scss';

.views-scope {
  padding: 0;
}

.views-content {
  height: 100%;
  padding: 0;
}

#grid {
  grid-template-rows: auto;
  grid-template-columns: 250px auto;
  grid-template-areas: 'sidebar display';
}

#sidebar {
  grid-area: sidebar;
}

#display {
  grid-area: display;
  overflow-x: hidden;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  display: none;
}

</style>
