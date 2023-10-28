<script setup>

</script>

<template>
  <div class="header">
    <span>Glados</span>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.header {
  display: table;

  width: 100%;
  height: 100%;

  font-family: 'Lobster', sans-serif;
  font-size: 2.25em;
  font-weight: thin;

  color: white;
  background: $main-color;

  cursor: default;
}

.header span {
  display: table-cell;

  text-align: center;
  vertical-align: middle;
}
</style>
