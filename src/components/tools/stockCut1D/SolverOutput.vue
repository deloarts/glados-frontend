<script setup>
import { ref, onMounted, watch, computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useLanguageStore } from "@/stores/language";
import { useResolutionStore } from "@/stores/resolution";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
);

// Props & Emits
const props = defineProps(["solverOutput"]);

// Stores
const languageStore = useLanguageStore();
const resolutionStore = useResolutionStore();

const chartLabels = ref([""]);
const chartDataset = ref([{}]);
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: chartDataset.value,
  };
});
const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    barPercentage: 0.8,
    categoryPercentage: 1,
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        ticks: {
          min: 0,
          max: props.solverOutput.job.max_length,
        },
      },
      y: {
        stacked: true,
        ticks: {
          display: resolutionStore.gtMinWidthTablet,
        },
      },
    },
    datasets: {},
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "white",
        font: { size: 16, weight: "bold" },
      },
    },
  };
});
const chartColor = [
  "#25CCF7",
  "#FD7272",
  "#54a0ff",
  "#00d2d3",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#ecf0f1",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#7f8c8d",
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#dfe6e9",
  "#00b894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#ffeaa7",
  "#fab1a0",
  "#ff7675",
  "#fd79a8",
  "#fdcb6e",
  "#e17055",
  "#d63031",
  "#feca57",
  "#5f27cd",
  "#54a0ff",
  "#01a3a4",
];
const canvasHeight = ref("120px");

function updateChart() {
  chartOptions.value.scales.x.ticks.max = props.solverOutput.job.max_length;

  chartDataset.value = [{}];
  chartLabels.value = [];

  const stock_items = props.solverOutput.lengths.length;
  var max_items_in_stock_item = 0;
  for (var i = 0; i < stock_items; i++) {
    let current_subset = props.solverOutput.lengths[i].length;
    if (current_subset > max_items_in_stock_item) {
      max_items_in_stock_item = current_subset;
    }
  }

  canvasHeight.value = 120 + stock_items * 30 + "px";

  var inverted = [];
  var cut_widths = [];
  for (var i = 0; i < max_items_in_stock_item; i++) {
    inverted.push([]);
    cut_widths.push([]);
    for (var j = 0; j < stock_items; j++) {
      inverted[i][j] = null;
      cut_widths[i][j] = null;
    }
  }

  for (var i = 0; i < stock_items; i++) {
    for (var j = 0; j < max_items_in_stock_item; j++) {
      inverted[j][i] = props.solverOutput.lengths[i][j];
      if (inverted[j][i] != null) {
        cut_widths[j][i] = props.solverOutput.job.cut_width;
      }
    }
  }

  var dataset = [];
  var labels = [];

  for (var i = 0; i < stock_items; i++) {
    labels.push(`${languageStore.l.tools.labels.stockNumber}${i + 1}`);
  }

  for (var i = 0; i < max_items_in_stock_item; i++) {
    if (i > 0) {
      dataset.push({
        data: cut_widths[i],
        label: languageStore.l.tools.labels.cutWidth,
        backgroundColor: "#ff0000",
        datalabels: {
          display: false,
        },
      });
    }

    dataset.push({
      data: inverted[i],
      label: languageStore.l.tools.labels.itemLength,
      backgroundColor: chartColor[i],
    });
  }

  chartLabels.value = labels;
  chartDataset.value = dataset;
}

onMounted(() => {
  updateChart();
});
watch(
  () => props.solverOutput,
  () => {
    updateChart();
  },
);
</script>

<template>
  <div class="scope">
    <div class="container">
      <div class="chart-base-title">
        {{ languageStore.l.tools.banner.solution }}
      </div>
      <div class="wrapper">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/chart/chartBase.scss";

.scope {
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
  // padding-top: 10px;
}

.container {
  height: 100%;
  padding: 10px;
  margin: 4px;

  background-color: var(--main-background-color-accent-1);
  border-radius: var(--main-border-radius);
}

.wrapper {
  width: calc(100% - 30px);
  height: v-bind("canvasHeight");

  padding: 15px;
  margin: 0;
}
</style>
