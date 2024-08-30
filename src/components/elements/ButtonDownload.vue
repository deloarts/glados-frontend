<script setup lang="ts">
import ButtonBase from "@/components/elements/ButtonBase.vue";

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <ButtonBase
    :text="props.text"
    svg-path="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"
  />
</template>

<style scoped lang="scss"></style>
