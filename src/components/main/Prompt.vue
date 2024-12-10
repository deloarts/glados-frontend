<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import ButtonAbort from '@/components/elements/ButtonAbort.vue'
import ButtonCheckDanger from '@/components/elements/ButtonCheckDanger.vue'
import IconQuestion from '@/components/icons/IconQuestion.vue'

import { useLanguageStore } from '@/stores/language'

// Props & Emits
interface Props {
  show?: boolean
  text?: string
  onYes?: CallableFunction | null
  onNo?: CallableFunction | null
  atMouse?: boolean
  yesIsDanger?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  atMouse: false,
  yesIsDanger: false,
})

const languageStore = useLanguageStore()

const x = ref<string>('')
const y = ref<string>('')

function eventMouseMove(event: Event) {
  if (props.atMouse) {
    //@ts-ignore
    x.value = `${event.pageX + 10}px`
    //@ts-ignore
    y.value = `${event.pageY + 10}px`
  } else {
    x.value = '50%'
    y.value = '50%'
  }
}

function onButtonYes() {
  if (props.onYes) {
    props.onYes()
  }
}

function onButtonNo() {
  if (props.onNo) {
    props.onNo()
  }
}

watch(
  () => props.show,
  () => {
    if (props.show) {
      document.removeEventListener('mousemove', eventMouseMove)
    } else {
      document.addEventListener('mousemove', eventMouseMove)
    }
  },
)

onMounted(() => {
  document.addEventListener('mousemove', eventMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', eventMouseMove)
})
</script>

<template>
  <div class="scope" v-if="props.show">
    <div class="coat" v-bind:class="{ 'coat-bg': !props.atMouse }"></div>
    <div
      id="grid"
      class="wrapper"
      v-bind:class="{ center: !props.atMouse }"
      :style="{ left: x, top: y }"
    >
      <div id="text" class="prompt-text">
        <span>{{ props.text }}</span>
      </div>
      <IconQuestion id="icon" class="prompt-icon" />
      <ButtonCheckDanger
        id="btnYes"
        v-on:click="onButtonYes"
        :text="languageStore.l.main.promptYes"
      />
      <ButtonAbort id="btnNo" v-on:click="onButtonNo" :text="languageStore.l.main.promptNo" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/grid/gridBase.scss';

.scope {
  color: var(--main-text-color);
}

.coat {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--main-background-color);
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

#grid {
  width: auto;
  height: auto;

  grid-template-rows: auto 30px;
  grid-template-columns: 40px auto 130px 130px;
  grid-template-areas:
    'icon text text text'
    'empty empty btnYes btnNo';

  padding: var(--main-padding);

  background: var(--main-background-color);

  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--main-border-color);
  border-radius: var(--main-border-radius);

  text-align: center;
}

.prompt-text {
  font-family: var(--main-font-text);
  font-size: 1.2em;

  display: flex;
  justify-content: center;
  align-items: center;
}

.prompt-text span {
  width: 100%;
  max-width: 300px;
  text-align: left;
  padding-left: 10px;
}

.prompt-icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
