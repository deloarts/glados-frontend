<script setup>
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue"
import SettingsHost from "@/components/settings/SettingsHost.vue"
</script>

<template>
  <div id="app">
    <div class="grid">
      <div id="sidebar">
        <SettingsSidebar></SettingsSidebar>
      </div>
      <div id="display">
        <SettingsHost></SettingsHost>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/grid/gridSettingsView.scss';
</style>
