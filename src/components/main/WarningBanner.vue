<script setup lang="ts"></script>

<template>
  <div class="demo">
    <div class="row">
      <div class="cell">
        <span>This app runs in demo mode! All changes will be deleted.</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/variables.scss' as *;

.demo {
  display: table;
  table-layout: fixed;

  width: 100%;
  height: var(--demo-height);

  font-family: var(--main-font-text);
  font-size: 1em;
  font-weight: thin;

  color: white;
  background: var(--main-background-color);

  cursor: default;
}

.row {
  display: table-row;
  height: 100%;
  width: 100%;
}

.cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

span {
  padding: 4px;
  padding-left: 5px;
  padding-right: 5px;

  border-style: solid;
  border-color: var(--main-red);
  border-width: 1px;
  border-radius: var(--main-border-radius);
}
</style>
