<script setup lang="ts">
import { ref, onMounted } from "vue";

import HostInformationItem from "@/components/settings/HostInformationItem.vue";
import DiscSpaceChart from "@/components/settings/DiscSpaceChart.vue";
import LoadingSpinner from "@/components/spinner/LoadingSpinner.vue";

import { hostRequest } from "@/requests/host";

import type { DiscSpace } from "@/models/host";

import IconServer from "@/components/icons/IconServer.vue";
import IconComputer from "@/components/icons/IconComputer.vue";
import IconWarning from "@/components/icons/IconWarning.vue";

const discSpaceDatabaseDataset = ref<DiscSpace>({
  used: 1,
  free: 0,
});

const discSpaceBackupDataset = ref<DiscSpace>({
  used: 1,
  free: 0,
});

const os = ref<string>("-");
const hostname = ref<string>("-");
const databaseSpace = ref<string>("-");
const backupSpace = ref<string>("-");
const backupNotMounted = ref<boolean>(false);

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

      if (response.data.disc_space.backup_total) {
        backupSpace.value =
          response.data.disc_space.backup_free +
          " GiB free of " +
          response.data.disc_space.backup_total +
          " GiB";
        backupNotMounted.value = false;
      } else {
        backupNotMounted.value = true;
        backupSpace.value = "Not mounted";
      }

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
          <IconWarning v-if="backupNotMounted" />
          <DiscSpaceChart
            v-else-if="backupSpace != '-'"
            v-model:dataset="discSpaceBackupDataset"
          ></DiscSpaceChart>
          <LoadingSpinner v-else />
        </HostInformationItem>
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

.wrapper {
  padding: 10px;
}

svg {
  color: $main-color;
  padding: 10px;
}
</style>
