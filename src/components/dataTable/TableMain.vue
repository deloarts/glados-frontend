<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <table>
      <slot></slot>
    </table>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/dataTable/tableHead.scss";

table {
  border-collapse: separate;
  border-spacing: 0;

  width: 100%;
  border-radius: $main-border-radius;
  background-color: var(--main-background-color-accent-1);
}

.wrapper {
  overflow-x: auto;
  overflow-y: auto;
  height: calc(100% - 20px);

  position: relative;

  background-color: var(--main-background-color-accent-1);

  border-style: solid;
  border-color: var(--main-background-color-accent-1);
  border-width: 10px;
  border-radius: $main-border-radius;
}
</style>
