<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "OverviewChart",
  props: ["dataset"],
  components: {
    Doughnut
  },
  data() {
    return {
      data: [0],
      labels: [""],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        datasets: {
          doughnut: {
            borderWidth: 0,
          }
        },
        plugins: {
          legend: {
            position: "right",
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
      var data = [];
      var labels = [];
      for (const key in this.dataset) {
        labels.push(key);
        data.push(this.dataset[key]);
      }
      this.labels = labels;
      this.data = data;
    }
  },
  mounted() {
    this.applyData();
  },
  watch: {
    dataset() {
      this.applyData();
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: ['#e6e6e6', '#f09646', '#cbe646', '#fa6450', '#9cf79c', '#5afa5a', '#6d6d6d', '#501e1e'],
            data: this.data
          }
        ]
      }
    }
  }
}
</script>

<template>
  <div class="scope">
    <h1>Bought Items Status</h1>
    <div class="wrapper">
      <Doughnut :data="chartData" :options="options" />
    </div>
  </div>
</template>


<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/chartBase.scss';
</style>
