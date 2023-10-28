<script setup>
import { onBeforeMount } from "vue"
import router from "@/router/index";

onBeforeMount(() =>  {
  router.push({ name: "Dashboard" })
})
</script>

<template>

</template>