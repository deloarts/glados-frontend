<script setup>
import { watch, computed } from "vue"

import { useNotificationStore } from "@/stores/notification.js"

import IconWarning from "@/components/icons/IconWarning.vue"
import IconInfo from "@/components/icons/IconInfo.vue"

const notificationStore = useNotificationStore()

const info = computed(() => notificationStore.info)
const warning = computed(() => notificationStore.warning)

function clearWarning() {
  notificationStore.clearWarning()
}

function clearInfo() {
  notificationStore.clearInfo()
}

watch(info, () => {
  setTimeout(clearInfo.bind(this), 5000)
})

watch(warning, () => {
  setTimeout(clearWarning.bind(this), 5000)
})
</script>

<template>
  <div class="scope">
    <div class="container warning" v-on:click="clearWarning" v-bind:class="{ 'slide-in': notificationStore.warning != '', 'slide-out': notificationStore.warning == '' }">
      <div id="grid">
        <div id="icon">
          <IconWarning></IconWarning>
        </div>
        <div id="text">
          {{ notificationStore.warning }}
        </div>
      </div>
    </div>
    <div class="container info" v-on:click="clearInfo" v-bind:class="{ 'slide-in': notificationStore.info != '', 'slide-out': notificationStore.info == '' }">
      <div id="grid">
        <div id="icon">
          <IconInfo></IconInfo>
        </div>
        <div id="text">
          {{ notificationStore.info }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.container {
  position: absolute;
  z-index: 9999;
  position: absolute;
  right: 20px;
  top: 20px;
  width: 350px;
  height: 70px;
  border-radius: 5px;

  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1em;
  color: white;

  border-width: 1px;
  border-radius: 0.25em;
  border-style: solid;
  box-shadow: 
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.3);

  animation: fade 1s linear;
  transform: translateX(400px);
}


.warning {
  background: $main-background-color-dark;
  border-color: orangered;
}

.info {
  background: $main-background-color-dark;
  border-color: $main-color;
}

.slide-in {
  animation: slide-in 0.3s forwards;
}

.slide-out {
  animation: slide-out 0.2s forwards;
}
    
@keyframes slide-in {
  100% { transform: translateX(0%); }
}
    
@keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(400px); }
}

#grid {
  display: grid;
  grid-gap: 5px;
  grid-template-rows: 70px;
  grid-template-columns: 80px auto;
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

svg {
  width: 30px;
  height: 30px;
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
