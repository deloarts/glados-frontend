<script setup lang="ts">
import { ref } from "vue";

interface Props {
  text?: string;
  hideWhenClicked?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  hideWhenClicked: true,
});
const state = ref(false);

function onClickButton() {
  state.value = !state.value;
}

function onClickDropDown() {
  if (props.hideWhenClicked) {
    state.value = false;
  }
}
</script>

<template>
  <button
    class="dropdown"
    v-bind:class="{ 'dropdown-active': state, text: props.text != '' }"
  >
    <div class="inner" v-on:click="onClickButton()">
      <i class="icon" v-bind:class="{ 'icon-text': props.text != '' }">
        <svg
          height="100%"
          viewBox="0 0 24 24"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M17 16.88C17.56 16.88 18 17.32 18 17.88S17.56 18.88 17 18.88 16 18.43 16 17.88 16.44 16.88 17 16.88M17 13.88C19.73 13.88 22.06 15.54 23 17.88C22.06 20.22 19.73 21.88 17 21.88S11.94 20.22 11 17.88C11.94 15.54 14.27 13.88 17 13.88M17 15.38C15.62 15.38 14.5 16.5 14.5 17.88S15.62 20.38 17 20.38 19.5 19.26 19.5 17.88 18.38 15.38 17 15.38M18 3H4C2.9 3 2 3.9 2 5V17C2 18.1 2.9 19 4 19H9.42C9.26 18.68 9.12 18.34 9 18C9.12 17.66 9.26 17.32 9.42 17H4V13H10V15.97C10.55 15.11 11.23 14.37 12 13.76V13H13.15C14.31 12.36 15.62 12 17 12C18.06 12 19.07 12.21 20 12.59V5C20 3.9 19.1 3 18 3M10 11H4V7H10V11M18 11H12V7H18V11Z"
          ></path>
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
@import "@/scss/variables.scss";
@import "@/scss/dropdown/dropdownBase.scss";

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
