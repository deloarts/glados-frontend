<script setup lang="ts"></script>

<template>
  <tr>
    <slot></slot>
  </tr>
</template>

<style lang="scss">
@use '@/scss/dataTable/tableHead.scss';

tr {
  margin: 0;
  padding: 0;
  height: 40px;
}

tr > th {
  font-family: var(--main-font-text);
  text-align: 'center';
  font-weight: normal;
  font-size: var(--main-font-text-size);
}

tr:nth-child(1) > th {
  top: 0px;

  height: 40px;
  min-height: 40px;
  max-height: 40px;

  font-family: var(--main-font-head);
  font-weight: bold;
}

tr:nth-child(2) > th {
  top: 40px;

  height: 30px;
  min-height: 30px;
  max-height: 30px;

  border-bottom: solid thin var(--main-background-color-accent-2);
}
</style>
