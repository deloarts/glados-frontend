<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import type { ChartDataset } from 'chart.js'

import Vue3Autocounter from 'vue3-autocounter'

import { useUserStore } from '@/stores/user'
import { useUserTimeStore } from '@/stores/userTime'
import { useLanguageStore } from '@/stores/language'

import moment from 'moment'

import { useIntervalFn } from '@vueuse/core'

ChartJS.register(ArcElement, Tooltip, Legend)

const userStore = useUserStore()
const userTimeStore = useUserTimeStore()
const languageStore = useLanguageStore()

const startHours = ref(0)
const startPercent = ref(0)

const chartLabels = ref<Array<string>>([''])
const chartDataset = ref<Array<number>>([0])
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: [
      {
        backgroundColor: ['rgba(54, 162, 235, 0.8)', currentColor.value, 'rgba(40, 40, 40, 0.1)'],
        borderColor: [
          'rgba(250, 250, 250, 0.2)',
          'rgba(250, 250, 250, 0.2)',
          'rgba(250, 250, 250, 0.2)',
        ],
        data: chartDataset.value,
      },
    ],
  }
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: 60,
  rotation: -135,
  circumference: 270,
  datasets: {
    doughnut: { borderWidth: 1 },
  },
  plugins: {
    legend: { display: false },
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (data: ChartDataset) {
          const duration = moment.duration(data.formattedValue, 'hours')
          const formatted = moment.utc(duration.asMilliseconds()).format('HH:mm')
          return formatted
        },
      },
    },
  },
}

const current = ref<number>(0)
const currentColor = computed<string>(() => {
  return current.value >= 0 ? 'rgba(0, 204, 92, 0.8)' : 'rgba(255, 50, 50, 0.8)'
})
const percentage = computed<number | null>(() => {
  return userStore.user.work_hours_per_week
    ? ((chartData.value.datasets[0].data[0] + current.value) * 100) /
        userStore.user.work_hours_per_week
    : null
})

const { pause, resume } = useIntervalFn(() => {
  updateChart()
}, 1000)

function setStartHours() {
  startHours.value = Number(current.value) + Number(chartData.value.datasets[0].data[0])
}

function setStartPercent() {
  startPercent.value = percentage.value || 0
}

function getCurrent(): number {
  let c = 0
  if (userTimeStore.loggedInSince != null) {
    c = moment.duration(moment().diff(moment.utc(userTimeStore.loggedInSince))).asMinutes() / 60
  }
  current.value = c
  return c
}

function updateChart() {
  getCurrent()
  let sumOfWeek = 0
  let restOfWeek = 0

  for (let i = 0; i < userTimeStore.weekSum.length; i++) {
    sumOfWeek += userTimeStore.weekSum[i]
  }
  if (userStore.user.work_hours_per_week) {
    restOfWeek = userStore.user.work_hours_per_week - sumOfWeek - current.value
    if (restOfWeek < 0) {
      restOfWeek = 0
    }
  }

  const data = [sumOfWeek, current.value, restOfWeek]
  const labels = ['Worked', 'Current', 'Open']

  chartLabels.value = labels
  chartDataset.value = data
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
        <h1>{{ languageStore.l.userTime.common.totalHoursThisWeek }}</h1>
        <div class="chart">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
    <div class="value">
      <Vue3Autocounter
        :startAmount="startHours"
        :endAmount="Number(current) + Number(chartData.datasets[0].data[0])"
        :duration="0.5"
        @finished="setStartHours"
      />
      /
      {{ userStore.user.work_hours_per_week ? userStore.user.work_hours_per_week : '-' }}
      <br />
      <Vue3Autocounter
        :startAmount="startPercent"
        :endAmount="percentage"
        :duration="0.6"
        @finished="setStartPercent"
      />%
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
  padding-top: 20px;
  height: 180px;
}

.value {
  // z-index: 10;

  display: table-cell;
  position: relative;
  top: -145px;

  width: 300px;
  height: min-content;

  text-align: center;

  font-size: 16px;
  font-family: var(--main-font-head);
  font-weight: bold;
}
</style>
