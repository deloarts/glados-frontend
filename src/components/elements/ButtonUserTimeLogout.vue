<script setup lang="ts">
import ButtonBaseRed from "@/components/elements/ButtonBaseRed.vue";

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <ButtonBaseRed
    :text="props.text"
    svg-path="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
  />
</template>

<style scoped lang="scss"></style>
