<script lang="ts">
import AccountUpdate from "@/components/account/AccountUpdate.vue";

export default {
    name: 'AccountView',
    components: {
        AccountUpdate
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    beforeMount() {
    },
    beforeDestroy() {
    },
    methods: {
    },
    watch: {
    }
}
</script>

<template>
    <div class="scope">
        <div class="content">
            <h1>My Account</h1>
            <AccountUpdate />
        </div>
        <hr>
        <div class="content">
            <h1>Personal Access Token</h1>
            <span class="gray">Coming soon...</span>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';

.scope {
    width: 100%;
    height: 100%;
}

.content {
    padding: 30px;
}

.gray {
    color: gray;
}
</style>