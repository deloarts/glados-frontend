<script setup>
import { useUsersStore } from "@/stores/user.js";

import IconCheckboxBlank from "@/components/icons/IconCheckboxBlank.vue";
import IconCheckboxMarked from "@/components/icons/IconCheckboxMarked.vue";

// Props & Emits
const props = defineProps(["selectedUserID"]);
const emit = defineEmits(["update:selectedUserID"]);

// Store
const usersStore = useUsersStore();

function onSelect(id) {
  if (props.selectedUserID == id) {
    id = 0;
  }
  emit("update:selectedUserID", id);
}
</script>

<template>
  <div class="table-base-scope">
    <div class="table-base-container">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="user-id">ID</th>
            <th class="first sticky-col" id="username">Username</th>
            <th class="first sticky-col" id="full-name">Full Name</th>
            <th class="first sticky-col" id="mail">Mail</th>
            <th class="first sticky-col" id="active">Active</th>
            <th class="first sticky-col" id="superuser">Superuser</th>
            <th class="first sticky-col" id="superuser">Admin</th>
            <th class="first sticky-col" id="superuser">Guest</th>
            <th class="first sticky-col" id="created">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in usersStore.users"
            :key="user.id"
            v-on:click="onSelect(user.id)"
            v-bind:class="{ selected: props.selectedUserID == user.id }"
          >
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
            <td id="adminuser" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_adminuser" />
              <IconCheckboxBlank v-else />
            </td>
            <td id="guestuser" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_guestuser" />
              <IconCheckboxBlank v-else />
            </td>
            <td id="created" class="sticky-col">{{ user.created }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/table/tableBase.scss";

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

#adminuser {
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#guestuser {
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

svg {
  width: 15px;
  height: 15px;
}
</style>
