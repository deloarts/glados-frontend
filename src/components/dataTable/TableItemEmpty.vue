<script setup lang="ts"></script>

<template>
  <td @contextmenu.prevent=""></td>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableItem.scss';

td {
  min-width: 0px;
  max-width: 100%;
  width: 100%;
}
</style>
