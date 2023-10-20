<script lang="ts">
import { inject } from "vue";

import router from "@/router/index";
import config from "@/config";

import IconDashboard from "../icons/IconDashboard.vue";
import IconItems from "../icons/IconItems.vue";
import IconAccount from "../icons/IconAccount.vue";
import IconSettings from "../icons/IconSettings.vue";

export default {
  name: 'Sidebar',
  props: {
    title: String
  },
  setup() {
    // const currentUser = inject(currentUserKey); // https://stackoverflow.com/questions/68149678/typescript-vue-3-injecting-mutating-function-causes-typescript-error-object
    const currentUser =  inject("currentUser");
    return {
      currentUser,
    }
  },
  components: {
    IconDashboard,
    IconItems,
    IconAccount,
    IconSettings
  },

  data() {
    return {
      debug: config.debug,
      menuItems: [
        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Items', link: '/items/bought' },
        { name: 'Account', link: '/account' },
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

    rebuildNavigation() {
      // @ts-ignore
      if (this.currentUser.is_superuser) {
        this.menuItems = [
          { name: 'Dashboard', link: '/dashboard' },
          { name: 'Items', link: '/items/bought' },
          { name: 'Account', link: '/account' },
          { name: 'Settings', link: '/settings' },
        ];
      } else {
        this.menuItems = [
          { name: 'Dashboard', link: '/dashboard' },
          { name: 'Items', link: '/items/bought' },
          { name: 'Account', link: '/account' },
        ];
      }
    },

    logout() {
      localStorage.setItem("gladosTokenValue", "");
      localStorage.setItem("gladosTokenType", "");
      router.push({name:"Login"});
    },
  },
  watch: {
    currentUser: {
      handler: function (newVal, oldVal) {
        this.rebuildNavigation();
      },
      deep: true
    },
  },

}
</script>

<template>
  <div class="sidebar">
    <div class="wrapper">
      <hr v-if="debug" />
      <div v-if="debug" class="debug">DEVELOPMENT MODE</div>
      <hr />
      <div class="user">
        <div class="full-name">{{
        //@ts-ignore
        currentUser.full_name
        }}</div>
        <div class="email">{{
        //@ts-ignore
        currentUser.email
        }}</div>
        <div class="logout" v-on:click="logout()">Logout</div>
      </div>
      <hr />
      <router-link v-for="menuItem in menuItems" :to="menuItem.link" :key="menuItem.name"
        v-bind:class="{ 'active': routeIsActive(menuItem.link) }">
        <span class="link-text">{{ menuItem.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '../../assets/variables.scss';
@import '../../assets/sidebar.scss';

.sidebar hr {
  width: 100%;
  border: none;
  height: 2px;
  background-color: $main-color-hover;
  padding: 0;
  margin: 0;
}

.sidebar .user {
  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  cursor: default;
  padding: 25px;
}

.sidebar .user .full-name {
  font-size: 1.3em;
}

.sidebar .user .email {
  font-size: 0.75em;
}

.sidebar .user .logout {
  font-size: 0.75em;
  cursor: pointer;
  padding-top: 10px;
}

.sidebar .debug {
  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 25px;
  font-size: 1.3em;

  background-color: red;
  text-align: center;
}
</style>
