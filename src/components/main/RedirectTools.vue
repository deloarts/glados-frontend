<script lang="ts">
import router from "@/router/index";

export default {
  name: "RedirectTools",
  created() {
    router.push({ name: "ToolsStockCut" });
  },
};
</script>

<template></template>
