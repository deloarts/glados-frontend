<script setup lang="ts">
import ButtonDelete from '@/components/elements/ButtonDelete.vue'
</script>

<template>
  <td @contextmenu.prevent="">
    <ButtonDelete text="" />
  </td>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableItem.scss';

td {
  width: min-content;
  padding: 2px;
}
</style>
