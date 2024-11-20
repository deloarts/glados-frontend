<script setup lang="ts">
const props = defineProps<{
  svgPath: string;
  text?: string;
}>();
</script>

<template>
  <button :class="{ text: props.text != '' }">
    <i class="icon" :class="{ 'icon-text': props.text != '' }">
      <svg
        height="100%"
        viewBox="0 0 24 24"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path :d="props.svgPath" />
      </svg>
    </i>
    {{ props.text }}
  </button>
</template>

<style scoped lang="scss">
@import "@/scss/button/buttonBase.scss";

button {
  background-color: var(--main-red);
  color: white;
}

button:hover {
  background-color: var(--main-red);
  border: 1px solid var(--main-background-color-accent-1);
  filter: brightness(1.2);
}

.icon {
  color: white;
}
</style>
