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
    localStorage.setItem("gladosTokenValue", "");
    localStorage.setItem("gladosTokenType", "");
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

  function get() {
    loading.value = true;

    usersRequest.getUsersMe().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        user.value = response.data;
      } else {
        logout();
        router.push({ name: "Login" });
      }
    });
  }
  function fetch() {
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
      setTimeout(fetch.bind(this), constants.patchUserStoreInterval);
    });
  }

  onBeforeMount(() => {
    get();
  });

  return {
    loading,
    user,
    get,
    fetch,
    logout,
  };
});

export const useUsersStore = defineStore("users", () => {
  const loading = ref<boolean>(false);
  const users = ref<UserSchema[]>([]);

  function clear() {
    users.value = [];
  }

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

  function get() {
    loading.value = true;
    usersRequest.getUsers().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        users.value = response.data;
      }
    });
  }

  function fetch() {
    console.log("Users store requesting users ...");
    loading.value = true;

    usersRequest.getUsers().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        users.value = response.data;
        console.log("Users store got data from server.");
      }
      setTimeout(fetch.bind(this), constants.patchUsersStoreInterval);
    });
  }

  onBeforeMount(() => {
    get();
  });

  return { loading, users, get, clear, fetch, getNameByID };
});
