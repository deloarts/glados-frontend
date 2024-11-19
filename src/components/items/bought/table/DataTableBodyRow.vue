<script setup lang="ts">
import { useBoughtItemsControlsStore } from "@/stores/controls";

const controlsStore = useBoughtItemsControlsStore();

interface Props {
  selected: boolean;
  status: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <tr
    v-bind:class="{
      selected: props.selected,
      open: controlsStore.state.rainbow && props.status == 'open',
      requested: controlsStore.state.rainbow && props.status == 'requested',
      ordered: controlsStore.state.rainbow && props.status == 'ordered',
      late: controlsStore.state.rainbow && props.status == 'late',
      partial: controlsStore.state.rainbow && props.status == 'partial',
      delivered: controlsStore.state.rainbow && props.status == 'delivered',
      canceled: controlsStore.state.rainbow && props.status == 'canceled',
      lost: controlsStore.state.rainbow && props.status == 'lost',
      'text-mode': controlsStore.state.textView,
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

tr.open:nth-child(even) > td {
  background: var(--table-background-open-even);
}

tr.open:nth-child(odd) > td {
  background: var(--table-background-open-odd);
}

tr.requested:nth-child(even) > td {
  background: var(--table-background-requested-even);
}

tr.requested:nth-child(odd) > td {
  background: var(--table-background-requested-odd);
}

tr.ordered:nth-child(even) > td {
  background: var(--table-background-ordered-even);
}

tr.ordered:nth-child(odd) > td {
  background: var(--table-background-ordered-odd);
}

tr.late:nth-child(even) > td {
  background: var(--table-background-late-even);
}

tr.late:nth-child(odd) > td {
  background: var(--table-background-late-odd);
}

tr.partial:nth-child(even) > td {
  background: var(--table-background-partial-even);
}

tr.partial:nth-child(odd) > td {
  background: var(--table-background-partial-odd);
}

tr.delivered:nth-child(even) > td {
  background: var(--table-background-delivered-even);
}

tr.delivered:nth-child(odd) > td {
  background: var(--table-background-delivered-odd);
}

tr.canceled:nth-child(even) > td {
  background: var(--table-background-canceled-even);
}

tr.canceled:nth-child(odd) > td {
  background: var(--table-background-canceled-odd);
}

tr.lost:nth-child(even) > td {
  background: var(--table-background-lost-even);
}

tr.lost:nth-child(odd) > td {
  background: var(--table-background-lost-odd);
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

tr.text-mode > td {
  background: white !important;
  color: black !important;

  cursor: text !important;
  user-select: text !important;
}
tr.text-mode:hover > td {
  background: white !important;
  color: black !important;
}
</style>
