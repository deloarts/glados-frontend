<script lang="ts"> 
import Spinner from "@/components/spinner/LoadingSpinner.vue";
import SettingsUsersTable from "@/components/settings/SettingsUsersTable.vue";
import SettingsUsersCreate from "@/components/settings/SettingsUsersCreate.vue";
import SettingsUsersUpdate from "@/components/settings/SettingsUsersUpdate.vue";

export default {
  name: 'SettingsUsers',
  components: {
    Spinner,
    SettingsUsersTable,
    SettingsUsersCreate,
    SettingsUsersUpdate
  },
  data() {
    return {
      selectedUserId: 0,
      mode: "create",
    };
  },
  mounted() {
  },
  beforeMount() {
  },
  beforeDestroy() {
  },
  methods: {
    onSelect(id: number) {
      this.selectedUserId = id;
    },
  }, 
  watch: {
    selectedUserId() {
      if (this.selectedUserId == 0) { this.mode = "create" }
      else { this.mode = "update" }
    }
  }
}
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>Registered Users</h1>
      <SettingsUsersTable v-model:selected-user-id="selectedUserId"></SettingsUsersTable>
    </div>
    <hr>
    <div class="content" v-if="mode == 'create'">
      <h1>Create User</h1>
      <SettingsUsersCreate></SettingsUsersCreate>
    </div>
    <div class="content" v-if="mode == 'update'">
      <h1>Update User #{{ selectedUserId }}</h1>
      <SettingsUsersUpdate v-model:selected-user-id="selectedUserId"></SettingsUsersUpdate>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';

.scope {
  width: 100%;
  height: 100%;
}

.content {
  padding: 30px;
}

.gray {
  color: gray;
}
</style>