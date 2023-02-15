<script lang="ts">
import router from "@/router/index";

export default {
    name: "Redirect",
    created() {
        router.push({ name: "Dashboard" });
    }
}
</script>

<template>

</template>