<script setup lang="ts">
import LoadingSpinner from '@/components/spinner/LoadingSpinner.vue'
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <button v-bind:class="{ text: props.text != '' }">
    <i class="icon" v-bind:class="{ 'icon-text': props.text != '' }">
      <LoadingSpinner class="spinner" />
    </i>
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
@use '@/scss/button/buttonBase.scss';

.spinner {
  position: absolute;
  top: -2px;
  left: 0;

  margin: 0;
  padding: 0;
  transform: scale(0.65);
}
</style>
