<script setup>
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue"
import SettingsLogs from "@/components/settings/SettingsLogs.vue"
</script>

<template>
  <div id="app">
    <div class="grid">
      <div id="sidebar">
        <SettingsSidebar></SettingsSidebar>
      </div>
      <div id="display">
        <SettingsLogs></SettingsLogs>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/grid/gridSettingsView.scss';
</style>
