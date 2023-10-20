<script lang="ts">
//@ts-ignore
import moment from "moment";

import constants from "@/constants";
import { getFilterParams } from "@/requests/params";
import { boughtItemsRequest } from "@/requests/items";
import { boughtItemsFilter } from "@/presets/boughtItemsFilter";
import { usersService } from "@/services/users.service";

import OverviewChart from "@/components/dashboard/OverviewChart.vue";
import UsersChart from "@/components/dashboard/UsersChart.vue";
import TimelineChart from "@/components/dashboard/TimelineChart.vue";
import ItemCount from "@/components/dashboard/ItemCount.vue";

export default {
  name: "DashboardView",
  components: {
    OverviewChart,
    UsersChart,
    TimelineChart,
    ItemCount
  },
  data() {
    return {
      // Globals
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,

      // Vars
      boughtItems: {
        active: 0,
        open: 0,
        requested: 0,
        ordered: 0,
        late: 0,
        partial: 0,
        delivered: 0,
        canceled: 0,
        lost: 0
      },
      overviewDataset: {
        "Open": 0,
        "Requested": 0,
        "Ordered": 0,
        "Late": 0,
        "Partial": 0,
        "Delivered": 0,
        "Canceled": 0,
        "Lost": 0
      },
      timelineDatasets: [{ date: "", type: "", amount: "" }],
      usersDataset: {},
      userById: {},
    };
  },
  methods: {
    fetchUserById() {
      usersService.getUsers().then(response => {
        const data = response.data;
        var userById = {};
        for (let i = 0; i < data.length; i++) {
          // @ts-ignore
          userById[data[i].id] = data[i].full_name;
        }
        this.userById = userById;
      });
    },

    autoFetchBoughtItems() {
      if (this.$route.path != '/dashboard') {
        console.info('Stopped updating routine for bought items: User leaved site.');
      } else {
        const filter = JSON.parse(JSON.stringify(boughtItemsFilter));
        const fromDate = moment().subtract(30, "days").format("YYYY-MM-DD");

        filter.limit = null;
        filter.changedDateFrom = fromDate;

        const params = getFilterParams(filter);
        boughtItemsRequest.getItems(params).then(response => {
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
              lost: 0
            };
            let timelineDatasets = [];

            for (var i = 0; i < data.length; i++) {
              const datum = data[i];

              // BOUGHT ITEMS COUNT
              if (datum.status == "open") { boughtItems.open++ }
              if (datum.status == "requested") { boughtItems.requested++ }
              if (datum.status == "ordered") { boughtItems.ordered++ }
              if (datum.status == "late") { boughtItems.late++ }
              if (datum.status == "partial") { boughtItems.partial++ }
              if (datum.status == "delivered") { boughtItems.delivered++ }
              if (datum.status == "canceled") { boughtItems.canceled++ }
              if (datum.status == "lost") { boughtItems.lost++ }

              // BOUGHT ITEMS TIMELINE


              // USER ITEMS COUNT
              if (datum.creator_id in this.userById) {
                //@ts-ignore
                let fullName = this.userById[datum.creator_id];
                if (fullName in usersDataset) {
                  //@ts-ignore
                  let value = parseInt(usersDataset[fullName]);
                  value++;
                  //@ts-ignore
                  usersDataset[fullName] = value;
                } else {
                  //@ts-ignore
                  usersDataset[fullName] = 1;
                }
              }
            }

            // WRITE DATASETS
            this.boughtItems = boughtItems;
            this.usersDataset = usersDataset;
            this.overviewDataset = {
              "Open": boughtItems.open,
              "Requested": boughtItems.requested,
              "Ordered": boughtItems.ordered,
              "Late": boughtItems.late,
              "Partial": boughtItems.partial,
              "Delivered": boughtItems.delivered,
              "Canceled": boughtItems.canceled,
              "Lost": boughtItems.lost
            }
          } else {
            console.error("Failed to fetch data for dahboard.");
          }
          setTimeout(this.autoFetchBoughtItems.bind(this), constants.fetchBoughtItemsAfter);
        })
      }
    },
  },
  watch: {
  },
  mounted() {
    this.fetchUserById();
    this.autoFetchBoughtItems();
  },
  beforeMount() {
  }
};
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="items-overview" class="grid-item-center">
          <OverviewChart v-model:dataset="overviewDataset"></OverviewChart>
        </div>
        <div id="users-overview" class="grid-item-center">
          <UsersChart v-model:dataset="usersDataset"></UsersChart>
        </div>
        <!-- <div id="items-timeline" class="grid-item-center">
          <TimelineChart v-model:datasets="timelineDatasets"></TimelineChart>
        </div> -->
        <div id="active-items" class="grid-item-center">
          <ItemCount text="Active Items" v-model:count="boughtItems.active"></ItemCount>
        </div>
        <div id="open-items" class="grid-item-center">
          <ItemCount text="Open Items" v-model:count="boughtItems.open"></ItemCount>
        </div>
        <div id="requested-items" class="grid-item-center">
          <ItemCount text="Requested Items" v-model:count="boughtItems.requested"></ItemCount>
        </div>
        <div id="ordered-items" class="grid-item-center">
          <ItemCount text="Ordered Items" v-model:count="boughtItems.ordered"></ItemCount>
        </div>
        <div id="delivered-items" class="grid-item-center">
          <ItemCount text="Delivered Items" v-model:count="boughtItems.delivered"></ItemCount>
        </div>
        <div id="partial-items" class="grid-item-center">
          <ItemCount text="Partial Items" v-model:count="boughtItems.partial"></ItemCount>
        </div>
        <div id="late-items" class="grid-item-center">
          <ItemCount text="Late Items" v-model:count="boughtItems.late"></ItemCount>
        </div>
        <div id="canceled-items" class="grid-item-center">
          <ItemCount text="Canceled Items" v-model:count="boughtItems.canceled"></ItemCount>
        </div>
        <div id="data-note" class="grid-item-left">
          Showing all items that have been edited within the last 30 days.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/gridBase.scss';

h1 {
  padding-bottom: 35px;
}

.container {
  padding: 30px;
  border: none;
}

#grid {
  grid-gap: 20px;
  grid-template-rows: 380px 92px 92px auto 50px;
  // grid-template-rows: 380px 92px 92px 380px auto 50px;
  grid-template-columns: 270px 270px 270px 270px;
  grid-template-areas: "items-overview items-overview users-overview users-overview"
    "active-items open-items requested-items ordered-items"
    "delivered-items partial-items late-items canceled-items"
    // "items-timeline items-timeline items-timeline items-timeline"
    "placeholder placeholder placeholder placeholder"
    "data-note data-note data-note data-note"
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