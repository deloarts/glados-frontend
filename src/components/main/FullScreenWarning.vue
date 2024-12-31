<script setup lang="ts">
import { baseParticles } from '@/presets/particles'
import { loadFull } from 'tsparticles'

import IconWarning from '@/components/icons/IconWarning.vue'

const props = defineProps(['show', 'text'])

// @ts-ignore
const particlesInit = async (engine) => {
  await loadFull(engine)
}
// @ts-ignore
const particlesLoaded = async (container) => {}
</script>

<template>
  <div class="scope" v-if="props.show">
    <div class="center">
      <div class="wrapper">
        <div class="icon">
          <IconWarning></IconWarning>
        </div>
        <div class="text">
          <span>{{ props.text }}</span>
        </div>
      </div>
    </div>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="baseParticles"
    />
  </div>
</template>

<style scoped lang="scss">
.scope {
  color: white;
  background: linear-gradient(rgb(25, 25, 25) 30%, rgb(10, 10, 10));
  z-index: 1010;
}

.center {
  z-index: 1012;

  position: absolute;
  left: 50%;
  top: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);

  padding: var(--main-padding);

  background: rgb(30, 30, 30);

  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--main-color);
  border-radius: var(--main-border-radius);

  opacity: 0.95;

  text-align: center;
}

.wrapper {
  width: 200px;
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
  background: rgb(50, 50, 50);
  z-index: 1011;
}
</style>
