<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue"
import ButtonAbort from "@/components/elements/ButtonAbort.vue"
import ButtonCheckDanger from "@/components/elements/ButtonCheckDanger.vue"
import IconQuestion from "@/components/icons/IconQuestion.vue"

// Props & Emits
interface Props {
  show?: boolean
  text?: string
  onYes?: CallableFunction
  onNo?: CallableFunction
  atMouse?: boolean
  yesIsDanger?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  atMouse: false,
  yesIsDanger: false
})

const x = ref("")
const y = ref("")

function eventMouseMove(event) {
  if (props.atMouse) {
    x.value = `${event.pageX - 240}px` // FIXME: This is super ugly, but the main app is shifted by 250px due to the sidebar
    y.value = `${event.pageY + 10}px`
  } else {
    x.value = "50%"
    y.value = "50%"
  }
}

watch(() => props.show, () => {
  if (props.show) {
    document.removeEventListener("mousemove", eventMouseMove)
  } else {
    document.addEventListener("mousemove", eventMouseMove)
  }
})

onMounted(() => {
  document.addEventListener("mousemove", eventMouseMove)
})

onUnmounted(() => {
  document.removeEventListener("mousemove", eventMouseMove)
})
</script>

<template>
  <div class="scope" v-if="props.show">
    <div class="coat" v-bind:class="{ 'coat-bg': !props.atMouse }"></div>
    <div class="wrapper grid" v-bind:class="{ 'center': !props.atMouse }" :style="{ 'left': x, 'top': y }">
      <div id="text" class="text"><span>{{ props.text }}</span></div>
      <IconQuestion id="icon" class="icon" />
      <ButtonCheckDanger id="btnYes" v-on:click="props.onYes()" text="Yes"/>
      <ButtonAbort id="btnNo" v-on:click="props.onNo()" text="No"/>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  color: white;
}

.coat {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $main-background-color;
  opacity: 0;
}

.coat-bg {
  opacity: 0.9;
}

.wrapper {
  z-index: 1001;
  position: absolute;
  width: auto;
  height: auto;
  box-shadow: 
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.2);
}

.center {
  // left: 50%;
  // top: 50%;
  transform: translate(-50%, -50%);
}

.grid {
  display: grid;
  grid-gap: 10px;
  grid-template-rows: auto 30px;
  grid-template-columns: 40px auto 90px 90px;
  grid-template-areas: 'icon text text text'
  'empty empty btnYes btnNo';

  background: $main-background-color;
  border-style: solid;
  border-color: $main-color;
  border-width: 1px;
  border-radius: 5px;

  text-align: center;
  padding: 20px;
}

.text {
  font-family: 'Play', 'Segoe UI', 'Arial';
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text span {
  width: 100%;
  max-width: 300px;
  text-align: left;
  padding-left: 10px;
}

.icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  padding-top: 10px;
  width: 100%;
}

#empty {
  grid-area: empty;
}

#text {
  grid-area: text;
}

#icon {
  grid-area: icon;
}

#btnYes {
  grid-area: btnYes;
}

#btnNo {
  grid-area: btnNo;
}
</style>
