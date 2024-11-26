<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <table>
      <slot></slot>
    </table>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableHead.scss';

table {
  border-collapse: separate;
  border-spacing: 0;

  width: 100%;
  border-radius: var(--main-border-radius);
  background-color: var(--main-background-color-accent-1);
}

.wrapper {
  overflow-x: auto;
  overflow-y: auto;
  height: calc(100% - 20px);

  position: relative;

  background-color: var(--main-background-color-accent-1);

  border-style: var(--main-border-style);
  border-color: var(--main-background-color-accent-1);
  border-width: 10px;
  border-radius: var(--main-border-radius);
}
</style>
