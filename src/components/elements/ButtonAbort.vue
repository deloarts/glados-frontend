<script lang="ts">
import router from "../../router/index";

export default {
  name: 'ButtonAbort',
  props: {
    text: String,
    routeName: String,
  },
  methods: {
    onClick() {
      router.push({ name: this.routeName });
    }
  },
};
</script>

<template>
  
  <button class="imi-btn" v-on:click="onClick">
    <i class="imi-icon">
      <svg height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg" fill="white">
        <path
          d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z">
        </path>
      </svg>
    </i>
    {{ text }}
  </button>
</template>

<style scoped lang='scss'>
@import '../../assets/variables.scss';

button {
  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.9em;
  // margin-right: 6px;
  // margin-bottom: 6px;
  display: inline-flex;
  align-items: center;
  width: 130px;
}

.imi-btn {
  background-color: #e24833;
  border: 1px solid transparent;
  padding: 0 10px;
  height: 32px;
  color: #fff;
  border-radius: 4px;
  display: flex;
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  outline: none;
}

.imi-icon {
  cursor: pointer;
  display: inline-flex;
  margin-right: 10px;
  width: 17px;
  height: 17px;
}
</style>