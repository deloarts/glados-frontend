<script setup>
const props = defineProps(["text"])
</script>

<template>
  <button class="button">
    <i class="icon">
      <svg height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"></path>
      </svg>
    </i>
    {{ text }}
  </button>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';
@import '@/scss/button/buttonRedOutline.scss';
</style>