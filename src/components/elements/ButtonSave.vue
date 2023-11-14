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
          d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z"
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
