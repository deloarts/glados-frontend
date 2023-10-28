<script setup>
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue"
import SettingsApiKeys from "@/components/settings/SettingsApiKeys.vue"
</script>

<template>
  <div id="app">
    <div class="grid">
      <div id="sidebar">
        <SettingsSidebar></SettingsSidebar>
      </div>
      <div id="display">
        <SettingsApiKeys></SettingsApiKeys>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/grid/gridSettingsView.scss';
</style>
