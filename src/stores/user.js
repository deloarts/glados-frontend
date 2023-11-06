import { ref, onBeforeMount } from "vue";
import { defineStore } from "pinia";

import constants from "@/constants";
import router from "@/router/index";
import { usersRequest } from "@/requests/users";

export const useUserStore = defineStore("user", () => {
  const loading = ref(false);

  const username = ref("");
  const full_name = ref("");
  const email = ref("");
  const is_active = ref("");
  const is_superuser = ref("");
  const is_adminuser = ref("");
  const is_guestuser = ref("");
  const is_systemuser = ref("");
  const id = ref("");
  const created = ref("");

  function logout() {
    username.value = "";
    full_name.value = "";
    email.value = "";
    is_active.value = "";
    is_superuser.value = "";
    is_adminuser.value = "";
    is_guestuser.value = "";
    is_systemuser.value = "";
    id.value = "";
    created.value = "";
    console.log("Logged out user");
  }

  function getUser() {
    console.log("User store is requesting user ...");
    loading.value = true;

    usersRequest.getUsersMe().then((response) => {
      loading.value = false;
      if (response.status === 200) {
        username.value = response.data.username;
        full_name.value = response.data.full_name;
        email.value = response.data.email;
        is_active.value = response.data.is_active;
        is_superuser.value = response.data.is_superuser;
        is_adminuser.value = response.data.is_adminuser;
        is_guestuser.value = response.data.is_guestuser;
        is_systemuser.value = response.data.is_systemuser;
        id.value = response.data.id;
        created.value = response.data.created;
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
    username,
    full_name,
    email,
    is_active,
    is_superuser,
    is_adminuser,
    is_guestuser,
    is_systemuser,
    id,
    created,
    logout,
  };
});

export const useUsersStore = defineStore("users", () => {
  const loading = ref(false);
  const users = ref([
    {
      username: "",
      full_name: "",
      email: "",
      is_active: "",
      is_superuser: "",
      is_adminuser: "",
      is_guestuser: "",
      is_systemuser: "",
      id: "",
      created: "",
    },
  ]);

  function getNameByID(userID) {
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
