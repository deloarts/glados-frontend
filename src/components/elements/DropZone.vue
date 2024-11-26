<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['files-dropped'])
const events = ['dragenter', 'dragover', 'dragleave', 'drop']

const active = ref<boolean>(false)
let inActiveTimeout: number | null = null

// setActive and setInactive use timeouts, so that when you drag an item over a child element,
// the dragleave event that is fired won't cause a flicker. A few ms should be plenty of
// time to wait for the next dragenter event to clear the timeout and set it back to active.
function setActive() {
  active.value = true
  if (inActiveTimeout) {
    clearTimeout(inActiveTimeout)
  }
}
function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false
  }, 50)
}

function onDrop(e: Event) {
  setInactive()
  //@ts-ignore
  emit('files-dropped', [...e.dataTransfer.files])
}

function preventDefaults(e: Event) {
  e.preventDefault()
}

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults)
  })
})
</script>

<template>
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot :dropZoneActive="active"></slot>
  </div>
</template>
