<script setup lang="ts">
import ButtonBase from "@/components/elements/ButtonBase.vue";

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <ButtonBase
    :text="props.text"
    svg-path="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
  />
</template>

<style scoped lang="scss"></style>
