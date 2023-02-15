<script lang="ts">
import IconDashboard from "../icons/IconDashboard.vue";
import IconItems from "../icons/IconItems.vue";
import IconAccount from "../icons/IconAccount.vue";
import IconSettings from "../icons/IconSettings.vue";

export default {
  name: 'SettingsSidebar',
  components: {
      IconDashboard,
      IconItems,
      IconAccount,
      IconSettings
  },

  data() {
      return {
          menuItems: [
              { name: 'Host', link: '/settings/host' },
              { name: 'Logs', link: '/settings/logs' },
              { name: 'Users', link: '/settings/users' },
              { name: 'API Keys', link: '/settings/api-keys' },
          ],
      };
  },
  methods: {
      routeIsActive(currentLink: string) {
          let activeRoute = this.$route.path;
          if (activeRoute != '/login') { localStorage.setItem("gladosActiveRoute", activeRoute); }
          if (activeRoute.includes(currentLink)) { return true; }
          else { return false; }
      },
  },
  watch: {
  },

}
</script>

<template>
    <div class="sidebar">
        <div class="wrapper">
            <router-link v-for="menuItem in menuItems" :to="menuItem.link" :key="menuItem.name"
                v-bind:class="{ 'active': routeIsActive(menuItem.link) }">
                <span class="link-text">{{ menuItem.name }}</span>
            </router-link>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import '@/assets/sidebar.scss';
.sidebar {
    background: $main-color-shade-1;
}
</style>
