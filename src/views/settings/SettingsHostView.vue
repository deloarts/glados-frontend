<script lang="ts">
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue";
import SettingsHost from "@/components/settings/SettingsHost.vue";

export default {
  name: 'SettingsView',
  props: {
  },
  components: {
    SettingsSidebar,
    SettingsHost
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
        <SettingsHost></SettingsHost>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/settingsView.scss';
</style>
