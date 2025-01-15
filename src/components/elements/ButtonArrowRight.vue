<script setup lang="ts">
import ButtonBase from "@/components/elements/ButtonBase.vue";

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <ButtonBase
    :text="props.text"
    svg-path="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
  />
</template>

<style scoped lang="scss"></style>
