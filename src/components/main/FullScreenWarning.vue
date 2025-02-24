<script setup lang="ts">
import { baseParticles } from '@/presets/particles'
import { loadFull } from 'tsparticles'

import Header from '@/components/main/PageHeader.vue'
import Footer from '@/components/main/PageFooter.vue'
import IconWarning from '@/components/icons/IconWarning.vue'

const props = defineProps(['show', 'text', 'sub'])

// @ts-expect-error - Unknown type for engine
const particlesInit = async (engine) => {
  await loadFull(engine)
}
// @ts-expect-error - Unknown type for container
const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}
</script>

<template>
  <div class="scope" v-if="props.show">
    <div class="grid">
      <div class="header">
        <Header :show-quick-menu="false"></Header>
      </div>
      <div class="footer">
        <Footer></Footer>
      </div>
      <div class="content">
        <div class="center">
          <div class="wrapper">
            <div class="icon">
              <IconWarning></IconWarning>
            </div>
            <div class="text">
              <span>{{ props.text }}</span>
            </div>
            <div class="sub-text">
              <span>{{ props.sub }}</span>
            </div>
          </div>
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
  background: linear-gradient(rgb(25, 25, 25) 30%, rgb(10, 10, 10));
  z-index: 1010;
}

.center {
  color: white;
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
  border-color: var(--main-orange-red);
  border-radius: var(--main-border-radius);

  opacity: 0.95;

  text-align: center;
}

.wrapper {
  min-width: 140px;
  max-width: 200px;
  width: auto;
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
  font-family: var(--main-font-head);
  font-size: 1.3em;

  position: relative;
  width: 100%;
  height: 75px;

  text-align: center;
  // margin-top: 10px;
}

.sub-text {
  font-family: var(--main-font-text);
  font-size: 1em;

  position: relative;
  width: 100%;
  height: min-content;

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

.grid {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  color: var(--main-text-color);
  background: var(--main-background-color);

  display: grid;
  grid-gap: 0;
  grid-template-rows: var(--header-height) auto var(--footer-height);
  grid-template-columns: var(--sidebar-width) auto;
  grid-template-areas:
    'header header'
    'content content'
    'footer footer';

  transition: 300ms;
}

.header {
  grid-area: header;
  z-index: 1012;
}

.footer {
  grid-area: footer;
  z-index: 1012;
}

.content {
  grid-area: content;
  overflow-x: hidden;
  overflow-y: scroll;
}

#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgb(25, 25, 25) 30%, rgb(10, 10, 10));
  z-index: 1011;
}
</style>
