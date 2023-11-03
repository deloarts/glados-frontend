<script setup>
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

const chartLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const chartDataset = ref([0]);
const chartData = computed(() => {});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { ticks: { color: "white", beginAtZero: true } },
    y: { ticks: { color: "white", beginAtZero: true } },
  },
  plugins: {
    legend: {
      position: "bottom",
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
    <h1>Bought Items Timeline</h1>
    <div class="chart-base-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/chart/chartBase.scss";
</style>
