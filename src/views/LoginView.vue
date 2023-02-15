<script lang="ts">
import { inject } from "vue";

import router from "../router/index";
import { request } from "../requests/index";
import { usersRequest } from "../requests/users"

export default {
  name: 'Login',
  setup() {
    const currentUser = inject("currentUser")
    return {
      currentUser,
    }
  },
  data() {
    return {
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,

      user: '',
      pw: ''
    };
  },
  methods: {
    login() {
      request.login(this.user, this.pw).then(response => {
        if (response.status === 200) {
          this.fetchCurrentUser();
          // setTimeout(this.fetchCurrentUser.bind(this), 10);
        } else {
          // @ts-ignore
          this.notificationWarning = "Wrong login credentials.";
        }
      })
    },

    fetchCurrentUser() {
      usersRequest.getUsersMe().then(response => {
        if (response.status === 200) {
          // Current user is injected from App.vue
          this.currentUser = response.data;

          // @ts-ignore
          this.notificationInfo = `Welcome ${response.data.full_name}`;

          // Redirect the user to the app.
          var previousRoute = localStorage.getItem("gladosActiveRoute");
          if (previousRoute == "/login" || previousRoute == null) {
            previousRoute = "/"
          }
          router.push(previousRoute);
        }
      })
    }
  },
  mounted() {
    // @ts-ignore
    this.$refs.userInput.focus();
  },
}
</script>

<template>
  <div class="login">
    <div class="coat"></div>
    <div class="center">
      <h1 id="header">Glados</h1>
      <input id="ipt1" v-model="user" v-on:keyup.enter="login()" type="text" placeholder="user" ref="userInput">
      <input id="ipt2" v-model="pw" v-on:keyup.enter="login()" type="password" placeholder="password" ref="pwInput">
      <button id="btn1" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '../assets/variables.scss';

.login {
  color: white;
}

.coat {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: $main-background-color;
}

.center {
  z-index: 1001;
  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);

  display: grid;
  grid-gap: 20px;
  grid-template-rows: 110px 30px 30px 30px;
  grid-template-columns: 150px 150px;
  grid-template-areas: 'header header'
    'ipt1 ipt1'
    'ipt2 ipt2'
    'btn1 btn1';

  background: $main-color;
  border-radius: 5px;

  text-align: center;
  padding: 30px;
  padding-top: 0;
  padding-bottom: 30px;
}

h1 {
  font-family: 'Lobster', 'Segoe UI', 'Arial';
  font-size: 3em;
  font-weight: thin;
}

input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 3px;
  transition: background 0.2s ease;
}

input:hover {
  background: lightgray;
}

button {
  font-family: 'Play', 'Segoe UI', 'Arial';
  font-weight: 700;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 3px;
  transition: background 0.2s ease;
}

button:focus,
button:hover {
  background: lightgray;
  /* outline: 0; */
}

#header {
  grid-area: header;
}

#ipt1 {
  grid-area: ipt1;
}

#ipt2 {
  grid-area: ipt2;
}

#btn1 {
  grid-area: btn1;
}

#btn2 {
  grid-area: btn2;
}
</style>
