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
          "#f09646",
          "#cec000",
          "#fa6450",
          "#6f9700",
          "#32CD32",
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
    <h1>{{ languageStore.l.dashboard.boughtItemStatus }}</h1>
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
