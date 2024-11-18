<script setup lang="ts">
import { ref, onMounted } from "vue";
import constants from "@/constants";

import HostInformationItem from "@/components/settings/HostInformationItem.vue";
import DiscSpaceChart from "@/components/settings/DiscSpaceChart.vue";
import LoadingSpinner from "@/components/spinner/LoadingSpinner.vue";

import { hostRequest } from "@/requests/host";

import type { DiscSpace } from "@/models/host";

import IconTagText from "@/components/icons/IconTagText.vue";
import IconServer from "@/components/icons/IconServer.vue";
import IconComputer from "@/components/icons/IconComputer.vue";
import IconWarning from "@/components/icons/IconWarning.vue";

import { useLanguageStore } from "@/stores/language";

const languageStore = useLanguageStore();

const discSpaceDatabaseDataset = ref<DiscSpace>({
  used: 1,
  free: 0,
});

const discSpaceBackupDataset = ref<DiscSpace>({
  used: 1,
  free: 0,
});

const os = ref<string>("-");
const version = ref<string>("-");
const hostname = ref<string>("-");
const databaseSpace = ref<string>("-");
const backupSpace = ref<string>("-");
const backupNotMounted = ref<boolean>(false);

function getHostInformation() {
  hostRequest.getHostInfo().then((response) => {
    console.log(JSON.stringify(response.data));
    if (response.status === 200) {
      version.value = `App v${constants.version}  //  Server v${response.data.version}`;
      hostname.value = response.data.hostname;
      os.value = response.data.os;
      databaseSpace.value =
        response.data.disc_space.db_free +
        " GiB" +
        languageStore.l.settings.host.freeOf +
        response.data.disc_space.db_total +
        " GiB";

      if (response.data.disc_space.backup_total) {
        backupSpace.value =
          response.data.disc_space.backup_free +
          " GiB" +
          languageStore.l.settings.host.freeOf +
          response.data.disc_space.backup_total +
          " GiB";
        backupNotMounted.value = false;
      } else {
        backupNotMounted.value = true;
        backupSpace.value = languageStore.l.settings.host.notMounted;
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

onMounted(getHostInformation);
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.settings.host.banner }}</h1>
      <div class="wrapper">
        <HostInformationItem
          :title="languageStore.l.settings.host.version"
          v-model:text="version"
        >
          <IconTagText v-if="version != '-'" />
          <LoadingSpinner v-else />
        </HostInformationItem>
      </div>
      <div class="wrapper">
        <HostInformationItem
          :title="languageStore.l.settings.host.hostname"
          v-model:text="hostname"
        >
          <IconComputer v-if="hostname != '-'" />
          <LoadingSpinner v-else />
        </HostInformationItem>
      </div>
      <div class="wrapper">
        <HostInformationItem
          :title="languageStore.l.settings.host.os"
          v-model:text="os"
        >
          <IconServer v-if="os != '-'" />
          <LoadingSpinner v-else />
        </HostInformationItem>
      </div>
      <div class="wrapper">
        <HostInformationItem
          :title="languageStore.l.settings.host.dbDiscSpace"
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
          :title="languageStore.l.settings.host.backupDiscSpace"
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
