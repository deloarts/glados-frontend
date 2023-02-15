<script lang="ts">
export default {
  name: 'ButtonDelete',
  props: {
    text: String,
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
          <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z">
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