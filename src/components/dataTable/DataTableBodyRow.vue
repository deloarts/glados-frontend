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
@import "@/scss/variables.scss";

tr {
  margin: 0;
  padding: 0;
  height: 24px;
  border-bottom: solid thin $main-color;
}

tr:nth-child(even) > td {
  color: white;
  background: $table-row-even;
}

tr:nth-child(odd) > td {
  color: white;
  background: $table-row-odd;
}

tr:hover > td {
  background: $table-row-hover !important;
}

tr.selected > td {
  background: $table-row-active !important;
}

tr.selected:hover > td {
  background: $table-row-active-hover !important;
}
</style>
