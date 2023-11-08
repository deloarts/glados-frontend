<script setup>
import { ref, onMounted, computed } from "vue";

import { hostRequest } from "@/requests/host";
import HostInformationItem from "@/components/settings/HostInformationItem.vue";
import DiscSpaceChart from "@/components/settings/DiscSpaceChart.vue";
import LoadingSpinner from "@/components/spinner/LoadingSpinner.vue";

import IconServer from "@/components/icons/IconServer.vue";
import IconComputer from "@/components/icons/IconComputer.vue";

const discSpaceDatabaseDataset = ref({
  used: 1,
  free: 0,
});

const discSpaceBackupDataset = ref({
  used: 1,
  free: 0,
});

const os = ref("-");
const hostname = ref("-");
const databaseSpace = ref("-");
const backupSpace = ref("-");

function getDiscSpace() {
  hostRequest.getHostInfo().then((response) => {
    console.log(JSON.stringify(response.data));
    if (response.status === 200) {
      hostname.value = response.data.hostname;
      os.value = response.data.os;
      databaseSpace.value =
        response.data.disc_space.db_free +
        " GiB free of " +
        response.data.disc_space.db_total +
        " GiB";
      backupSpace.value =
        response.data.disc_space.backup_free +
        " GiB free of " +
        response.data.disc_space.backup_total +
        " GiB";

      discSpaceDatabaseDataset.value = {
        used: response.data.disc_space.db_used,
        free: response.data.disc_space.db_free,
      };
      discSpaceBackupDataset.value = {
        used: response.data.disc_space.backup_used,
        free: response.data.disc_space.backup_free,
      };
    }
  });
}

onMounted(getDiscSpace);
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>Host Information</h1>
      <div class="content">
        <div class="wrapper">
          <HostInformationItem title="HOSTNAME" v-model:text="hostname">
            <IconComputer v-if="hostname != '-'" />
            <LoadingSpinner v-else />
          </HostInformationItem>
        </div>
        <div class="wrapper">
          <HostInformationItem title="OS" v-model:text="os">
            <IconServer v-if="os != '-'" />
            <LoadingSpinner v-else />
          </HostInformationItem>
        </div>
        <div class="wrapper">
          <HostInformationItem
            title="Database Disc Space"
            v-model:text="databaseSpace"
          >
            <DiscSpaceChart
              v-if="databaseSpace != '-'"
              v-model:dataset="discSpaceDatabaseDataset"
            >
            </DiscSpaceChart>
            <LoadingSpinner v-else />
          </HostInformationItem>
        </div>
        <div class="wrapper">
          <HostInformationItem
            title="Backup Disc Space"
            v-model:text="backupSpace"
          >
            <DiscSpaceChart
              v-if="backupSpace != '-'"
              v-model:dataset="discSpaceBackupDataset"
            ></DiscSpaceChart>
            <LoadingSpinner v-else />
          </HostInformationItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.scope {
  width: 100%;
  height: 100%;
}

.content {
  padding: 10px;
}

.wrapper {
  padding-bottom: 20px;
}

svg {
  color: $main-color;
  padding: 10px;
}
</style>
