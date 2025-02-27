<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

import LoadingSpinner from '@/components/spinner/LoadingSpinner.vue'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Props & Emits
const props = defineProps(['dataset'])

const languageStore = useLanguageStore()
const userStore = useUserStore()

const labelColor = computed(() => {
  return userStore.user.theme == 'dark' ? 'white' : 'black'
})
const chartLabels = ref()
const chartDatasets = ref([0])
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: chartDatasets.value,
  }
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { ticks: { display: true, color: labelColor.value, beginAtZero: true } },
    y: { ticks: { display: true, color: labelColor.value, beginAtZero: true } },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: labelColor.value,
        font: { size: 14 },
      },
    },
    datalabels: {
      display: false,
    },
  },
}

function updateChart() {
  if (props.dataset != null) {
    const datasets = []

    datasets.push({
      data: props.dataset.created,
      label: languageStore.l.dashboard.labels.created,
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
    })
    datasets.push({
      data: props.dataset.ordered,
      label: languageStore.l.dashboard.labels.ordered,
      backgroundColor: 'rgba(206, 192, 0, 1)',
    })
    datasets.push({
      data: props.dataset.delivered,
      label: languageStore.l.dashboard.labels.delivered,
      backgroundColor: 'rgba(50, 205, 50, 1)',
    })

    chartLabels.value = props.dataset.months
    chartDatasets.value = datasets
  }
}

onMounted(() => {
  updateChart()
})
watch(
  () => props.dataset,
  () => {
    updateChart()
  },
)
</script>

<template>
  <div class="chart-base-scope">
    <h1>{{ languageStore.l.dashboard.timelineItems }}</h1>
    <div class="chart-base-wrapper">
      <div v-if="props.dataset == null" class="spinner-wrapper">
        <LoadingSpinner />
      </div>
      <Bar v-else :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/chart/chartBase.scss';

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
