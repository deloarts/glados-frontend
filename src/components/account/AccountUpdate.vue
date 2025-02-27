<script setup lang="ts">
import { computed } from 'vue'

import AccountUpdateForm from '@/components/account/AccountUpdateForm.vue'
import InfoForForm from '@/components/common/InfoForForm.vue'

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'

const languageStore = useLanguageStore()
const userStore = useUserStore()

const showTimeInfo = computed<boolean>(() => {
  return userStore.user.work_hours_per_week == null
})
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.account.banner.myAccount }}</h1>
      <AccountUpdateForm />
      <InfoForForm
        v-if="showTimeInfo"
        class="space"
        :text="languageStore.l.account.banner.userTimeInfo"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  width: 100%;
  height: 100%;
}

.space {
  padding-top: 10px;
}
</style>
