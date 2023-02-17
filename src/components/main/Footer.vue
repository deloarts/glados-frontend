<script lang="ts">
import constants from "@/constants";

export default {
    name: 'Footer',
    data() {
        return {
            hover: false,
            text: `v${constants.version} (v${constants.serverVersion})`
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<template>
    <div class="footer" @mouseover="hover=true" @mouseleave="hover=false">
        <span v-if="hover">the cake is a lie</span>
        <span v-else="hover">{{ text }}</span>
    </div>
</template>

<style scoped lang="scss">
@import "../../assets/variables.scss";

.footer {
    display: table;

    width: 100%;
    height: 100%;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.75em;
    font-weight: thin;

    color: white;
    background: $main-color;

    cursor: default;
}

.footer span {
    display: table-cell;

    text-align: center;
    vertical-align: middle;
}
</style>
