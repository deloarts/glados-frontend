<script setup lang="ts"></script>

<template>
  <th @contextmenu.prevent=""></th>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/dataTable/tableHead.scss";

th {
  min-width: 0px;
  max-width: 100%;
  width: 100%;
}
</style>
