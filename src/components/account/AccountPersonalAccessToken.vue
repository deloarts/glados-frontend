<script lang="ts">
import * as Toggle from "@vueform/toggle";
import ButtonNewPersonalAccessToken from "@/components/elements/ButtonNewPersonalAccessToken.vue";
import { usersRequest } from "@/requests/users";

export default {
    name: "AccountPersonalAccessToken",
    components: {
        Toggle,
        ButtonNewPersonalAccessToken
    },
    data() {
        return {
            // Globals
            notificationWarning: this.$notificationWarning,
            notificationInfo: this.$notificationInfo,

            // Vars
            personalAccessToken: ""
        };
    },
    methods: {
        newToken() {
            usersRequest.putUsersMePAT().then(response => {
                if (response.status == 200) {
                    //@ts-ignore
                    this.notificationInfo = `Created new token.`
                    this.personalAccessToken = response.data;
                } else {
                    //@ts-ignore
                    this.notificationWarning = response.data.detail;
                }
            })
        },
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
                <div id="token" class="grid-item-center">
                    <input class="text-input" v-model="personalAccessToken" type="text" placeholder="Secret" readonly>
                </div>
                <div id="btn">
                    <ButtonNewPersonalAccessToken v-on:click="newToken" text="New Token"></ButtonNewPersonalAccessToken>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/gridBase.scss';

#grid {
    grid-template-rows: 40px 40px;
    grid-template-columns: auto;
    grid-template-areas: "token"
        "btn"
}

#btn {
    grid-area: btn;
}

#token {
    grid-area: token;
}
</style>