<script lang="ts">
import IconWarning from "../icons/IconWarning.vue";
import { request, requestConfig } from "../../requests/index";
import config from "../../config";
import router from "../../router/index";

export default {
  name: 'Connection',
  components: { IconWarning },
  data() {
    return {
      notificationInfo: this.$notificationInfo,
      showBox: false,
      text: "",
    };
  },
  methods: {
    watchServerConnection() {
      request.get(config.apiGetHostVersion, requestConfig(null)).then(response => {
        if (response.status === 200) {
          if (response.data.version != config.serverVersion) {
            console.error("Server version is not supported.");
            this.text = "Server version not supported.";
            this.showBox = true;
          } else {
            this.showBox = false;
          }
        }
        else if (this.showBox) {
          this.showBox = false;
          // @ts-ignore
          this.notificationInfo = "Reconnected to the server.";

          if (!config.debug) {
            localStorage.setItem("gladosTokenValue", "");
            localStorage.setItem("gladosTokenType", "");
            router.push({ name: "Login" });
          }
        }
        setTimeout(this.watchServerConnection.bind(this), config.watchServerConnInterval);
      }).catch(error => {
        if (error.status == undefined) {
          console.error("Lost server connection.");
          this.text = "No server connection.";
          this.showBox = true;
        }
        setTimeout(this.watchServerConnection.bind(this), config.watchServerConnInterval);
      })
    }
  },
  watch: {
    // Ensure user is logged in
    $route(to, from) {
      if (localStorage.getItem("gladosTokenValue") == "" || localStorage.getItem("gladosTokenValue") == null) {
        router.push({ name: "Login" });
      }
    }
  },
  mounted() {
    this.watchServerConnection();
  },
}
</script>

<template>
  <div class="scope" v-if="showBox">
    <div class="coat"></div>
    <div class="container">
      <div id="grid">
        <div id="icon">
          <IconWarning></IconWarning>
        </div>
        <div id="text">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '../../assets/variables.scss';


.coat {
  z-index: 9997;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: $main-background-color;
  opacity: 0.9;
}

.container {
  z-index: 9998;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 150px;
  transform: translate(-50%, -50%);

  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.25em;
  color: white;

  opacity: 1;
  animation: fade 0.25s linear;
}

#grid {
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 100px;
  grid-template-columns: 50px auto;
  grid-template-areas: 'icon text';

  background: orangered;

  border-width: 3px;
  border-radius: 5px;
  border-style: solid;
  border-color: darkred;
}

#icon {
  grid-area: icon;
  display: flex;
  justify-content: center;
  align-items: center;
}

#text {
  grid-area: text;
  display: flex;
  justify-content: left;
  align-items: center;
}

@keyframes fade {

  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}
</style>
