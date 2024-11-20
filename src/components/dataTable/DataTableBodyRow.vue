<script setup lang="ts">
interface Props {
  selected: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <tr
    v-bind:class="{
      selected: props.selected,
    }"
  >
    <slot></slot>
  </tr>
</template>

<style lang="scss">
tr {
  margin: 0;
  padding: 0;
  height: 24px;
  border-bottom: solid thin var(--main-color);
}

tr:nth-child(even) > td {
  color: var(--main-text-color);
  background: var(--table-row-even);
}

tr:nth-child(odd) > td {
  color: var(--main-text-color);
  background: var(--table-row-odd);
}

tr:hover > td {
  background: var(--table-row-hover) !important;
}

tr.selected > td {
  background: var(--table-row-active) !important;
}

tr.selected:hover > td {
  background: var(--table-row-active-hover) !important;
}
</style>
