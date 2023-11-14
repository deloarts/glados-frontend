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
          d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z"
        ></path>
      </svg>
    </i>
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/button/buttonBase.scss";
</style>
