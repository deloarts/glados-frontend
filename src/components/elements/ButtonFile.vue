<script setup lang="ts">
import ButtonBase from "@/components/elements/ButtonBase.vue";

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <ButtonBase
    :text="props.text"
    svg-path="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
  />
</template>

<style scoped lang="scss"></style>
