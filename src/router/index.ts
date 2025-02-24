import { createRouter, createWebHashHistory } from 'vue-router'

import Redirect from '@/components/main/RedirectDefault.vue'
import RedirectSettings from '@/components/main/RedirectSettings.vue'
import RedirectAccount from '@/components/main/RedirectAccount.vue'
import RedirectTools from '@/components/main/RedirectTools.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import ProjectsView from '@/views/projectsView/ProjectsView.vue'
import ProjectsNewView from '@/views/projectsView/ProjectsNewView.vue'
import ProjectsEditView from '@/views/projectsView/ProjectsEditView.vue'
import ProjectsCopyView from '@/views/projectsView/ProjectsCopyView.vue'
import ItemsBoughtView from '@/views/items/bought/ItemsBoughtView.vue'
import ItemsBoughtViewerView from '@/views/items/bought/ItemsBoughtViewerView.vue'
import ItemsBoughtNewView from '@/views/items/bought/ItemsBoughtNewView.vue'
import ItemsBoughtCopyView from '@/views/items/bought/ItemsBoughtCopyView.vue'
import ItemsBoughtEditView from '@/views/items/bought/ItemsBoughtEditView.vue'
import ItemsBoughtNewMultiView from '@/views/items/bought/ItemsBoughtNewMultiView.vue'
import UserTimeView from '@/views/userTime/UserTimeView.vue'
import UserTimeNewView from '@/views/userTime/UserTimeNewView.vue'
import UserTimeEditView from '@/views/userTime/UserTimeEditView.vue'
import SettingsLicenseView from '@/views/settings/SettingsLicenseView.vue'
import SettingsHostView from '@/views/settings/SettingsHostView.vue'
import SettingsLogsView from '@/views/settings/SettingsLogsView.vue'
import SettingsUsersView from '@/views/settings/SettingsUsersView.vue'
import SettingsConfigView from '@/views/settings/SettingsConfigView.vue'
import SettingsMailingView from '@/views/settings/SettingsMailingView.vue'
import SettingsApiKeysView from '@/views/settings/SettingsApiKeysView.vue'
import AccountUpdateView from '@/views/account/AccountUpdateView.vue'
import AccountSecurityView from '@/views/account/AccountSecurityView.vue'
import AccountPersonalAccessTokenView from '@/views/account/AccountPersonalAccessTokenView.vue'
import ToolsStockCut1DView from '@/views/tools/ToolsStockCut1DView.vue'
import ToolsStockCut2DView from '@/views/tools/ToolsStockCut2DView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: "/",
    //   name: "Home",
    //   component: DashboardView,
    // },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsView,
    },
    {
      path: '/projects/new',
      name: 'NewProject',
      component: ProjectsNewView,
    },
    {
      path: '/projects/edit/:id',
      name: 'EditProject',
      component: ProjectsEditView,
    },
    {
      path: '/projects/copy/:id',
      name: 'CopyProject',
      component: ProjectsCopyView,
    },
    {
      path: '/items',
      name: 'Items',
      component: ItemsBoughtView,
    },
    {
      path: '/items/bought',
      name: 'BoughtItems',
      component: ItemsBoughtView,
    },
    {
      path: '/items/bought/view/:id',
      name: 'ViewBoughtItem',
      component: ItemsBoughtViewerView,
    },
    {
      path: '/items/bought/new',
      name: 'NewBoughtItem',
      component: ItemsBoughtNewView,
    },
    {
      path: '/items/bought/new-multi',
      name: 'NewMultiBoughtItem',
      component: ItemsBoughtNewMultiView,
    },
    {
      path: '/items/bought/edit/:id',
      name: 'EditBoughtItem',
      component: ItemsBoughtEditView,
    },
    {
      path: '/items/bought/copy/:id',
      name: 'CopyBoughtItem',
      component: ItemsBoughtCopyView,
    },
    {
      path: '/account',
      name: 'Account',
      component: RedirectAccount,
    },
    {
      path: '/account/me',
      name: 'AccountUpdate',
      component: AccountUpdateView,
    },
    {
      path: '/account/security',
      name: 'AccountSecurity',
      component: AccountSecurityView,
    },
    {
      path: '/account/pat',
      name: 'AccountPersonalAccessToken',
      component: AccountPersonalAccessTokenView,
    },
    {
      path: '/user-time',
      name: 'UserTime',
      component: UserTimeView,
    },
    {
      path: '/user-time/new',
      name: 'UserTimeNew',
      component: UserTimeNewView,
    },
    {
      path: '/user-time/edit/:id',
      name: 'UserTimeEdit',
      component: UserTimeEditView,
    },
    {
      path: '/tools',
      name: 'Tools',
      component: RedirectTools,
    },
    {
      path: '/tools/stock-cut-1d',
      name: 'ToolsStockCut1D',
      component: ToolsStockCut1DView,
    },
    {
      path: '/tools/stock-cut-2d',
      name: 'ToolsStockCut2D',
      component: ToolsStockCut2DView,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: RedirectSettings,
    },
    {
      path: '/settings/license',
      name: 'SettingsLicense',
      component: SettingsLicenseView,
    },
    {
      path: '/settings/host',
      name: 'SettingsHost',
      component: SettingsHostView,
    },
    {
      path: '/settings/config',
      name: 'SettingsConfig',
      component: SettingsConfigView,
    },
    {
      path: '/settings/logs',
      name: 'SettingsLogs',
      component: SettingsLogsView,
    },
    {
      path: '/settings/users',
      name: 'SettingsUsers',
      component: SettingsUsersView,
    },
    {
      path: '/settings/mailing',
      name: 'SettingsMailing',
      component: SettingsMailingView,
    },
    {
      path: '/settings/api-keys',
      name: 'SettingsApiKeys',
      component: SettingsApiKeysView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: Redirect,
    },
  ],
})

export default router
