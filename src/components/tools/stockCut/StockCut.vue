<script setup>
import { ref } from "vue";

import { stockCutRequest } from "@/requests/tools";
import { useNotificationStore } from "@/stores/notification.js";
import SolverInput from "@/components/tools/stockCut/SolverInput.vue";
import SolverOutput from "@/components/tools/stockCut/SolverOutput.vue";

// Stores
const notificationStore = useNotificationStore();

const solverInput = ref({
  max_length: 1000,
  cut_width: 5,
  target_sizes: [{ length: 100, quantity: 4 }],
});

const solverOutput = ref({
  solved: false,
  job: {
    max_length: 0,
    cut_width: 0,
    target_sizes: [],
  },
  solver_type: "",
  time_us: 0,
  lengths: [[]],
});

const solving = ref(false);
const solved = ref(false);

function onSolve() {
  solving.value = true;
  solved.value = false;
  stockCutRequest.postSolver(solverInput.value).then((response) => {
    if (response.status == 200) {
      setTimeout(() => {
        solved.value = true;
      }, 250);
      solverOutput.value = response.data;
      solverInput.value = response.data.job;
      notificationStore.info = `Solved in ${response.data.time_us}ms using ${response.data.solver_type}`;
    } else if (response.status == 406) {
      notificationStore.warning = response.data.detail;
    } else if (response.status == 422) {
      notificationStore.warning = "Input is incomplete";
    } else if (response.status == 507) {
      notificationStore.warning = response.data.detail;
    } else {
      notificationStore.warning = "Something went really wrong";
    }
    setTimeout(() => {
      solving.value = false;
    }, 250);
  });
}

function onAdd() {
  solverInput.value.target_sizes.push({ length: 0, quantity: 0 });
}
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>Stock Cut Solver</h1>
      <SolverInput
        :solver-input="solverInput"
        :solving="solving"
        :on-solve="onSolve"
        :on-add="onAdd"
      />
      <Transition>
        <SolverOutput v-if="solved" :solver-output="solverOutput" />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.scope {
  width: 100%;
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
