<script setup>
import { ref, watch } from "vue"

import Spinner from "@/components/spinner/LoadingSpinner.vue";
import SettingsUsersTable from "@/components/settings/SettingsUsersTable.vue";
import SettingsUsersCreate from "@/components/settings/SettingsUsersCreate.vue";
import SettingsUsersUpdate from "@/components/settings/SettingsUsersUpdate.vue";

const selectedUserID = ref(0)
const mode = ref("create")

function onSelect(id) {
  selectedUserID.value = id
}

watch(selectedUserID, () => {
  if (selectedUserID.value == 0) { mode.value = "create" }
  else { mode.value = "update" }
})
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>Registered Users</h1>
      <SettingsUsersTable v-model:selectedUserID="selectedUserID"></SettingsUsersTable>
    </div>
    <hr>
    <div class="content" v-if="mode == 'create'">
      <h1>Create User</h1>
      <SettingsUsersCreate></SettingsUsersCreate>
    </div>
    <div class="content" v-if="mode == 'update'">
      <h1>Update User #{{ selectedUserID }}</h1>
      <SettingsUsersUpdate v-model:selectedUserID="selectedUserID"></SettingsUsersUpdate>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/scss/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

.content {
  padding: $main-padding;
}

.gray {
  color: gray;
}
</style>