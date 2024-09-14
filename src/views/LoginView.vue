<script setup lang="ts">
import { ref, onMounted, onBeforeMount, computed, watch } from "vue";
import { baseParticles } from "@/presets/particles";
import { loadFull } from "tsparticles";
//@ts-ignore
import moment from "moment";
import router from "@/router/index";

import { request } from "@/requests/index";
import { useNotificationStore } from "@/stores/notification";
import { useProjectsStore } from "@/stores/projects";
import { useUsersStore, useUserStore } from "@/stores/user";

import LoadingBar from "@/components/spinner/LoadingBar.vue";

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
const usersStore = useUsersStore();
const projectsStore = useProjectsStore();
const notificationStore = useNotificationStore();

const expandBox = ref<boolean>(false);
const expandFull = ref<boolean>(false);
const showLoadingBar = ref<boolean>(true);
const showInputUsername = ref<boolean>(false);
const showInputPassword = ref<boolean>(false);
const showButtonLogin = ref<boolean>(false);

const hasRequiredData = computed<boolean>(() => {
  return usersStore.users.length > 0 && userStore.user.id != null;
});
const userInput = ref(null);
const focusUserInput = () => {
  if (userInput.value) {
    userInput.value.focus();
  }
};
const currentMonth = moment().month();

const form_user = ref<string>("");
const form_pw = ref<string>("");

function login() {
  showLoadingBar.value = true;
  request.login(form_user.value, form_pw.value).then((response) => {
    if (response.status === 200) {
      setTimeout(userStore.get, 1200);
      usersStore.get();
      projectsStore.get();
    } else {
      showLoadingBar.value = false;
      form_pw.value = "";
      notificationStore.warning = "Wrong login credentials.";
    }
  });
}

function enterApp() {
  showLoadingBar.value = false;
  notificationStore.info = `Welcome ${userStore.user.full_name}`;
  var previousRoute = localStorage.getItem("gladosActiveRoute");
  if (previousRoute == "/login" || previousRoute == null) {
    previousRoute = "/";
  }
  router.push(previousRoute);
}

watch(hasRequiredData, () => {
  if (hasRequiredData.value) {
    showInputUsername.value = false;
    showInputPassword.value = false;
    showButtonLogin.value = false;
    setTimeout(() => {
      expandFull.value = true;
    }, 250);
    setTimeout(enterApp.bind(this), 590);
  }
});

onBeforeMount(userStore.logout);
onBeforeMount(usersStore.clear);
onBeforeMount(projectsStore.clear);

onMounted(focusUserInput);
onMounted(() =>
  setTimeout(() => {
    showLoadingBar.value = false;
    expandBox.value = true;
    setTimeout(() => {
      showInputUsername.value = expandBox.value;
    }, 100);
    setTimeout(() => {
      showInputPassword.value = expandBox.value;
    }, 220);
    setTimeout(() => {
      showButtonLogin.value = expandBox.value;
    }, 340);
    setTimeout(focusUserInput.bind(this), 1000);
  }, 1500),
);
</script>

<template>
  <div class="login">
    <div class="coat"></div>
    <div
      class="login-box"
      v-bind:class="{ expanded: expandBox, full: expandFull }"
    >
      <h1 v-if="!expandFull" v-bind:class="{ expanded: expandBox }">Glados</h1>
      <Transition name="fade-move">
        <input
          key="inputUsername"
          v-if="showInputUsername && !expandFull"
          v-model="form_user"
          v-on:keyup.enter="login()"
          class="input-username"
          type="text"
          placeholder="Username"
          ref="userInput"
      /></Transition>
      <Transition name="fade-move">
        <input
          key="inputPassword"
          v-if="showInputPassword && !expandFull"
          v-model="form_pw"
          v-on:keyup.enter="login()"
          class="input-password"
          type="password"
          placeholder="Password"
      /></Transition>
      <Transition name="fade-move">
        <button
          key="buttonLogin"
          v-if="showButtonLogin && !expandFull"
          v-on:click="login()"
          class="button-login"
        >
          Login
        </button>
      </Transition>
      <Transition name="fade">
        <LoadingBar
          key="loadingBar"
          v-if="showLoadingBar && !hasRequiredData && !expandFull"
          class="loading-bar"
        />
      </Transition>
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

.login-box {
  z-index: 1002;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 85px;
  transform: translate(-50%, -50%);

  background: $main-color;
  border-radius: 5px;

  text-align: center;
  padding: 15px;
  padding-top: 30px;

  box-shadow: 0px 20px 30px 0px $main-background-color-dark-2;

  transition: all 0.2s ease-out;

  &.expanded {
    height: 290px;
  }

  &.full {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border-radius: 1000;
    background-color: $main-background-color;
  }
}

.loading-bar {
  position: absolute;
  bottom: 0;
  left: 0;
}

h1 {
  font-family: "Lobster", "Segoe UI", "Arial";
  font-size: 3em;
  font-weight: thin;
  padding: 0;
  // padding-bottom: 30px;
  margin: 0;

  transition: all 0.2s ease-out;

  &.expanded {
    padding-top: 35px;
  }
}

input {
  position: absolute;
  left: 25px;
  right: 25px;

  // width: 280px;
  height: 30px;

  border: none;
  border-radius: 3px;

  transition: background 0.2s ease;
}

input:hover {
  background: lightgray;
}

button {
  position: absolute;
  left: 25px;
  right: 25px;

  font-family: "Play", "Segoe UI", "Arial";
  font-weight: 700;

  height: 30px;

  border: none;
  border-radius: 3px;

  transition: background 0.2s ease;
}

button:focus,
button:hover {
  background: lightgray;
}

.input-username {
  bottom: 115px;
}

.input-password {
  bottom: 75px;
}

.button-login {
  bottom: 25px;
}

.version {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.75em;
  font-weight: thin;
  color: white;
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-move-enter-active {
  transition: all 0.35s ease-in-out;
}
.fade-move-leave-active {
  transition: all 0.1s ease-in-out;
}

.fade-move-enter-from,
.fade-move-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
