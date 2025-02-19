<script setup lang="ts">
import { ref, onMounted, watch, computed, onBeforeUnmount } from 'vue'
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

import moment from 'moment'

import { useIntervalFn } from '@vueuse/core'

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

const current = ref<Array<number[]>>([])
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
    x: { stacked: true, ticks: { stepSize: 1, beginAtZero: false, color: labelColor.value } },
    y: {
      stacked: false,
      min: 0,
      max: 24,
      ticks: { stepSize: 1, beginAtZero: false, color: labelColor.value },
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

const { pause, resume } = useIntervalFn(() => {
  updateChart()
}, 1000)

function getCurrent(): Array<number[]> {
  const c: Array<number[]> = [[], [], [], [], [], [], []]
  if (userTimeStore.loggedInSince != null) {
    const day = moment().day() - 1
    const loginTime = moment.utc(userTimeStore.loggedInSince).local()
    const logoutTime = moment()
    const login = Number((loginTime.hours() + loginTime.minutes() / 60).toFixed(1))
    const logout = Number(logoutTime.hours() + logoutTime.minutes() / 60).toFixed(1)
    c[day] = [login, logout]
  }
  current.value = c
  return c
}

function updateChart() {
  let tempLabels = []
  const tempDatasets = []

  if (gtMinWidthTablet.value) {
    tempLabels = [
      languageStore.l.common.days.monday,
      languageStore.l.common.days.tuesday,
      languageStore.l.common.days.wednesday,
      languageStore.l.common.days.thursday,
      languageStore.l.common.days.friday,
      languageStore.l.common.days.saturday,
      languageStore.l.common.days.sunday,
    ]
  } else {
    tempLabels = [
      languageStore.l.common.shortDays.monday,
      languageStore.l.common.shortDays.tuesday,
      languageStore.l.common.shortDays.wednesday,
      languageStore.l.common.shortDays.thursday,
      languageStore.l.common.shortDays.friday,
      languageStore.l.common.shortDays.saturday,
      languageStore.l.common.shortDays.sunday,
    ]
  }

  tempDatasets.push({
    label: 'Current',
    data: getCurrent(),
    backgroundColor: [
      'rgba(0, 204, 92, 0.8)',
      'rgba(0, 204, 92, 0.8)',
      'rgba(0, 204, 92, 0.8)',
      'rgba(0, 204, 92, 0.8)',
      'rgba(0, 204, 92, 0.8)',
      'rgba(0, 204, 92, 0.8)',
      'rgba(0, 204, 92, 0.8)',
    ],
    borderWidth: 0,
  })
  for (let i = 0; i < userTimeStore.weekTime.length; i++) {
    tempDatasets.push({
      label: `Entry #${i + 1}`,
      data: userTimeStore.weekTime[i],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderWidth: 0,
    })
  }

  if (JSON.stringify(labels.value) != JSON.stringify(tempLabels)) {
    labels.value = tempLabels
  }
  if (JSON.stringify(datasets.value) != JSON.stringify(tempDatasets)) {
    datasets.value = tempDatasets
  }
}

onMounted(() => {
  updateChart()
  resume()
})

onBeforeUnmount(() => {
  pause()
})
</script>

<template>
  <div class="scope">
    <div class="chart-base-scope">
      <div class="chart-base-wrapper">
        <h1>{{ languageStore.l.userTime.common.entriesForThisWeek }}</h1>
        <Bar class="chart" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/chart/chartBase.scss';

h1 {
  margin-top: 0;
  font-size: 16px;
}

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
  height: calc(100% - 60px);
  padding: 20px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
