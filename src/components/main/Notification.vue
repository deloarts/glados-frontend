<script setup>
import { ref, watch, computed } from "vue"

import { useNotificationStore } from "@/stores/notification.js"

import IconWarning from "@/components/icons/IconWarning.vue"
import IconInfo from "@/components/icons/IconInfo.vue"

const notificationStore = useNotificationStore()

const info = computed(() => notificationStore.info)
const warning = computed(() => notificationStore.warning)

const showInfo = ref(false)
const showWarning = ref(false)

function hideSlider() {
  showInfo.value = false
  showWarning.value = false
}

function clearWarning() {
  notificationStore.clearWarning()
  setTimeout(hideSlider.bind(this), 500)
}

function clearInfo() {
  notificationStore.clearInfo()
  setTimeout(hideSlider.bind(this), 500)
}

watch(info, () => {
  if (info.value != "") {
    showInfo.value = true
    setTimeout(clearInfo.bind(this), 5000)
  }
})

watch(warning, () => {
  if (warning.value != "") {
    showWarning.value = true
    setTimeout(clearWarning.bind(this), 5000)
  }
})
</script>

<template>
  <div class="scope">
    <div class="container warning" v-if="showWarning" v-on:click="clearWarning" v-bind:class="{ 'slide-in': showWarning, 'slide-out': warning == '' }">
      <div id="grid">
        <div id="icon">
          <IconWarning></IconWarning>
        </div>
        <div id="text">
          {{ warning }}
        </div>
      </div>
    </div>
    <div class="container info" v-if="showInfo" v-on:click="clearInfo" v-bind:class="{ 'slide-in': showInfo, 'slide-out': info == '' }">
      <div id="grid">
        <div id="icon">
          <IconInfo></IconInfo>
        </div>
        <div id="text">
          {{ info }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/grid/gridBase.scss';

.scope {
  overflow: hidden;
}

.container {
  z-index: 9999;

  position: fixed;
  right: 10px;
  top: 60px;
  width: 350px;
  height: 70px;

  font-family: $main-font;
  font-size: $main-font-size;
  color: white;

  border-width: $main-border-width;
  border-style: $main-border-style;
  border-radius: $main-border-radius;

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
  // grid-gap: 5px;
  grid-template-rows: 70px;
  grid-template-columns: 60px auto;
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
  padding-left: 10px;
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
