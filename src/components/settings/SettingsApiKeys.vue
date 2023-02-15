<script lang="ts">
export default {
  name: 'SettingsApiKeys',
  components: {
  },
  data() {
    return {
      selectedKeyId: 0,
      mode: "create",
    };
  },
  mounted() {
  },
  beforeMount() {
  },
  beforeDestroy() {
  },
  methods: {
    onSelect(id: number) {
      this.selectedKeyId = id;
    },
  }, 
  watch: {
    selectedKeyId() {
      if (this.selectedKeyId == 0) { this.mode = "create" }
      else { this.mode = "update" }
    }
  }
}
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
@import '@/assets/variables.scss';

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