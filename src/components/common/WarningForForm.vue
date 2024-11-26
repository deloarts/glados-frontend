<script setup lang="ts">
import IconWarning from '@/components/icons/IconWarning.vue'

// Props & Emits
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div class="grid">
        <div class="grid-area-icon grid-item-center">
          <IconWarning class="warning-icon" />
        </div>
        <div class="grid-area-text grid-item-left">
          <span>{{ props.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

.grid {
  grid-template-rows: 40px;
  grid-template-columns: 50px auto;
  grid-template-areas: 'grid-area-icon grid-area-text';
}

.grid-area-icon {
  grid-area: grid-area-icon;
}

.grid-area-text {
  grid-area: grid-area-text;
}

.warning-icon {
  color: var(--main-orange);
  height: 24px;
  width: 24px;
  vertical-align: middle;
}
</style>
