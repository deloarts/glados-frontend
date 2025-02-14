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

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import { useUserTimeStore } from '@/stores/userTime'
import { useResolutionStore } from '@/stores/resolution'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const languageStore = useLanguageStore()
const userStore = useUserStore()
const userTimeStore = useUserTimeStore()
const resolutionStore = useResolutionStore()

const labelColor = computed(() => {
  return userStore.user.theme == 'dark' ? 'white' : 'black'
})

const datasets = ref<Array<any>>([])
const labels = ref<Array<string>>([])

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: datasets.value,
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
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
}

function updateChart() {
  if (resolutionStore.gtMinWidthTablet) {
    labels.value = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  } else {
    labels.value = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }

  datasets.value = [
    {
      label: 'Current Week',
      data: userTimeStore.week,
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(54, 162, 235)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1,
    },
  ]
}

onMounted(() => {
  userTimeStore.fetchCurrentWeek()
  updateChart()
})

watch(
  () => userTimeStore,
  () => {
    userTimeStore.fetchCurrentWeek()
  },
  { deep: true },
)

watch(
  () => userTimeStore.week,
  () => {
    updateChart()
  },
  { deep: true },
)
</script>

<template>
  <div class="scope">
    <div class="chart-base-scope">
      <div class="chart-base-wrapper">
        <Bar class="chart" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/chart/chartBase.scss';

.scope {
  width: calc(100% - 10px);
  height: 100%;

  padding-left: 4px;
}

.chart-base-scope {
  border-color: transparent;
  padding: 0;
}

.chart-base-wrapper {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
