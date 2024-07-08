<script setup>
import { ref, onMounted } from "vue";
import { baseParticles, snowParticles } from "@/presets/particles";
import { loadFull } from "tsparticles";
import moment from "moment";

import constants from "@/constants";
import router from "@/router/index";
import { request } from "@/requests/index";
import { usersRequest } from "@/requests/users";
import { useUserStore } from "@/stores/user.js";
import { useNotificationStore } from "@/stores/notification.js";

// Particles
const particlesInit = async (engine) => {
  console.log("Init Particles...");
  await loadFull(engine);
};
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

// Stores
const userStore = useUserStore();
const notificationStore = useNotificationStore();

// Refs
const userInput = ref(null);
const focusUserInput = () => {
  if (userInput.value) {
    userInput.value.focus();
  }
};
const currentMonth = moment().month();

let text = `v${constants.version}`;
const form_user = ref("");
const form_pw = ref("");

function login() {
  request.login(form_user.value, form_pw.value).then((response) => {
    if (response.status === 200) {
      fetchCurrentUser();
    } else {
      form_pw.value = "";
      notificationStore.warning = "Wrong login credentials.";
    }
  });
}

function fetchCurrentUser() {
  usersRequest.getUsersMe().then((response) => {
    if (response.status === 200) {
      console.log("Getting user from login.");

      userStore.$patch({
        username: response.data.username,
        full_name: response.data.full_name,
        email: response.data.email,
        is_active: response.data.is_active,
        is_superuser: response.data.is_superuser,
        id: response.data.id,
        created: response.data.created,
      });
      notificationStore.info = `Welcome ${response.data.full_name}`;

      var previousRoute = localStorage.getItem("gladosActiveRoute");
      if (previousRoute == "/login" || previousRoute == null) {
        previousRoute = "/";
      }
      router.push(previousRoute);
    }
  });
}

onMounted(focusUserInput);
</script>

<template>
  <div class="login">
    <div class="coat"></div>
    <div class="center">
      <h1 id="header">Glados</h1>
      <input
        id="ipt1"
        v-model="form_user"
        v-on:keyup.enter="login()"
        type="text"
        placeholder="user"
        ref="userInput"
      />
      <input
        id="ipt2"
        v-model="form_pw"
        v-on:keyup.enter="login()"
        type="password"
        placeholder="password"
      />
      <button id="btn1" v-on:click="login()">Login</button>
      <span id="text" class="version">{{ text }}</span>
    </div>
  </div>

  <Particles
    v-if="currentMonth > 1 && currentMonth < 11"
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="baseParticles"
  />
  <div v-else class="snow"></div>
  <!-- <Particles
    v-else
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="snowParticles"
  /> -->
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/background/snow.scss";

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

  background: linear-gradient(
    $main-background-color-dark-2 30%,
    $main-background-color
  );
}

.center {
  z-index: 1002;
  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  height: 350px;
  transform: translate(-50%, -50%);

  display: grid;
  grid-gap: 20px;
  grid-template-rows: auto 30px 30px 30px 15px;
  grid-template-columns: 280px;
  grid-template-areas:
    "header"
    "ipt1"
    "ipt2"
    "btn1"
    "text";

  background: $main-color;
  border-radius: 5px;

  text-align: center;
  padding: 15px;

  box-shadow: 0px 20px 30px 0px $main-background-color-dark-2;
}

h1 {
  font-family: "Lobster", "Segoe UI", "Arial";
  font-size: 3em;
  font-weight: thin;
  padding-top: 20px;
}

input {
  width: calc(100% - 4px);
  height: 100%;
  border: none;
  border-radius: 3px;
  transition: background 0.2s ease;
}

input:hover {
  background: lightgray;
}

button {
  font-family: "Play", "Segoe UI", "Arial";
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

.version {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.75em;
  font-weight: thin;
  color: white;
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

#text {
  grid-area: text;
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
}
</style>
