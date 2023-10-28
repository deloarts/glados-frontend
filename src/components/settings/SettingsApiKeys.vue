<script setup>
import { ref, watch } from "vue"

const selectedKeyID = ref(0)
const mode = ref("create")

function onSelect(id) {
  selectedKeyID.value = id
}

watch(selectedKeyID, () => {
  if (selectedKeyID.value == 0) { mode.value = "create" }
  else { mode.value = "update" }
})
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>Registered API Keys</h1>
      <span class="gray">Coming soon...</span>
    </div>
    <hr>
    <div class="content" v-if="mode == 'create'">
      <h1>Create Key</h1>
      <span class="gray">Coming soon...</span>
    </div>
    <div class="content" v-if="mode == 'update'">
      <h1>Update Key</h1>
      <span class="gray">Coming soon...</span>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

.content {
  padding: 30px;
}

.gray {
  color: gray;
}
</style>