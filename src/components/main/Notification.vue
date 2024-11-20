<script setup lang="ts">
import {
  infoType,
  useNotificationStore,
  warningType,
} from "@/stores/notification";

import IconWarning from "@/components/icons/IconWarning.vue";
import IconInfo from "@/components/icons/IconInfo.vue";

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="scope">
    <TransitionGroup name="fade-move">
      <div
        v-for="(notification, index) in notificationStore.notifications"
        :key="String(notification.destroy)"
        class="container"
        v-bind:class="{
          warning: notification.type == warningType,
          info: notification.type == infoType,
        }"
        v-bind:style="{
          top: `${
            -20 + (notificationStore.notifications.length - index) * 80
          }px`,
        }"
      >
        <div id="grid">
          <div id="icon">
            <IconWarning v-if="notification.type == warningType" />
            <IconInfo v-else />
          </div>
          <div id="text">{{ notification.message }}</div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/grid/gridBase.scss";

.scope {
  overflow: hidden;
}

.container {
  z-index: 9999;

  position: fixed;
  right: 10px;
  width: 350px;
  height: 70px;

  font-family: var(--main-font-text);
  font-size: var(--main-font-text-size);
  color: var(--main-text-color);

  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-radius: var(--main-border-radius);

  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.3);

  transition: all 0.2s ease-out;
}

.warning {
  background: var(--main-background-color-accent-1);
  border-color: orangered;
}

.info {
  background: var(--main-background-color-accent-1);
  border-color: var(--main-color);
}

#grid {
  gap: 0;
  grid-template-rows: 70px;
  grid-template-columns: 70px auto;
  grid-template-areas: "icon text";
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

.fade-move-enter-active {
  transition: all 0.2s ease-in-out;
}
.fade-move-leave-active {
  transition: all 0.1s ease-in-out;
}

.fade-move-enter-from,
.fade-move-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
</style>
