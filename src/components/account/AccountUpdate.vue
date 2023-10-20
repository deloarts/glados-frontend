<script lang="ts">
//@ts-ignore
import Toggle from "@vueform/toggle";
import ButtonUpdateUser from "@/components/elements/ButtonUpdateUser.vue";
import { usersRequest } from "@/requests/users";

export default {
    name: "AccountUpdate",
    components: {
        Toggle,
        ButtonUpdateUser
    },
    data() {
        return {
            // Globals
            notificationWarning: this.$notificationWarning,
            notificationInfo: this.$notificationInfo,

            // Vars
            formData: {
                username: "",
                full_name: "",
                email: "",
                password: "",
            }
        };
    },
    methods: {
        getUser() {
            usersRequest.getUsersMe().then(response => {
                this.formData = response.data;
            })
        },
        updateUser() {
            usersRequest.putUsersMe(this.formData).then(response => {
                this.getUser();
                if (response.status == 200) {
                    //@ts-ignore
                    this.notificationInfo = `Updated user ${this.formData.username}.`
                } else if (response.status == 404) {
                    //@ts-ignore
                    this.notificationWarning = "User not found."
                } else if (response.status == 422) {
                    //@ts-ignore
                    this.notificationWarning = "Data is incomplete."
                } else {
                    //@ts-ignore
                    this.notificationWarning = response.data.detail;
                }
            })
        }
    },
    watch: {
    },
    mounted() {
        this.getUser();
    },
    beforeMount() {
    }
};
</script>

<template>
    <div class="scope">
        <div class="container">
            <div id="grid">
                <div id="username" class="grid-item-center">
                    <input class="text-input" v-model="formData.username" type="text" placeholder="Username">
                </div>
                <div id="full-name" class="grid-item-center">
                    <input class="text-input" v-model="formData.full_name" placeholder="Name">
                </div>
                <div id="email" class="grid-item-center">
                    <input class="text-input" v-model="formData.email" placeholder="Mail">
                </div>
                <div id="password" class="grid-item-center">
                    <input class="text-input" v-model="formData.password" placeholder="Password">
                </div>
                <div id="btn">
                    <ButtonUpdateUser v-on:click="updateUser" text="Save Changes"></ButtonUpdateUser>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/gridBase.scss';

#grid {
    grid-template-rows: 40px 40px 40px 40px 40px;
    grid-template-columns: 50px auto;
    grid-template-areas: "username username"
        "full-name full-name"
        "email email"
        "password password"
        "btn btn"
}

#btn {
    grid-area: btn;
}

#username {
    grid-area: username;
}

#full-name {
    grid-area: full-name;
}

#password {
    grid-area: password;
}

#email {
    grid-area: email;
}
</style>