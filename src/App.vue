<script lang="ts">
import { ref, provide } from 'vue'

import router from "./router/index";
import { usersRequest } from "./requests/users"

import Resolution from "./components/main/Resolution.vue";
import Connection from "./components/main/Connection.vue";
import Notification from "./components/main/Notification.vue";
import Header from "./components/main/Header.vue";
import Footer from "./components/main/Footer.vue";
import Sidebar from "./components/main/Sidebar.vue";
import RouterDisplay from "./components/main/RouterDisplay.vue";

export default {
  name: 'App',
  components: {
    Resolution,
    Connection,
    Notification,
    Header,
    Footer,
    Sidebar,
    RouterDisplay
  },
  setup() {
    const currentUser = ref({
      username: null,
      full_name: null,
      email: null,
      is_active: null,
      is_superuser: null,
      id: null,
      created: null
    })
    provide("currentUser", currentUser)
    
    return {
      currentUser
    }
  },
  methods: {
    getCurrentUser() {
      usersRequest.getUsersMe().then(response => {
        if (response.status === 200) {
          this.currentUser = response.data;
          // Redirect the user to the app.
          var previousRoute = localStorage.getItem("gladosActiveRoute");
          if (previousRoute == "/login" || previousRoute == null) {
            previousRoute = "/"
          }
          router.push(previousRoute);
        }
      });
    }
  },
  beforeMount() {
    this.getCurrentUser();
  },
  watch: {
    currentUser: {
      handler: function (newVal, oldVal) {
        if (this.currentUser == undefined || this.currentUser.username == null || this.currentUser.username == undefined || this.currentUser.username == "") {
          alert("Current user object is invalid. Checking again ...")
          this.getCurrentUser();
        }
      },
      deep: true
    },
  },
}

</script>
<template>
  <div id="app">
    <Resolution />
    <Notification />
    <Connection />
    <div class="grid">
      <div id="header">
        <Header title="Glados"></Header>
      </div>
      <div id="footer">
        <Footer></Footer>
      </div>
      <div id="sidebar">
        <Sidebar></Sidebar>
      </div>
      <div id="display">
        <RouterDisplay></RouterDisplay>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import './assets/variables.scss';

.grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  color: white;
  background: $main-background-color;

  display: grid;
  grid-template-rows: 80px auto 20px;
  grid-template-columns: 250px auto;
  grid-template-areas: 'header display'
    'sidebar display'
    'footer display';
}

#header {
  grid-area: header;
}

#footer {
  grid-area: footer;
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
