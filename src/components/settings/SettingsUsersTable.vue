<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { useUsersStore } from '@/stores/user'

import IconCheckboxBlank from '@/components/icons/IconCheckboxBlank.vue'
import IconCheckboxMarked from '@/components/icons/IconCheckboxMarked.vue'

// Props & Emits
const props = defineProps<{
  selectedUserID: number
}>()
const emit = defineEmits<{
  (e: 'update:selectedUserID', v: number): void
}>()

// Store
const languageStore = useLanguageStore()
const usersStore = useUsersStore()

function onSelect(id: number) {
  if (props.selectedUserID == id) {
    id = 0
  }
  emit('update:selectedUserID', id)
}
</script>

<template>
  <div class="table-base-scope">
    <div class="table-base-container">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="user-id">
              {{ languageStore.l.settings.users.table.id }}
            </th>
            <th class="first sticky-col" id="username">
              {{ languageStore.l.settings.users.table.username }}
            </th>
            <th class="first sticky-col" id="full-name">
              {{ languageStore.l.settings.users.table.fullName }}
            </th>
            <th class="first sticky-col" id="mail">
              {{ languageStore.l.settings.users.table.mail }}
            </th>
            <th class="first sticky-col" id="checkbox">
              {{ languageStore.l.settings.users.table.active }}
            </th>
            <th class="first sticky-col" id="checkbox">
              {{ languageStore.l.settings.users.table.superUser }}
            </th>
            <th class="first sticky-col" id="checkbox">
              {{ languageStore.l.settings.users.table.adminUser }}
            </th>
            <th class="first sticky-col" id="checkbox">
              {{ languageStore.l.settings.users.table.guestUser }}
            </th>
            <th class="first sticky-col" id="checkbox">
              {{ languageStore.l.settings.users.table.rfid }}
            </th>
            <th class="first sticky-col" id="created">
              {{ languageStore.l.settings.users.table.createdDate }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in usersStore.users"
            :key="user.id"
            v-on:click="onSelect(user.id)"
            v-bind:class="{ selected: props.selectedUserID == user.id }"
          >
            <td id="user-id" class="sticky-col">{{ user.id }}</td>
            <td id="username" class="sticky-col">{{ user.username }}</td>
            <td id="full-name" class="sticky-col">{{ user.full_name }}</td>
            <td id="mail" class="sticky-col">{{ user.email }}</td>
            <td id="checkbox" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_active" class="checked" />
              <IconCheckboxBlank v-else class="unchecked" />
            </td>
            <td id="checkbox" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_superuser" class="checked" />
              <IconCheckboxBlank v-else class="unchecked" />
            </td>
            <td id="checkbox" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_adminuser" class="checked" />
              <IconCheckboxBlank v-else class="unchecked" />
            </td>
            <td id="checkbox" class="sticky-col">
              <IconCheckboxMarked v-if="user.is_guestuser" class="checked" />
              <IconCheckboxBlank v-else class="unchecked" />
            </td>
            <td id="checkbox" class="sticky-col">
              <IconCheckboxMarked v-if="user.hashed_rfid" class="checked" />
              <IconCheckboxBlank v-else class="unchecked" />
            </td>
            <td id="created" class="sticky-col">{{ user.created }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/table/tableBase.scss';

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
  width: 200px;
  min-width: 200px;
}

#mail {
  width: 200px;
  min-width: 200px;
}

#checkbox {
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

.checked {
  color: var(--main-green);
}

.unchecked {
  color: var(--main-red);
}
</style>
