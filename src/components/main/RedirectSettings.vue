<script lang="ts">
import router from "@/router/index";

export default {
    name: "RedirectSettings",
    created() {
        router.push({ name: "SettingsHost" });
    }
}
</script>

<template>

</template>