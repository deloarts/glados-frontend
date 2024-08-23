<script setup>
import ToolsControls from "@/components/tools/ToolsControls.vue";
import StockCut2D from "@/components/tools/stockCut2D/StockCut2D.vue";
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div id="controls">
          <ToolsControls />
        </div>
        <div id="display">
          <StockCut2D />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

#grid {
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas:
    "controls"
    "display";
}

#controls {
  grid-area: controls;
}

#display {
  grid-area: display;
}

::-webkit-scrollbar {
  display: none;
}
</style>
