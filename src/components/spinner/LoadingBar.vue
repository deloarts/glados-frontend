<script setup lang="ts"></script>

<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  width: 100%;
  height: 3.8px;
  display: inline-block;
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
}
.loader::after {
  content: "";
  width: 192px;
  height: 3.8px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-style: var(--main-border-style);
  animation: animloader 1.2s linear infinite;
}

@keyframes animloader {
  0% {
    left: 0;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
}
</style>
