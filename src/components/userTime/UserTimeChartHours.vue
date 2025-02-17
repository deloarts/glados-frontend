<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import Vue3Autocounter from 'vue3-autocounter'

import { useUserStore } from '@/stores/user'
import { useUserTimeStore } from '@/stores/userTime'

ChartJS.register(ArcElement, Tooltip, Legend)

const userStore = useUserStore()
const userTimeStore = useUserTimeStore()

const startHours = ref(0)
const startPercent = ref(0)

const chartLabels = ref<Array<string>>([''])
const chartDataset = ref<Array<number>>([0])
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: [
      {
        backgroundColor: ['rgba(54, 162, 235, 0.8)', '#282828'],
        borderColor: ['rgba(54, 162, 235, 0.9)', '#007acc'],
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
        label: function (data: any) {
          console.log(data)
          return Number(data.formattedValue).toFixed(1) + ' Hours'
        },
      },
    },
  },
}

const percentage = computed<number | null>(() => {
  return userStore.user.work_hours_per_week
    ? (chartData.value.datasets[0].data[0] * 100) / userStore.user.work_hours_per_week
    : null
})

function setStartHours() {
  startHours.value = chartData.value.datasets[0].data[0]
}

function setStartPercent() {
  startPercent.value = percentage.value || 0
}

function updateChart() {
  let sumOfWeek = 0
  let restOfWeek = 0
  for (let i = 0; i < userTimeStore.weekSum.length; i++) {
    sumOfWeek += userTimeStore.weekSum[i]
  }
  if (userStore.user.work_hours_per_week) {
    restOfWeek = userStore.user.work_hours_per_week - sumOfWeek
    if (restOfWeek < 0) {
      restOfWeek = 0
    }
  }

  const data = [sumOfWeek, restOfWeek]
  const labels = ['Worked', 'Open']

  chartLabels.value = labels
  chartDataset.value = data
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
        <h1>Total hours this week</h1>
        <div class="chart">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
    <div class="value">
      <Vue3Autocounter
        :startAmount="startHours"
        :endAmount="chartData.datasets[0].data[0]"
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
  top: -142px;

  width: 300px;
  height: min-content;

  text-align: center;

  font-size: 16px;
  font-family: var(--main-font-head);
  font-weight: bold;
}
</style>
