<script setup lang="ts">
import { useLanguageStore } from "@/stores/language";
import { useUsersStore } from "@/stores/user";

import type { Log } from "@/models/log";

// Props & Emits
const props = defineProps<{
  logFileContent: Array<Log>;
}>();

// Store
const languageStore = useLanguageStore();
const usersStore = useUsersStore();
</script>

<template>
  <div class="table-base-scope">
    <div class="table-base-container">
      <table class="cursor-default">
        <thead>
          <tr>
            <th class="first sticky-col" id="log-row">
              {{ languageStore.l.settings.logs.table.number }}
            </th>
            <th class="first sticky-col" id="log-timestamp">
              {{ languageStore.l.settings.logs.table.timestamp }}
            </th>
            <th class="first sticky-col" id="log-level">
              {{ languageStore.l.settings.logs.table.level }}
            </th>
            <th class="first sticky-col" id="log-msg">
              {{ languageStore.l.settings.logs.table.msg }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in props.logFileContent" :key="index">
            <td id="log-row">{{ index + 1 }}</td>
            <td id="log-timestamp">{{ item.date }}</td>
            <td
              id="log-level"
              v-bind:class="{
                'lvl-info': item.level == 'INFO',
                'lvl-warn': item.level == 'WARNING',
                'lvl-error': item.level == 'ERROR',
                'lvl-crit': item.level == 'CRITICAL',
              }"
            >
              {{ item.level }}
            </td>
            <td id="log-msg">{{ item.msg }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/table/tableBase.scss";

#log-row {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
  text-align: center;
}

#log-timestamp {
  width: 200px;
  min-width: 200px;
  text-align: center;
}

#log-level {
  width: 40px;
  min-width: 40px;
  text-align: center;
}

#log-msg {
  width: 100%;
  min-width: 150px;
}

.lvl-info {
  color: var(--main-color);
}

.lvl-warn {
  color: var(--main-orange);
}

.lvl-error {
  color: var(--main-red);
}

.lvl-crit {
  color: white;
  background-color: var(--main-red);
}
</style>
