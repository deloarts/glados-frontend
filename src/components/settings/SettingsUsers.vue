<script setup>
import { ref, watch } from "vue";

import Spinner from "@/components/spinner/LoadingSpinner.vue";
import SettingsUsersTable from "@/components/settings/SettingsUsersTable.vue";
import SettingsUsersCreate from "@/components/settings/SettingsUsersCreate.vue";
import SettingsUsersUpdate from "@/components/settings/SettingsUsersUpdate.vue";

const selectedUserID = ref(0);
const mode = ref("create");

watch(selectedUserID, () => {
  if (selectedUserID.value == 0) {
    mode.value = "create";
  } else {
    mode.value = "update";
  }
});
</script>

<template>
  <div class="scope">
    <div class="content">
      <div id="grid">
        <div id="registered-h1">
          <h1>Registered Users</h1>
        </div>
        <div id="registered">
          <SettingsUsersTable
            v-model:selectedUserID="selectedUserID"
          ></SettingsUsersTable>
        </div>

        <div id="user-h1" v-if="mode == 'create'">
          <h1>Create User</h1>
        </div>
        <div id="user" v-if="mode == 'create'">
          <SettingsUsersCreate></SettingsUsersCreate>
        </div>

        <div id="user-h1" v-if="mode == 'update'">
          <h1>Update User #{{ selectedUserID }}</h1>
        </div>
        <div id="user" v-if="mode == 'update'">
          <SettingsUsersUpdate
            v-model:selectedUserID="selectedUserID"
          ></SettingsUsersUpdate>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/grid/gridBase.scss";

.scope {
  width: 100%;
  height: 100%;
}

.content {
  height: 100%;
}

#grid {
  grid-template-columns: 100%;
  grid-template-rows: min-content 400px min-content min-content;
  grid-template-areas:
    "registered-h1"
    "registered"
    "user-h1"
    "user";
}

#registered {
  grid-area: registered;
}

#registered-h1 {
  grid-area: registered-h1;
}

#user {
  grid-area: user;
}

#user-h1 {
  grid-area: user-h1;
}
</style>
