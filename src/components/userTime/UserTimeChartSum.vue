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
import type { ChartDataset } from 'chart.js'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import { useUserTimeStore } from '@/stores/userTime'
import { useResolutionStore } from '@/stores/resolution'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const languageStore = useLanguageStore()
const userStore = useUserStore()
const userTimeStore = useUserTimeStore()
const resolutionStore = useResolutionStore()

const gtMinWidthTablet = computed(() => resolutionStore.gtMinWidthTablet)

const labelColor = computed(() => {
  return userStore.user.theme == 'dark' ? 'white' : 'black'
})

const datasets = ref<Array<ChartDataset>>([])
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
    x: { stacked: true, ticks: { stepSize: 1, color: labelColor.value } },
    y: {
      stacked: false,
      ticks: { stepSize: 1, beginAtZero: true, color: labelColor.value },
      grid: { color: 'rgba(100, 100, 100, 0.4)' },
    },
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
  if (gtMinWidthTablet.value) {
    labels.value = [
      languageStore.l.common.days.monday,
      languageStore.l.common.days.tuesday,
      languageStore.l.common.days.wednesday,
      languageStore.l.common.days.thursday,
      languageStore.l.common.days.friday,
      languageStore.l.common.days.saturday,
      languageStore.l.common.days.sunday,
    ]
  } else {
    labels.value = [
      languageStore.l.common.shortDays.monday,
      languageStore.l.common.shortDays.tuesday,
      languageStore.l.common.shortDays.wednesday,
      languageStore.l.common.shortDays.thursday,
      languageStore.l.common.shortDays.friday,
      languageStore.l.common.shortDays.saturday,
      languageStore.l.common.shortDays.sunday,
    ]
  }

  datasets.value = [
    {
      label: 'Current Week',
      data: userTimeStore.weekSum,
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderWidth: 1,
    },
  ]
}

onMounted(() => {
  updateChart()
})

watch(
  () => userTimeStore.weekSum,
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
