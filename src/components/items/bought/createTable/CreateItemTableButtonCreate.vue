<script setup lang="ts">
import ButtonItemCreate from '@/components/elements/ButtonItemCreate.vue'
</script>

<template>
  <td @contextmenu.prevent="">
    <ButtonItemCreate text="" />
  </td>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableItem.scss';

td {
  width: min-content;
  padding: 2px;
}
</style>
