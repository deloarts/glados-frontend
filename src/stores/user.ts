import { ref, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

import constants from '@/constants'
import router from '@/router/index'
import { usersRequest } from '@/requests/users'

import type { AvailableOption } from '@/models/controls'
import type { UserSchema } from '@/schemas/user'

import { useLanguageStore } from './language'
import { setDark, setLight } from '@/helper/theme.helper'

export const useUserStore = defineStore('user', () => {
  const _languageStore = useLanguageStore()

  const loading = ref<boolean>(false)
  const user = ref<UserSchema>({
    id: null,
    created: null,
    username: null,
    full_name: null,
    email: null,
    language: 'enGB',
    theme: 'dark',
    is_active: false,
    is_superuser: false,
    is_adminuser: false,
    is_guestuser: false,
    is_systemuser: false,
  })

  function logout() {
    localStorage.setItem('gladosTokenValue', '')
    localStorage.setItem('gladosTokenType', '')
    user.value = {
      id: null,
      created: null,
      username: null,
      full_name: null,
      email: null,
      language: 'enGB',
      theme: 'dark',
      is_active: false,
      is_superuser: false,
      is_adminuser: false,
      is_guestuser: false,
      is_systemuser: false,
    }
    console.log('Logged out user')
  }

  async function get() {
    loading.value = true
    return usersRequest.getUsersMe().then((response) => {
      loading.value = false
      if (response.status === 200) {
        user.value = response.data
        _languageStore.apply(user.value.language)
        if (user.value.theme == null || user.value.theme == 'dark') {
          setDark()
        } else {
          setLight()
        }
      } else {
        logout()
        router.push({ name: 'Login' })
      }
      return response
    })
  }

  function fetch() {
    console.log('User store is requesting user ...')
    get().then(() => {
      setTimeout(fetch, constants.patchUserStoreInterval)
    })
  }

  onBeforeMount(() => {
    fetch()
  })

  return {
    loading,
    user,
    get,
    logout,
  }
})

export const useUsersStore = defineStore('users', () => {
  const loading = ref<boolean>(false)
  const users = ref<Array<UserSchema>>([])
  const usersOptions = ref<Array<AvailableOption>>([])
  const usersOptionsFilter = ref<Array<AvailableOption>>([])

  function clear() {
    users.value = []
  }

  function getNameByID(userID: number | null) {
    if (userID == null) {
      return ''
    }
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id == userID) {
        return users.value[i].full_name
      }
    }
    return 'Unknown User'
  }

  async function get() {
    loading.value = true
    return usersRequest.getUsers().then((response) => {
      loading.value = false
      if (response.status === 200) {
        loading.value = false
        users.value = response.data

        const tempUsersOptions = []
        const tempUsersOptionsFilter = [{ text: 'All', value: null }]
        for (let i = 0; i < users.value.length; i++) {
          tempUsersOptions.push({
            text: users.value[i].full_name,
            value: String(users.value[i].id),
          })
          tempUsersOptionsFilter.push({
            text: users.value[i].full_name,
            value: users.value[i].id,
          })
        }
        usersOptions.value = tempUsersOptions
        usersOptionsFilter.value = tempUsersOptionsFilter
      }
      return response
    })
  }

  function fetch() {
    console.log('Users store requesting users ...')
    get().then(() => {
      setTimeout(fetch, constants.patchUsersStoreInterval)
    })
  }

  onBeforeMount(() => {
    clear()
    fetch()
  })

  return {
    loading,
    users,
    usersOptions,
    usersOptionsFilter,
    get,
    clear,
    getNameByID,
  }
})
