<script setup>
import { baseParticles } from "@/presets/particles"
import { loadFull } from "tsparticles"

import IconWarning from "@/components/icons/IconWarning.vue"

// Props & Emits
const props = defineProps(["show", "text"])

// Particles
const particlesInit = async (engine) => {
  await loadFull(engine);
}
const particlesLoaded = async (container) => {
}
</script>

<template>
  <div class="scope" v-if="props.show">
    <div class="center">
      <div class="wrapper">
        <div class="icon">
          <IconWarning></IconWarning>
        </div>
        <div class="text"><span>{{ props.text }}</span></div>
      </div>
    </div>
    <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
        :options="baseParticles" />
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  color: white;
}

.center {
  z-index: 1002;
  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);

  background: $main-background-color-dark;
  border-style: solid;
  border-color: $main-color;
  border-width: 1px;
  border-radius: 5px;
  opacity: 0.95;

  text-align: center;
  padding: 30px;
}

.wrapper {
  width: 400px;
  height: auto;
  overflow: auto;
  text-align: left;
}

.icon {
  position: relative;

  width: 100%;
  height: 75px;

  text-align: center;
}

.icon svg {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;

  width: 75px;
  height: 75px;

  transform: translate(-50%, -50%);
}

.text {
  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5em;

  position: relative;
  width: 100%;
  height: 75px;

  text-align: center;
  // margin-top: 10px;
}

.text span {
  margin: 0;
  position: absolute;

  width: 100%;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $main-background-color;
  z-index: 1001;
}
</style>
