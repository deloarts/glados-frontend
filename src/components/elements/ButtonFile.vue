<script setup>
const props = defineProps(["text"]);
</script>

<template>
  <button class="button" v-bind:class="{ text: props.text != '' }">
    <i class="icon" v-bind:class="{ 'icon-text': props.text != '' }">
      <svg
        height="100%"
        viewBox="0 0 24 24"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path
          d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
        ></path>
      </svg>
    </i>
    {{ props.text }}
  </button>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/button/buttonBase.scss";
</style>
