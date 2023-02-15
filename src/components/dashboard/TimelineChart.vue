<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: "TimelineChart",
  props: ["datasets"],
  components: {
    Bar
  },
  data() {
    return {
      chartDatasets: [{
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }],
      chartLabels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        // datasets: {
        //   doughnut: {
        //     borderWidth: 0,
        //   }
        // },
        scales: {
          x: {
            ticks: { color: "white", beginAtZero: true }
          },
          y: {
            ticks: { color: "white", beginAtZero: true }
          }
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "white",
              font: {
                size: 14
              }
            },
          }
        }
      }
    }
  },
  methods: {
    applyData() {

      for (var i = 0; i < this.datasets.length; i++) {

      }

      // var data = [];
      // var labels = [];
      // for (const key in this.datasets) {
      //   labels.push(key);
      //   data.push(this.datasets[key]);
      // }
      // this.labels = labels;
      // this.data = data;
    }
  },
  mounted() {
    this.applyData();
  },
  watch: {
    datasets() {
      this.applyData();
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.chartLabels,
        datasets: this.chartDatasets
      }
    }
  }
}
</script>

<template>
  <div class="scope">
    <h1>Bought Items Timeline</h1>
    <div class="wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>


<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/chartBase.scss';
</style>
