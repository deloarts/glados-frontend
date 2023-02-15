<script lang="ts"> 
import { usersService } from "@/services/users.service";
import IconCheckboxBlank from "@/components/icons/IconCheckboxBlank.vue";
import IconCheckboxMarked from "@/components/icons/IconCheckboxMarked.vue";

export default {
  name: "SettingsUsersTable",
  props: ["selectedUserId"],
  emits: ["update:selectedUserId"],
  components: {
    IconCheckboxBlank,
    IconCheckboxMarked
  },
  data() {
    return {
      users: [{
        id: 0,
        username: "",
        full_name: "",
        email: "",
        is_active: false,
        is_superuser: false,
        created: "",
      }],
    };
  },
  mounted() {
    usersService.clearCache();
    this.autoFetchUsers();
  },
  beforeMount() {
    this.users = [];
  },
  beforeDestroy() {
  },
  methods: {
    onSelect(id: number) {
      if (this.selectedUserId == id) {id = 0;}
      this.$emit("update:selectedUserId", id);
    },
    autoFetchUsers() {
      if (this.$route.path != '/settings/users') {
        console.info('Stopped updating routine for users: User leaved site.');
      } else {
        usersService.getUsers().then(users => {
          this.users = users.data;
          setTimeout(this.autoFetchUsers.bind(this), 1000);
        });
      }
    }
  }, 
}
</script>

<template>
  <div class="scope">
    <div class="table-wrapper">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="user-id">ID</th>
            <th class="first sticky-col" id="username">Username</th>
            <th class="first sticky-col" id="full-name">Full Name</th>
            <th class="first sticky-col" id="mail">Mail</th>
            <th class="first sticky-col" id="active">Active</th>
            <th class="first sticky-col" id="superuser">Superuser</th>
            <th class="first sticky-col" id="created">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id" v-on:click="onSelect(user.id)"
            v-bind:class="{ 'selected': selectedUserId == user.id}">
            <td id="user-id" class="sticky-col">{{ user.id }}</td>
            <td id="username" class="sticky-col">{{ user.username }}</td>
            <td id="full-name" class="sticky-col">{{ user.full_name }}</td>
            <td id="mail" class="sticky-col">{{ user.email }}</td>
            <td id="active" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_active" />
              <IconCheckboxBlank v-else />
            </td>
            <td id="superuser" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_superuser" />
              <IconCheckboxBlank v-else />
            </td>
            <td id="created" class="sticky-col">{{ user.created }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/tableBase.scss';

#user-id {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
  text-align: center;
}

#username {
  width: 80px;
  min-width: 80px;
}

#full-name {
  width: 150px;
  min-width: 150px;
}

#mail {
  width: 150px;
  min-width: 150px;
}

#active {
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#superuser {
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#created {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
  text-align: center;
}
</style>