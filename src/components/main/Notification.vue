<script lang="ts">
import { inject } from "vue";

import IconWarning from "../icons/IconWarning.vue";
import IconInfo from "../icons/IconInfo.vue";

export default {
  name: 'Notification',
  components: { IconWarning, IconInfo },

  setup() {
    const currentUser = inject("currentUser")
    return {
      currentUser,
    }
  },
  data() {
    return {
      showWarning: false,
      showInfo: false,
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,
    };
  },

  methods: {
    updateNotification() {
      // @ts-ignore
      if (!this.showWarning && this.notificationWarning != "") {
        this.showWarning = true;
        setTimeout(this.removeNotification.bind(this), 5000);
      }
      // @ts-ignore
      else if (!this.showInfo && this.notificationInfo != "" && this.notificationWarning == "") {
        this.showInfo = true;
        setTimeout(this.removeNotification.bind(this), 4000);
      }
      setTimeout(this.updateNotification.bind(this), 100);
    },
    removeNotification() {
      this.showWarning = false;
      this.showInfo = false;
      // @ts-ignore
      this.notificationWarning = "";
      // @ts-ignore
      this.notificationInfo = "";
    }
  },
  watch: {
    // '$notificationWarning.value': {
    //   handler: function () {
    //     this.updateNotification()
    //   }, deep: true
    // },
    // '$notificationInfo.value': {
    //   handler: function () {
    //     this.updateNotification()
    //   }, deep: true
    // },
    currentUser: {
      handler: function (newVal, oldVal) {

      },
      deep: true
    },
  },
  mounted() {
    this.updateNotification();
    console.log("Mounted notifications.")
  },
}
</script>

<template>
  <div class="scope">
    <div class="container warning" v-if="showWarning">
      <div id="grid">
        <div id="icon">
          <IconWarning></IconWarning>
        </div>
        <div id="text">
          {{ notificationWarning }}
        </div>
      </div>
    </div>
    <div class="container info" v-if="showInfo">
      <div id="grid">
        <div id="icon">
          <IconInfo></IconInfo>
        </div>
        <div id="text">
          {{ notificationInfo }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '../../assets/variables.scss';

.container {
  position: absolute;
  top: 20px;
  z-index: 9999;
  position: absolute;
  right: 20px;
  top: 20px;
  width: 350px;
  height: 90px;
  border-radius: 5px;

  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1em;
  color: white;

  border-width: 3px;
  border-radius: 5px;
  border-style: solid;

  opacity: 1;
  animation: fade 0.25s linear;
}

.warning {
  background: orange;
  border-color: orangered;
}

.info {
  background: rgb(25, 216, 0);
  border-color: green;
}

#grid {
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 90px;
  grid-template-columns: 50px auto;
  grid-template-areas: 'icon text';
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
