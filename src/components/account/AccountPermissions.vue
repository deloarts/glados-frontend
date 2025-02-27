<script setup lang="ts">
import { computed } from 'vue'
import InfoForForm from '@/components/common/InfoForForm.vue'
import AccountPermissionsElement from '@/components/account/AccountPermissionsElement.vue';

import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user';

const languageStore = useLanguageStore()
const userStore = useUserStore()

const userPermission = computed<string>(() => {
  if (userStore.user.is_systemuser) {
    return 'System'
  }
  if (userStore.user.is_guestuser) {
    return languageStore.l.account.permissions.guestUser
  }
  if (userStore.user.is_adminuser) {
    return languageStore.l.account.permissions.adminUser
  }
  if (userStore.user.is_superuser) {
    return languageStore.l.account.permissions.superUser
  }
  return languageStore.l.account.permissions.normalUser
})

const permissionReadOwnProjects = computed<boolean>(() => { return userStore.user.is_active });
const permissionReadOtherProjects = computed<boolean>(() => { return userStore.user.is_active });
const permissionCreateProjects = computed<boolean>(() => { return !userStore.user.is_guestuser });
const permissionEditOwnProjects = computed<boolean>(() => { return !userStore.user.is_guestuser });
const permissionEditOtherProjects = computed<boolean>(() => { return userStore.user.is_superuser || userStore.user.is_adminuser });
const permissionAssignOtherUserToProject = computed<boolean>(() => { return userStore.user.is_superuser || userStore.user.is_adminuser });
const permissionDeleteProjects = computed<boolean>(() => { return userStore.user.is_superuser || userStore.user.is_adminuser });

const permissionReadOwnItems = computed<boolean>(() => { return userStore.user.is_active });
const permissionReadOtherItems = computed<boolean>(() => { return userStore.user.is_active });
const permissionCreateItems = computed<boolean>(() => { return !userStore.user.is_guestuser });
const permissionEditOwnItems = computed<boolean>(() => { return !userStore.user.is_guestuser });
const permissionEditOtherItems = computed<boolean>(() => { return userStore.user.is_superuser || userStore.user.is_adminuser });
const permissionEditPlannedItems = computed<boolean>(() => { return userStore.user.is_superuser || userStore.user.is_adminuser });
const permissionDeleteOwnItems = computed<boolean>(() => { return !userStore.user.is_guestuser });
const permissionDeleteOtherItems = computed<boolean>(() => { return userStore.user.is_superuser || userStore.user.is_adminuser });

const permissionReadOwnUserTime = computed<boolean>(() => { return userStore.user.is_active });
const permissionReadOtherUserTime = computed<boolean>(() => { return false });
const permissionCreateUserTime = computed<boolean>(() => { return userStore.user.is_active });
const permissionEditOwnUserTime = computed<boolean>(() => { return userStore.user.is_active });
const permissionEditOtherUserTime = computed<boolean>(() => { return false });
const permissionDeleteOwnUserTime = computed<boolean>(() => { return userStore.user.is_active });
const permissionDeleteOtherUserTime = computed<boolean>(() => { return false });

const permissionCreateUsers = computed<boolean>(() => { return userStore.user.is_adminuser });
const permissionEditUsers = computed<boolean>(() => { return userStore.user.is_adminuser });
const permissionDeleteUsers = computed<boolean>(() => { return false });

const permissionReadSettings = computed<boolean>(() => { return userStore.user.is_adminuser });
const permissionEditSettings = computed<boolean>(() => { return userStore.user.is_adminuser });

</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.account.banner.permissions }}</h1>
      <InfoForForm :text="`${languageStore.l.account.permissions.yourPermissionLevel}${userPermission}`" />
      <div class="wrapper">
        <h2>{{ languageStore.l.account.permissions.yourPermissionProjects }}</h2>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.readOwnProjects" :allowed="permissionReadOwnProjects"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.readOtherProjects" :allowed="permissionReadOtherProjects"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.createProjects" :allowed="permissionCreateProjects"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editOwnProjects" :allowed="permissionEditOwnProjects"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editOtherProjects" :allowed="permissionEditOtherProjects"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.assignOtherUserToProject" :allowed="permissionAssignOtherUserToProject"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.deleteProjects" :allowed="permissionDeleteProjects"/>
        
        <h2>{{ languageStore.l.account.permissions.yourPermissionItems }}</h2>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.readOwnItems" :allowed="permissionReadOwnItems"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.readOtherItems" :allowed="permissionReadOtherItems"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.createItems" :allowed="permissionCreateItems"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editOwnItems" :allowed="permissionEditOwnItems"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editOtherItems" :allowed="permissionEditOtherItems"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editPlannedItems" :allowed="permissionEditPlannedItems"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.deleteOwnItems" :allowed="permissionDeleteOwnItems"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.deleteOtherItems" :allowed="permissionDeleteOtherItems"/>
        
        <h2>{{ languageStore.l.account.permissions.yourPermissionUserTime }}</h2>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.readOwnUserTime" :allowed="permissionReadOwnUserTime"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.readOtherUserTime" :allowed="permissionReadOtherUserTime"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.createUserTime" :allowed="permissionCreateUserTime"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editOwnUserTime" :allowed="permissionEditOwnUserTime"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editOtherUserTime" :allowed="permissionEditOtherUserTime"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.deleteOwnUserTime" :allowed="permissionDeleteOwnUserTime"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.deleteOtherUserTime" :allowed="permissionDeleteOtherUserTime"/>
        
        <h2>{{ languageStore.l.account.permissions.yourPermissionUsers }}</h2>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.createUsers" :allowed="permissionCreateUsers"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editUsers" :allowed="permissionEditUsers"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.deleteUsers" :allowed="permissionDeleteUsers"/>
        
        <h2>{{ languageStore.l.account.permissions.yourPermissionSettings }}</h2>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.readSettings" :allowed="permissionReadSettings"/>
        <AccountPermissionsElement :text="languageStore.l.account.permissions.editSettings" :allowed="permissionEditSettings"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  color: var(--main-text-color);
}

h2 {
  padding-top: 15px;
  font-size: 16px;
  font-family: var(--main-font-head);
}

.scope {
  width: 100%;
  height: 100%;
}

.wrapper {
  padding-left: 10px;
  max-width: calc(100% - 15px);
}
</style>
