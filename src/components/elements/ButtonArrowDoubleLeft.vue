<script setup lang="ts">
import ButtonBase from "@/components/elements/ButtonBase.vue";

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <ButtonBase
    :text="props.text"
    svg-path="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z"
  />
</template>

<style scoped lang="scss"></style>
