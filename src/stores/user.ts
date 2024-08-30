import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import router from "@/router/index";
import { usersRequest } from "@/requests/users";

import type { UserSchema } from "@/schemas/user";

export const useUserStore = defineStore("user", () => {
  const loading = ref<boolean>(false);
  const user = ref<UserSchema>({
    id: null,
    created: null,
    username: null,
    full_name: null,
    email: null,
    is_active: false,
    is_superuser: false,
    is_adminuser: false,
    is_guestuser: false,
    is_systemuser: false,
  });

  function logout() {
    user.value = {
      id: null,
      created: null,
      username: null,
      full_name: null,
      email: null,
      is_active: false,
      is_superuser: false,
      is_adminuser: false,
      is_guestuser: false,
      is_systemuser: false,
    };
    console.log("Logged out user");
  }

  function getUser() {
    console.log("User store is requesting user ...");
    loading.value = true;

    usersRequest.getUsersMe().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        user.value = response.data;
        console.log("User store got data from server.");
      } else {
        console.warn("User store could not get user.");
        logout();
        router.push({ name: "Login" });
      }
      setTimeout(getUser.bind(this), constants.patchUserStoreInterval);
    });
  }

  onBeforeMount(() => {
    getUser();
  });

  return {
    loading,
    user,
    logout,
  };
});

export const useUsersStore = defineStore("users", () => {
  const loading = ref<boolean>(false);
  const users = ref<UserSchema[]>([]);

  function getNameByID(userID: number) {
    if (userID == null) {
      return "";
    }

    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id == userID) {
        return users.value[i].full_name;
      }
    }
    return "Unknown User";
  }

  function getUsers() {
    console.log("Users store requesting users ...");
    loading.value = true;

    usersRequest.getUsers().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        users.value = response.data;
        console.log("Users store got data from server.");
      }
      setTimeout(getUsers.bind(this), constants.patchUsersStoreInterval);
    });
  }

  onBeforeMount(() => {
    getUsers();
  });

  return { loading, users, getNameByID };
});
