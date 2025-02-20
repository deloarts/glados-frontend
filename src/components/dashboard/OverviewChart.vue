<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

import LoadingSpinner from '@/components/spinner/LoadingSpinner.vue'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'

ChartJS.register(ArcElement, Tooltip, Legend)

// Props & Emits
const props = defineProps(['dataset'])

const languageStore = useLanguageStore()
const userStore = useUserStore()

const labelColor = computed(() => {
  return userStore.user.theme == 'dark' ? 'white' : 'black'
})
const chartLabels = ref([''])
const chartDataset = ref([0])
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: [
      {
        borderColor: [
          'rgba(37, 204, 247, 1)',
          'rgba(240, 150, 70, 1)',
          'rgba(206, 192, 0, 1)',
          'rgba(250, 100, 80, 1)',
          'rgba(111, 151, 0, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(109, 109, 109, 1)',
          'rgba(255, 55, 55, 1)',
        ],
        backgroundColor: [
          'rgba(37, 204, 247, 1)',
          'rgba(240, 150, 70, 1)',
          'rgba(206, 192, 0, 1)',
          'rgba(250, 100, 80, 1)',
          'rgba(111, 151, 0, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(109, 109, 109, 1)',
          'rgba(255, 55, 55, 1)',
        ],
        data: chartDataset.value,
      },
    ],
  }
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  datasets: {
    doughnut: { borderWidth: 2, borderAlign: 'inner' },
  },
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: labelColor.value,
        font: { size: 14 },
      },
    },
    datalabels: {
      display: false,
    },
  },
})

function updateChart() {
  if (props.dataset != null) {
    const data = []
    const labels = []
    for (const key in props.dataset) {
      labels.push(key)
      data.push(props.dataset[key])
    }
    chartLabels.value = labels
    chartDataset.value = data
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
