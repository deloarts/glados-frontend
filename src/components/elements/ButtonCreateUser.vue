<script lang="ts">
export default {
  name: 'ButtonCreateUser',
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
            d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z">
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
  background-color: rgb(25, 216, 0);
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