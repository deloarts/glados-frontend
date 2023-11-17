<script setup>
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";

import constants from "@/constants";
import { useResolutionStore } from "@/stores/resolution.js";
import { useUsersStore } from "@/stores/user.js";
import { getFilterParams } from "@/requests/params";
import { boughtItemsRequest } from "@/requests/items";
import { boughtItemsFilter } from "@/presets/boughtItemsFilter";

import OverviewChart from "@/components/dashboard/OverviewChart.vue";
import UsersChart from "@/components/dashboard/UsersChart.vue";
import TimelineChart from "@/components/dashboard/TimelineChart.vue";
import ItemCount from "@/components/dashboard/ItemCount.vue";

// Router
const route = useRoute();

// Stores
const usersStore = useUsersStore();
const resolutionStore = useResolutionStore();
const gtMinWidthTablet = computed(() => resolutionStore.gtMinWidthTablet);

const doughnutUserLimit = 8;

const boughtItemsAmount = ref({
  active: 0,
  open: 0,
  requested: 0,
  ordered: 0,
  late: 0,
  partial: 0,
  delivered: 0,
  canceled: 0,
  lost: 0,
});
const boughtItemsOverviewDataset = ref({
  Open: 0,
  Requested: 0,
  Ordered: 0,
  Late: 0,
  Partial: 0,
  Delivered: 0,
  Canceled: 0,
  Lost: 0,
});
const boughtItemsUsersDataset = ref({});
const timelineDataset = ref({
  months: [],
  created: [],
  ordered: [],
  delivered: [],
});

function autoFetchBoughtItemStatus() {
  if (route.path != "/dashboard") {
    console.info(
      "Stopped updating routine for bought items: User leaved site.",
    );
  } else {
    let filter = JSON.parse(JSON.stringify(boughtItemsFilter));
    const fromDate = moment().subtract(30, "days").format("YYYY-MM-DD");

    filter.limit = null;
    filter.changedDateFrom = fromDate;

    const params = getFilterParams(filter);
    boughtItemsRequest.getItems(params).then((response) => {
      if (response.status == 200) {
        const data = response.data;

        let usersDataset = {};
        let boughtItems = {
          active: data.length,
          open: 0,
          requested: 0,
          ordered: 0,
          late: 0,
          partial: 0,
          delivered: 0,
          canceled: 0,
          lost: 0,
        };

        for (var i = 0; i < data.length; i++) {
          const datum = data[i];

          // BOUGHT ITEMS COUNT
          if (datum.status == "open") {
            boughtItems.open++;
          }
          if (datum.status == "requested") {
            boughtItems.requested++;
          }
          if (datum.status == "ordered") {
            boughtItems.ordered++;
          }
          if (datum.status == "late") {
            boughtItems.late++;
          }
          if (datum.status == "partial") {
            boughtItems.partial++;
          }
          if (datum.status == "delivered") {
            boughtItems.delivered++;
          }
          if (datum.status == "canceled") {
            boughtItems.canceled++;
          }
          if (datum.status == "lost") {
            boughtItems.lost++;
          }

          // USER ITEMS COUNT
          // if (datum.creator_id in usersStore.getByID()) {
          let fullName = usersStore.getNameByID(datum.creator_id);
          if (fullName in usersDataset) {
            let value = parseInt(usersDataset[fullName]);
            value++;
            usersDataset[fullName] = value;
          } else {
            usersDataset[fullName] = 1;
          }
          // }
        }

        // Sort user dataset and limit to 10 items
        let sortedUsers = [];
        let sortedUsersDataset = {};
        let userLimit = 0;

        for (var user in usersDataset) {
          sortedUsers.push([user, usersDataset[user]]);
        }

        sortedUsers.sort(function (a, b) {
          return b[1] - a[1];
        });

        if (sortedUsers.length > doughnutUserLimit) {
          userLimit = doughnutUserLimit;
        } else {
          userLimit = sortedUsers.length;
        }

        for (var i = 0; i < userLimit; i++) {
          sortedUsersDataset[sortedUsers[i][0]] = sortedUsers[i][1];
        }

        // WRITE DATASETS
        boughtItemsAmount.value = boughtItems;
        boughtItemsUsersDataset.value = sortedUsersDataset;
        boughtItemsOverviewDataset.value = {
          Open: boughtItems.open,
          Requested: boughtItems.requested,
          Ordered: boughtItems.ordered,
          Late: boughtItems.late,
          Partial: boughtItems.partial,
          Delivered: boughtItems.delivered,
          Canceled: boughtItems.canceled,
          Lost: boughtItems.lost,
        };
      } else {
        console.error("Failed to fetch data for dashboard.");
      }
      setTimeout(
        autoFetchBoughtItemStatus.bind(this),
        constants.fetchDashboardDataAfter,
      );
    });
  }
}

