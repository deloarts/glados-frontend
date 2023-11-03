import { ref } from "vue";
import { defineStore } from "pinia"

export const useUserStore = defineStore('user', () => {
  const username = ref("")
  const full_name = ref("")
  const email = ref("")
  const is_active = ref("")
  const is_superuser = ref("")
  const is_adminuser = ref("")
  const is_guestuser = ref("")
  const is_systemuser = ref("")
  const id = ref("")
  const created = ref("")

  function logout() {
    username.value = ""
    full_name.value = ""
    email.value = ""
    is_active.value = ""
    is_superuser.value = ""
    is_adminuser.value = ""
    is_guestuser.value = ""
    is_systemuser.value = ""
    id.value = ""
    created.value = ""
    console.log("Logged out user")
  }

  return { username, full_name, email, is_active, is_superuser, is_adminuser, is_guestuser, is_systemuser, id, created, logout }
})

export const useUsersStore = defineStore('users', () => {
  const users = ref([{
    username: "",
    full_name: "",
    email: "",
    is_active: "",
    is_superuser: "",
    is_adminuser: "",
    is_guestuser: "",
    is_systemuser: "",
    id: "",
    created: ""
  }])

  function getNameByID(userID) {
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id == userID) { return users.value[i].full_name }
    }
    return "Unknown User"
  }

  return { users, getNameByID }
})