<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  value?: string;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
});

const cssWidth = computed<string>(() => {
  return String(props.width) + "px";
});
</script>

<template>
  <th @contextmenu.prevent="">
    <div>
      <span>{{ props.value == null ? props.name : props.value }}</span>
    </div>
  </th>
</template>

<style scoped lang="scss">
@import "@/scss/dataTable/tableHead.scss";

th {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
}
</style>
