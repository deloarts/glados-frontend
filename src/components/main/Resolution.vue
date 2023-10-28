<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue"

import config from "@/config"
import constants from "@/constants"

import FullScreenWarning from "@/components/main/FullScreenWarning.vue"

const showBox = ref(false)
const text = ref("Screen Resolution Not Supported")

function onResize() {
  if (window.innerWidth < constants.minWidth && !config.debug) { showBox.value = true }
  else { showBox.value = false }
}

onMounted(() => {
  onResize()
  nextTick(() => {
    window.addEventListener('resize', onResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <FullScreenWarning v-model:show="showBox" v-model:text="text"></FullScreenWarning>
</template>

<style scoped lang='scss'>

</style>