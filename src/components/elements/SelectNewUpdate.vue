<script lang="ts">
import { hostRequest } from "@/requests/host";

export default {
  name: 'SelectLimit',
  props: ["selection"],
  emits: ["update:selection"],
  data() {
    return {
      value: this.selection,
      options: []
    }
  },
  methods: {
    onChange() {
      this.$emit("update:selection", this.value);
    }
  },
  watch: {
    selection() {
      this.value = this.selection;
    }
  },
  mounted() {
    hostRequest.getConfigItemsBoughtUnits().then(response => {
      if (response.status === 200) {
        this.options = response.data.values;
        if (this.selection == null) {
          this.$emit("update:selection", this.options[0]);
        }
      }
      else {
        // @ts-ignore
        this.notificationWarning = "Failed to fetch available units.";
      }
    }).catch(error => {

    });
  }
};
</script>

<template>
  <div class="box">
    <select v-model="value" @change="onChange">
      <option v-for="option in options" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped lang='scss'>
@import '../../assets/variables.scss';

select {
  width: 150px;
  height: 40px;

  // font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1em;
  text-align: center;
  
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;

  margin: 0;

  background-color: $main-background-color-dark;
  color: white;

  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
}
</style>