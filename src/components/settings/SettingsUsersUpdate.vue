<script lang="ts">
import Toggle from "@vueform/toggle";
import ButtonUpdateUser from "@/components/elements/ButtonUpdateUser.vue";
import { usersRequest } from "@/requests/users";
import { usersService } from "@/services/users.service";

export default {
  name: 'SettingsUsersUpdate',
  props: ["selectedUserId"],
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
        id: 0,
        is_active: false,
        is_superuser: false,
        is_systemuser: false,
        username: "",
        full_name: "",
        email: "",
        password: "",
      }
    };
  },
  methods: {
    getUser() {
      usersRequest.getUsersId(this.selectedUserId).then(response => {
        this.formData = response.data;
      })
    },
    updateUser() {
      usersRequest.putUsers(this.selectedUserId, this.formData).then(response => {
        this.getUser();
        usersService.clearCache();
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
          this.notificationWarning = "Failed to update user."
        }
      })
    }
  },
  watch: {
    selectedUserId() {
      if (this.selectedUserId == 0) {
        this.formData = {
          id: 0,
          is_active: false,
          is_superuser: false,
          is_systemuser: false,
          username: "",
          full_name: "",
          email: "",
          password: "",
        }
      } else {
        this.getUser();
      }
    }
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
        <div id="superuser" class="grid-item-center">
          <Toggle v-model="formData.is_superuser" :disabled="formData.is_systemuser"></Toggle>
        </div>
        <div id="superuser-text" class="grid-item-left">
          Superuser
        </div>
        <div id="active" class="grid-item-center">
          <Toggle v-model="formData.is_active" :disabled="formData.is_systemuser"></Toggle>
        </div>
        <div id="active-text" class="grid-item-left">
          Active
        </div>
        <div id="username" class="grid-item-center">
          <input class="text-input" v-model="formData.username" type="text" placeholder="Username"
            :disabled="formData.is_systemuser">
        </div>
        <div id="full-name" class="grid-item-center">
          <input class="text-input" v-model="formData.full_name" placeholder="Name">
        </div>
        <div id="email" class="grid-item-center">
          <input class="text-input" v-model="formData.email" placeholder="Mail">
        </div>
        <div id="password" class="grid-item-center">
          <input class="text-input" v-model="formData.password" placeholder="Password"
            :disabled="formData.is_systemuser">
        </div>
        <div id="btn">
          <ButtonUpdateUser v-on:click="updateUser" text="Update User"></ButtonUpdateUser>
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