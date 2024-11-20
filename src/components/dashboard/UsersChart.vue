<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

import LoadingSpinner from "@/components/spinner/LoadingSpinner.vue";

import { useLanguageStore } from "@/stores/language";
import { useUserStore } from "@/stores/user";

ChartJS.register(ArcElement, Tooltip, Legend);

// Props & Emits
const props = defineProps(["dataset"]);

const languageStore = useLanguageStore();
const userStore = useUserStore();

const labelColor = computed(() => {
  return userStore.user.theme == "dark" ? "white" : "black";
});
const chartLabels = ref([""]);
const chartDataset = ref([0]);
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: [
      {
        backgroundColor: [
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
        color: labelColor.value,
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
    var data = [];
    var labels = [];
    for (const key in props.dataset) {
      labels.push(key);
      data.push(props.dataset[key]);
    }
    chartLabels.value = labels;
    chartDataset.value = data;
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
    <h1>{{ languageStore.l.dashboard.createdItems }}</h1>
    <div class="chart-base-wrapper">
      <div v-if="props.dataset == null" class="spinner-wrapper">
        <LoadingSpinner />
      </div>
      <Doughnut v-else :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
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
