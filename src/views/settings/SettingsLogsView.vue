<script lang="ts">
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue";
import SettingsLogs from "@/components/settings/SettingsLogs.vue";

export default {
  name: 'SettingsLogsView',
  props: {
  },
  components: {
    SettingsSidebar,
    SettingsLogs
  },
  data() {
    return {
    };
  },
  methods: {
  },
}
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
@import '@/assets/settingsView.scss';
</style>
