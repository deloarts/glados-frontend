<script lang="ts">
import Vue3Autocounter from 'vue3-autocounter';

export default {
  name: "ItemCount",
  props: ["text", "count"],
  components: {
    Vue3Autocounter
  },
  data() {
    return {
      start: 0,
    };
  },
  methods: {
    setStart() {
      this.start = this.count;
    }
  },
  watch: {
  },
  mounted() {
  },
  beforeMount() {
  }
};
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="count" class="grid-item-center">
          <Vue3Autocounter :startAmount="start" :endAmount="count" :duration="1" @finished="setStart"></Vue3Autocounter>
        </div>
        <div id="text" class="grid-item-left">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/gridBase.scss';

.scope {
  background-color: $main-background-color-dark;
}

#grid {
  grid-template-rows: 60px;
  grid-template-columns: 60px auto;
  grid-template-areas: "count text";
}

#count {
  grid-area: count;
  font-size: 2.5em;
  font-weight: 700;
}

#text {
  grid-area: text;
  font-size: 1.25em;
  font-weight: 700;
}
</style>