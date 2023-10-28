<script setup>
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue"
import SettingsUsers from "@/components/settings/SettingsUsers.vue"
</script>

<template>
  <div id="app">
    <div class="grid">
      <div id="sidebar">
        <SettingsSidebar></SettingsSidebar>
      </div>
      <div id="display">
        <SettingsUsers></SettingsUsers>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/grid/gridSettingsView.scss';
</style>
