<script lang="ts">
import IconWarning from "@/components/icons/IconWarning.vue";
import config from "@/config";
import constants from "@/constants";

export default {
  name: "Resolution",
  components: { IconWarning },
  data() {
    return {
      notificationInfo: this.$notificationInfo,
      showBox: false,
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < constants.minWidth && !config.debug) { this.showBox = true; }
      else { this.showBox = false; }
    }
  },
  watch: {
  },
  mounted() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>

<template>
  <div class="scope" v-if="showBox">
    <div class="coat"></div>
    <div class="container">
      <div id="grid">
        <div id="icon">
          <IconWarning></IconWarning>
        </div>
        <div id="text">
          Screen resolution not supported.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import "@/assets/variables.scss";


.coat {
  z-index: 9999;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: $main-background-color;
}

.container {
  z-index: 9999;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 150px;
  transform: translate(-50%, -50%);

  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.25em;
  color: white;

  opacity: 1;
  animation: fade 0.25s linear;
}

#grid {
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 100px;
  grid-template-columns: 50px auto;
  grid-template-areas: 'icon text';

  background: orangered;

  border-width: 3px;
  border-radius: 5px;
  border-style: solid;
  border-color: darkred;
}

#icon {
  grid-area: icon;
  display: flex;
  justify-content: center;
  align-items: center;
}

#text {
  grid-area: text;
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
