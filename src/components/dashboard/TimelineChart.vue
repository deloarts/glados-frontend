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

import LoadingSpinner from "@/components/spinner/LoadingSpinner.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Props & Emits
const props = defineProps(["dataset"]);

const chartLabels = ref();
const chartDatasets = ref([0]);
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: chartDatasets.value,
  };
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { ticks: { display: true, color: "white", beginAtZero: true } },
    y: { ticks: { display: true, color: "white", beginAtZero: true } },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "white",
        font: { size: 14 },
      },
    },
    datalabels: {
      display: false,
    },
  },
};

function updateChart() {
  if (props.dataset != null) {
    var datasets = [];

    datasets.push({
      data: props.dataset.created,
      label: "Created",
      backgroundColor: "#25CCF7",
    });
    datasets.push({
      data: props.dataset.ordered,
      label: "Ordered",
      backgroundColor: "#cec000",
    });
    datasets.push({
      data: props.dataset.delivered,
      label: "Delivered",
      backgroundColor: "#38a938",
    });

    chartLabels.value = props.dataset.months;
    chartDatasets.value = datasets;
  }
}

onMounted(() => {
  updateChart();
});
watch(
  () => props.dataset,
  () => {
    updateChart();
  },
);
</script>

<template>
  <div class="chart-base-scope">
    <h1>Bought Items Timeline</h1>
    <div class="chart-base-wrapper">
      <div v-if="props.dataset == null" class="spinner-wrapper">
        <LoadingSpinner />
      </div>
      <Bar v-else :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/chart/chartBase.scss";

.spinner-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.spinner {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 15px);
}
</style>
