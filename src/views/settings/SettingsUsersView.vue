<script lang="ts">
import SettingsSidebar from "@/components/settings/SettingsSidebar.vue";
import SettingsUsers from "@/components/settings/SettingsUsers.vue";

export default {
  name: 'SettingsUsersView',
  props: {
  },
  components: {
    SettingsSidebar,
    SettingsUsers
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
        <SettingsUsers></SettingsUsers>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/settingsView.scss';
</style>