function autoFetchBoughtItemTimeline() {
  if (route.path != "/dashboard") {
    console.info(
      "Stopped updating routine for bought items: User leaved site.",
    );
  } else {
    const currentMonth = moment().month();
    const currentYear = moment().year();

    let filter = JSON.parse(JSON.stringify(boughtItemsFilter));

    const fromYear = moment().subtract(1, "years").year();
    const fromMonth = moment().subtract(1, "years").month() + 2;
    const fromDate = moment(`${fromYear}-${fromMonth}-01`).format("YYYY-MM-DD");

    filter.limit = null;
    filter.changedDateFrom = fromDate;

    const params = getFilterParams(filter);
    boughtItemsRequest.getItems(params).then((response) => {
      if (response.status == 200) {
        const data = response.data;
        let dataset = {
          months: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
          created: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ordered: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          delivered: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };

        for (var i = 0; i < data.length; i++) {
          const datum = data[i];

          let createdDate = moment(datum.created, "YYYY-MM-DD");
          if (createdDate.isValid()) {
            dataset.created[createdDate.month()] += 1;
          }

          let orderedDate = moment(datum.ordered_date, "YYYY-MM-DD");
          if (orderedDate.isValid()) {
            dataset.ordered[orderedDate.month()] += 1;
          }

          let deliveredDate = moment(datum.delivery_date, "YYYY-MM-DD");
          if (deliveredDate.isValid()) {
            dataset.delivered[deliveredDate.month()] += 1;
          }
        }

        // Set year and shift everything
        for (var i = 0; i < dataset.months.length; i++) {
          if (i <= currentMonth) {
            dataset.months[i] += ` ${currentYear - 2000}`;
          } else {
            dataset.months[i] += ` ${currentYear - 2001}`;
          }
        }

        for (var i = 0; i < currentMonth + 1; i++) {
          let shiftedMonth = dataset.months.shift();
          dataset.months.push(shiftedMonth);

          let shiftedCreated = dataset.created.shift();
          dataset.created.push(shiftedCreated);

          let shiftedOrdered = dataset.ordered.shift();
          dataset.ordered.push(shiftedOrdered);

          let shiftedDelivered = dataset.delivered.shift();
          dataset.delivered.push(shiftedDelivered);
        }

        timelineDataset.value = dataset;
      } else {
        console.error("Failed to fetch data for dashboard.");
      }
      setTimeout(
        autoFetchBoughtItemTimeline.bind(this),
        constants.fetchDashboardDataAfter,
      );
    });
  }
}

onBeforeMount(() => {
  boughtItemsUsersDataset.value = null;
  boughtItemsOverviewDataset.value = null;
  timelineDataset.value = null;
}),
  onMounted(() => {
    autoFetchBoughtItemStatus();
    autoFetchBoughtItemTimeline();
  });
</script>

