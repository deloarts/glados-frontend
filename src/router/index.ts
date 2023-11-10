import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import Redirect from "@/components/main/Redirect.vue";
import RedirectSettings from "@/components/main/RedirectSettings.vue";
import RedirectAccount from "@/components/main/RedirectAccount.vue";
import RedirectTools from "@/components/main/RedirectTools.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import ItemsBoughtView from "@/views/items/bought/ItemsBoughtView.vue";
import ItemsBoughtNewView from "@/views/items/bought/ItemsBoughtNewView.vue";
import ItemsBoughtCopyView from "@/views/items/bought/ItemsBoughtCopyView.vue";
import ItemsBoughtEditView from "@/views/items/bought/ItemsBoughtEditView.vue";
import SettingsHostView from "@/views/settings/SettingsHostView.vue";
import SettingsLogsView from "@/views/settings/SettingsLogsView.vue";
import SettingsUsersView from "@/views/settings/SettingsUsersView.vue";
import SettingsApiKeysView from "@/views/settings/SettingsApiKeysView.vue";
import AccountUpdateView from "@/views/account/AccountUpdateView.vue";
import AccountPersonalAccessTokenView from "@/views/account/AccountPersonalAccessTokenView.vue";
import ToolsStockCutView from "@/views/tools/ToolsStockCutView.vue";

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
      component: RedirectAccount,
    },
    {
      path: "/account/me",
      name: "AccountUpdate",
      component: AccountUpdateView,
    },
    {
      path: "/account/pat",
      name: "AccountPersonalAccessToken",
      component: AccountPersonalAccessTokenView,
    },
    {
      path: "/tools",
      name: "Tools",
      component: RedirectTools,
    },
    {
      path: "/tools/stock-cut",
      name: "ToolsStockCut",
      component: ToolsStockCutView,
    },
    {
      path: "/settings",
      name: "Settings",
      component: RedirectSettings,
    },
    {
      path: "/settings/host",
      name: "SettingsHost",
      component: SettingsHostView,
    },
    {
      path: "/settings/logs",
      name: "SettingsLogs",
      component: SettingsLogsView,
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
      path: "/:pathMatch(.*)*",
      component: Redirect,
    },
  ],
});

export default router;
