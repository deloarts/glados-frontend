<script lang="ts">
import router from "../../router/index";

export default {
  name: 'ButtonEdit',
  props: {
    text: String
  },
  methods: {
  },
};
</script>

<template>
  <button class="imi-btn imi-btn-primary">
    <designer-imi-icon>
      <i class="imi-icon">
        <svg height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg" fill="white">
          <path
            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z">
          </path>
        </svg>
      </i>
    </designer-imi-icon>
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
  background-color: rgb(237, 170, 0);
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