<template>
  <div class="views-scope">
    <div class="views-content">
      <div id="grid">
        <div
          v-if="gtMinWidthTablet"
          id="items-overview"
          class="grid-item-center"
        >
          <OverviewChart
            v-model:dataset="boughtItemsOverviewDataset"
          ></OverviewChart>
        </div>
        <div
          v-if="gtMinWidthTablet"
          id="users-overview"
          class="grid-item-center"
        >
          <UsersChart v-model:dataset="boughtItemsUsersDataset"></UsersChart>
        </div>
        <div
          v-if="gtMinWidthTablet"
          id="items-timeline"
          class="grid-item-center"
        >
          <TimelineChart v-model:dataset="timelineDataset"></TimelineChart>
        </div>
        <div id="active-items" class="grid-item-center">
          <ItemCount
            text="Active"
            v-model:count="boughtItemsAmount.active"
          ></ItemCount>
        </div>
        <div id="open-items" class="grid-item-center">
          <ItemCount
            text="Open"
            v-model:count="boughtItemsAmount.open"
          ></ItemCount>
        </div>
        <div id="requested-items" class="grid-item-center">
          <ItemCount
            text="Requested"
            v-model:count="boughtItemsAmount.requested"
          ></ItemCount>
        </div>
        <div id="ordered-items" class="grid-item-center">
          <ItemCount
            text="Ordered"
            v-model:count="boughtItemsAmount.ordered"
          ></ItemCount>
        </div>
        <div id="delivered-items" class="grid-item-center">
          <ItemCount
            text="Delivered"
            v-model:count="boughtItemsAmount.delivered"
          ></ItemCount>
        </div>
        <div id="partial-items" class="grid-item-center">
          <ItemCount
            text="Partial"
            v-model:count="boughtItemsAmount.partial"
          ></ItemCount>
        </div>
        <div id="late-items" class="grid-item-center">
          <ItemCount
            text="Late"
            v-model:count="boughtItemsAmount.late"
          ></ItemCount>
        </div>
        <div id="canceled-items" class="grid-item-center">
          <ItemCount
            text="Canceled"
            v-model:count="boughtItemsAmount.canceled"
          ></ItemCount>
        </div>
        <div v-if="gtMinWidthTablet" id="data-note" class="grid-item-left">
          Showing all items that have been edited within the last 30 days.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/views.scss";
@import "@/scss/grid/gridBase.scss";

.views-content {
  display: grid;
  justify-content: left;
  padding: 40px;
}

h1 {
  padding-bottom: 35px;
}

#grid {
  grid-gap: 20px;
  grid-template-rows: 330px 92px 92px 330px auto 20px;
  grid-template-columns: 270px 270px 270px 270px;
  grid-template-areas:
    "items-overview items-overview users-overview users-overview"
    "active-items open-items requested-items ordered-items"
    "delivered-items partial-items late-items canceled-items"
    "items-timeline items-timeline items-timeline items-timeline"
    "placeholder placeholder placeholder placeholder"
    "data-note data-note data-note data-note";
}

@media screen and (max-width: $max-width-desktop) {
  .views-content {
    justify-content: center;
  }

  #grid {
    grid-gap: 20px;
    grid-template-rows: 380px 380px 380px 92px 92px 92px 92px auto 50px;
    grid-template-columns: 270px 270px;
    grid-template-areas:
      "items-overview items-overview"
      "users-overview users-overview"
      "items-timeline items-timeline"
      "active-items open-items"
      "requested-items ordered-items"
      "delivered-items partial-items"
      "late-items canceled-items"
      "placeholder placeholder"
      "data-note data-note";
  }
}

@media screen and (max-width: $max-width-tablet) {
  .views-content {
    justify-content: center;
  }

  #grid {
    grid-gap: 20px;
    grid-template-rows: 92px 92px 92px 92px 92px 92px 92px 92px;
    grid-template-columns: 270px;
    grid-template-areas:
      "active-items"
      "open-items"
      "requested-items"
      "ordered-items"
      "delivered-items"
      "partial-items"
      "late-items"
      "canceled-items";
  }
}

#placeholder {
  grid-area: placeholder;
}

#items-overview {
  grid-area: items-overview;
}

#items-timeline {
  grid-area: items-timeline;
}

#users-overview {
  grid-area: users-overview;
}

#active-items {
  grid-area: active-items;
}

#open-items {
  grid-area: open-items;
}

#requested-items {
  grid-area: requested-items;
}

#ordered-items {
  grid-area: ordered-items;
}

#late-items {
  grid-area: late-items;
}

#delivered-items {
  grid-area: delivered-items;
}

#partial-items {
  grid-area: partial-items;
}

#canceled-items {
  grid-area: canceled-items;
}

#data-note {
  grid-area: data-note;
  font-size: 14px;
}
</style>
