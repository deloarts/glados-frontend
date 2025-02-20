<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

import type { DiscSpace } from '@/models/host'

ChartJS.register(ArcElement, Tooltip, Legend)

// Props & Emits
const props = defineProps<{
  dataset: DiscSpace
}>()

const chartLabels = ref<Array<string>>([''])
const chartDataset = ref<Array<number>>([0])
const chartData = computed(() => {
  return {
    labels: chartLabels.value,
    datasets: [
      {
        backgroundColor: ['#007acc', '#282828'],
        borderColor: ['#007acc', '#007acc'],
        data: chartDataset.value,
      },
    ],
  }
})
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
    datalabels: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (data: any) {
          console.log(data)
          return data.formattedValue + ' GiB'
        },
      },
    },
  },
}

function updateChart() {
  const data = []
  const labels = []
  for (const key in props.dataset) {
    labels.push(key)
    //@ts-ignore
    data.push(props.dataset[key])
  }
  chartLabels.value = labels
  chartDataset.value = data
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
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<style scoped lang="scss">
@use '@/scss/chart/chartBase.scss';
</style>
