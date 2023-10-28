import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"

import Redirect from "@/components/main/Redirect.vue"
import RedirectSettings from "@/components/main/RedirectSettings.vue"
import LoginView from "@/views/LoginView.vue"
import DashboardView from "@/views/dashboard/DashboardView.vue"
import ItemsBoughtView from "@/views/items/bought/ItemsBoughtView.vue"
import ItemsBoughtNewView from "@/views/items/bought/ItemsBoughtNewView.vue"
import ItemsBoughtCopyView from "@/views/items/bought/ItemsBoughtCopyView.vue"
import ItemsBoughtEditView from "@/views/items/bought/ItemsBoughtEditView.vue"
import SettingsHostView from "@/views/settings/SettingsHostView.vue"
import SettingsLogsView from "@/views/settings/SettingsLogsView.vue"
import SettingsUsersView from "@/views/settings/SettingsUsersView.vue"
import SettingsApiKeysView from "@/views/settings/SettingsApiKeysView.vue"
import AccountView from "@/views/account/AccountView.vue"

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
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/items",
      name: "Items",
      component: ItemsBoughtView,
    },
    {
      path: "/items/bought",
      name: "BoughtItems",
      component: ItemsBoughtView,
    },
    {
      path: "/items/bought/new",
      name: "NewBoughtItem",
      component: ItemsBoughtNewView,
    },
    {
      path: "/items/bought/edit/:id",
      name: "EditBoughtItem",
      component: ItemsBoughtEditView,
    },
    {
      path: "/items/bought/copy/:id",
      name: "CopyBoughtItem",
      component: ItemsBoughtCopyView,
    },
    {
      path: "/account",
      name: "Account",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("@/views/account/AccountView.vue"),
      component: AccountView
    },
    {
      path: "/settings",
      name: "Settings",
      component: RedirectSettings
    },
    {
      path: "/settings/host",
      name: "SettingsHost",
      // component: () => import("@/views/settings/SettingsView.vue"),
      component: SettingsHostView
    },
    {
      path: "/settings/logs",
      name: "SettingsLogs",
      // component: () => import("@/views/settings/SettingsLogsView.vue"),
      component: SettingsLogsView
    },
    {
      path: "/settings/users",
      name: "SettingsUsers",
      component: SettingsUsersView,
    },
    {
      path: "/settings/api-keys",
      name: "SettingsApiKeys",
      component: SettingsApiKeysView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: Redirect
    },
  ],
})

export default router
