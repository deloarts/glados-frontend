<script setup>
import { ref, onMounted, watch, computed, toDisplayString } from "vue";
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
        backgroundColor: ["#007acc", "#282828"],
        borderColor: ["#007acc", "#007acc"],
        data: chartDataset.value,
      },
    ],
  };
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: -135,
  circumference: 270,
  datasets: {
    doughnut: { borderWidth: 1 },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (data) {
          console.log(data);
          return data.formattedValue + " GiB";
        },
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
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/chart/chartBase.scss";
</style>
