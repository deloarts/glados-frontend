<script lang="ts">
import * as Toggle from "@vueform/toggle";
import ButtonCreateUser from "@/components/elements/ButtonCreateUser.vue";
import { usersService } from "@/services/users.service";
import { usersRequest } from "@/requests/users";

export default {
  name: 'SettingsUsersCreate',
  components: {
    Toggle,
    ButtonCreateUser
  },
  data() {
    return {
      // Globals
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,

      // Vars
      formData: {
        is_active: false,
        is_superuser: false,
        username: "",
        full_name: "",
        email: "",
        password: "",
      }
    };
  },
  methods: {
    createUser() {
      usersRequest.postUsers(this.formData).then(response => {
        if (response.status == 200) {
          //@ts-ignore
          this.notificationInfo = `Created user ${this.formData.username}.`
          this.formData = {
            is_active: false,
            is_superuser: false,
            username: "",
            full_name: "",
            email: "",
            password: "",
          }
          usersService.clearCache();
        } else if (response.status == 406) {
          //@ts-ignore
          this.notificationWarning = "User already exists."
        } else if (response.status == 422) {
          //@ts-ignore
          this.notificationWarning = "Data is incomplete."
        } else {
          //@ts-ignore
          this.notificationWarning = "Failed to create new user."
        }
      })
    }
  },
  watch: {
    selectedUserId() {
    }
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
        <div id="superuser" class="grid-item-center">
          <Toggle v-model="formData.is_superuser"></Toggle>
        </div>
        <div id="superuser-text" class="grid-item-left">
          Superuser
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="formData.is_active"></Toggle>
        </div>
        <div id="active-text" class="grid-item-left">
          Active
        </div>
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
          <input class="text-input" v-model="formData.password" placeholder="Password (at least 8 characters)">
        </div>
        <div id="btn">
          <ButtonCreateUser v-on:click="createUser" text="Create User"></ButtonCreateUser>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/gridBase.scss';

#grid {
  grid-template-rows: 40px 40px 40px 40px 25px 25px 40px;
  grid-template-columns: 50px auto;
  grid-template-areas: "username username"
    "full-name full-name"
    "email email"
    "password password"
    "superuser superuser-text"
    "active active-text"
    "btn btn"
}

#btn {
  grid-area: btn;
}

#superuser {
  grid-area: superuser;
}

#superuser-text {
  grid-area: superuser-text;
}

#active {
  grid-area: active;
}

#active-text {
  grid-area: active-text;
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