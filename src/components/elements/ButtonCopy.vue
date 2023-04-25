<script lang="ts">
import router from "../../router/index";

export default {
  name: 'ButtonCopy',
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
            d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z">
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