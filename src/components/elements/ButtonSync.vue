<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  text?: string
  rotate?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  rotate: false,
})

const sync = ref(false)
watch(
  () => props.rotate,
  () => {
    if (props.rotate) {
      sync.value = true
    } else {
      setTimeout(() => {
        sync.value = false
      }, 2000)
    }
  },
)
</script>

<template>
  <button v-bind:class="{ text: props.text != '' }">
    <i class="icon" v-bind:class="{ 'icon-text': props.text != '' }">
      <svg
        v-bind:class="{ rotate: sync }"
        height="100%"
        viewBox="0 0 24 24"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path
          d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z"
        ></path>
      </svg>
    </i>
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
@use '@/scss/button/buttonBase.scss';

.rotate {
  animation-name: synching;
  animation-duration: 2s;
}

@keyframes synching {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
