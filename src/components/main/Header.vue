<script setup>
import { ref, computed, watch } from "vue";
import Typed from "typed.js";

import config from "@/config";
import { useUserStore } from "@/stores/user.js";
// Store
const userStore = useUserStore();
const full_name = computed(() => userStore.full_name);
const email = computed(() => userStore.email);

function typeFullName() {
  new Typed(".full-name", {
    strings: [full_name.value],
    typeSpeed: 4,
    showCursor: false,
    onComplete: () => {
      typeMail();
    },
  });
}

function typeMail() {
  new Typed(".email", {
    strings: [email.value],
    typeSpeed: 3,
    showCursor: false,
  });
}

watch(full_name, () => typeFullName());
</script>

<template>
  <div class="header">
    <div class="row">
      <div class="cell">Glados</div>
      <div class="cell">
        <span class="dev" v-if="config.debug">DEBUG MODE</span>
      </div>
      <div class="cell">
        <div class="userdata">
          <span class="full-name"> </span>
          <span class="email"> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.header {
  display: table;
  table-layout: fixed;

  width: 100%;
  height: 50px;

  font-family: $main-font;
  font-size: 1em;
  font-weight: thin;

  color: white;
  background: $main-color;

  cursor: default;
}

.row {
  display: table-row;
  height: 100%;
  width: 100%;
}

.cell {
  display: table-cell;
  vertical-align: middle;

  padding-left: 15px;
  padding-right: 15px;
}

.cell:nth-child(1) {
  text-align: left;

  font-family: $main-font-2;
  font-size: 1.75em;
  font-weight: thin;
}

.cell:nth-child(2) {
  text-align: center;
}

.cell:nth-child(3) {
  text-align: right;
}

.userdata {
  display: table;
  float: right;
}

.full-name {
  display: table-row;
  text-align: right;
  height: 20px;
  font-size: 1em;
  padding: 0;
  margin: 0;
}

.email {
  display: table-row;
  text-align: right;
  height: 14px;
  font-size: 0.7em;
  padding: 0;
  margin: 0;
}

.dev {
  padding: 10px;
  background-color: red;
  border-radius: $main-border-radius;
  border-color: darkred;
}
</style>
