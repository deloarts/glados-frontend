<script lang="ts">

export default {
  name: 'SelectLimit',
  props: ["selection", "options"],
  emits: ["update:selection"],
  data() {
    return {
      value: this.selection
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
  }
};
</script>

<template>
  <div class="box">
    <select v-model="value" @change="onChange">
      <option v-for="option in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped lang='scss'>
@import '../../assets/variables.scss';

select {
  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  text-align: center;

  margin: 0;
  padding: 0;
  width: 130px;
  height: 30px;

  background-color: rgb(0, 122, 204);
  color: white;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);

  -webkit-appearance: button;
  appearance: button;
  border: none;
  outline: none;
  border-radius: 3px;
}
</style>