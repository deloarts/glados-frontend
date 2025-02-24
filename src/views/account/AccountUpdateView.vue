<script setup lang="ts">
import AccountControls from '@/components/account/AccountControls.vue'
import AccountUpdate from '@/components/account/AccountUpdate.vue'
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div class="grid">
        <div class="grid-area-controls">
          <AccountControls />
        </div>
        <div class="grid-area-display">
          <AccountUpdate />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/views.scss';
@use '@/scss/grid/gridBase.scss';

.grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'grid-area-controls'
    'grid-area-display'
    'grid-area-info';
}

.grid-area-controls {
  grid-area: grid-area-controls;
}

.grid-area-info {
  grid-area: grid-area-info;
}

.grid-area-display {
  grid-area: grid-area-display;
}

::-webkit-scrollbar {
  display: none;
}
</style>
