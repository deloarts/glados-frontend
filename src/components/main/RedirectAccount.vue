<script lang="ts">
import router from "@/router/index";

export default {
  name: "RedirectAccount",
  created() {
    router.push({ name: "AccountUpdate" });
  }
}
</script>

<template>

</template>