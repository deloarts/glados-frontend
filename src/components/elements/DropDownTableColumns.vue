<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  text?: string
  hideWhenClicked?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  hideWhenClicked: true,
})
const state = ref(false)

function onClickButton() {
  state.value = !state.value
}

function onClickDropDown() {
  if (props.hideWhenClicked) {
    state.value = false
  }
}
</script>

<template>
  <button class="dropdown" v-bind:class="{ 'dropdown-active': state, text: props.text != '' }">
    <div class="inner" v-on:click="onClickButton()">
      <i class="icon" v-bind:class="{ 'icon-text': props.text != '' }">
        <svg
          height="100%"
          viewBox="0 0 24 24"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M4 5V18H21V5H4M14 7V16H11V7H14M6 7H9V16H6V7M19 16H16V7H19V16Z"></path>
        </svg>
      </i>
      {{ props.text }}
    </div>
    <Transition>
      <div class="items" v-if="state" v-on:click="onClickDropDown()">
        <slot></slot>
      </div>
    </Transition>
  </button>
</template>

<style scoped lang="scss">
@use '@/scss/dropdown/dropdownBase.scss';

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
