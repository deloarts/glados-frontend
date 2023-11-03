<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

// Props & Emits
const props = defineProps(["dataset"]);

const chartLabels = ref([""]);
const chartDataset = ref([0]);
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: [
      {
        backgroundColor: [
          "#e6e6e6",
          "#f09646",
          "#cbe646",
          "#fa6450",
          "#9cf79c",
          "#5afa5a",
          "#6d6d6d",
          "#501e1e",
        ],
        data: chartDataset.value,
      },
    ],
  };
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  datasets: {
    doughnut: { borderWidth: 0 },
  },
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "white",
        font: { size: 14 },
      },
    },
  },
};

function updateChart() {
  var data = [];
  var labels = [];
  for (const key in props.dataset) {
    labels.push(key);
    data.push(props.dataset[key]);
  }
  chartLabels.value = labels;
  chartDataset.value = data;
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
    <h1>Bought Items Status</h1>
    <div class="chart-base-wrapper">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/chart/chartBase.scss";
</style>
