<script lang="ts">
import { ref, inject } from 'vue';

import moment from "moment";
import Datepicker from 'vue3-datepicker';

import constants from "@/constants";
import { usersService } from "@/services/users.service";
import { boughtItemsService } from "@/services/items.service";
import { getFilterParams } from "@/requests/params";
import { boughtItemsRequest } from "@/requests/items";
import IconBellRing from "@/components/icons/IconBellRing.vue";

export default {
  name: 'BoughtItems',
  props: ["selectedItemIds", "triggerGetNewData", "showRainbow", "showTextOnly", "showFixHeight", "showUnclutter", "showRequestView", "filter"],
  emits: ["update:selectedItemIds", "update:triggerGetNewData", "update:filter"],
  components: {
    IconBellRing,
    Datepicker
  },
  setup() {
    const currentUser = inject("currentUser");
    // const currentUser = inject(currentUserKey);
    return {
      currentUser,
    }
  },
  data() {
    return {
      // Globals
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,

      // Controlling vars
      autoFetchIsPaused: false,

      // Select options
      availableOptionsStatus: [
        { text: "Open", value: "open" },
        { text: "Requested", value: "requested" },
        { text: "Ordered", value: "ordered" },
        { text: "Late", value: "late" },
        { text: "Partial", value: "partial" },
        { text: "Delivered", value: "delivered" },
        { text: "Canceled", value: "canceled" },
        { text: "Lost", value: "lost" }
      ],

      // Items
      lineIndex: 0,
      boughtItems: [{
        _type: "data",
        id: 0,
        status: "",
        group_1: "",
        created: "",
        creator_id: "",
        high_priority: "",
        notify_on_delivery: "",
        project: "",
        machine: "",
        quantity: "",
        unit: "",
        partnumber: "",
        definition: "",
        supplier: "",
        manufacturer: "",
        note_general: "",
        note_supplier: "",
        desired_delivery_date: "",
        requester_id: "",
        requested_date: "",
        orderer_id: "",
        ordered_date: "",
        expected_delivery_date: ref(new Date()),
        taken_over_id: "",
        delivery_date: "",
        storage_place: ""
      }],

      pickedExpectedDate: ref(new Date()),
      pickedDesiredDate: ref(new Date()),

      // Users
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

        console.log(userById);
        this.userById = userById;
      });
    },


    fetchBoughtItems() {
      const params = getFilterParams(this.filter);

      boughtItemsService.clearCache();
      boughtItemsService.getItems(params).then(response => {
        const dataIn = response.data;
        // const dataOut = [];
        // var previousProject = "";
        // for (let i = 0; i < dataIn; i++) {
        //   if (dataIn[i].project != previousProject) {
        //     dataOut.push({ _type: "Header", project: dataIn[i].project })
        //     previousProject = dataIn[i].project
        //   }
        //   dataOut.push(dataIn[i])
        // }
        // this.boughtItems = dataOut;
        this.boughtItems = dataIn;
      });
    },

    autoFetchBoughtItems() {
      boughtItemsService.clearCache();
      if (this.$route.path != '/items/bought') {
        console.info('Stopped updating routine for bought items: User leaved site.');
      } else if (this.autoFetchIsPaused) {
        console.info('Paused updating routine for bought items.');
        setTimeout(this.autoFetchBoughtItems.bind(this), constants.fetchBoughtItemsAfter);
      } else {
        console.log("Automatically fetching bought items...");
        const params = getFilterParams(this.filter);
        boughtItemsService.getItems(params).then(response => {
          this.boughtItems = response.data;
          setTimeout(this.autoFetchBoughtItems.bind(this), constants.fetchBoughtItemsAfter);
        });
      }
    },

    pauseFetchBoughtItems(state: boolean) {
      if (state) {
        // Wait 100ms before stopping the auto fetch routine because if the user sets the focus on another
        // element it could be possible, that the pause is reset by another element before it's set by the
        // current element.
        setTimeout(() => { this.autoFetchIsPaused = true }, 100);
      } else {
        this.autoFetchIsPaused = false;
      }
    },

    multiSelect(event: any, id: number, lineIndex: number) {
      var selectedItemIds = this.selectedItemIds;

      if (event.ctrlKey) {
        if (selectedItemIds.includes(id)) {
          selectedItemIds.splice(selectedItemIds.indexOf(id), 1);
        } else {
          selectedItemIds.push(id);
        }
      }
      else if (event.shiftKey) {
        var indexRange = [];
        var highEnd = 0;
        var lowEnd = 0;
        selectedItemIds = [];

        if (this.lineIndex > lineIndex) {
          highEnd = this.lineIndex + 1;
          lowEnd = lineIndex + 1;
        } else {
          highEnd = lineIndex + 1;
          lowEnd = this.lineIndex + 1;
        }
        var c = highEnd - lowEnd + 1;
        while (c--) {
          indexRange[c] = highEnd--
        }
        for (var i = 0; i < indexRange.length; i++) {
          selectedItemIds.push(this.boughtItems[indexRange[i] - 1].id);
        }
      }
      else if (!selectedItemIds.includes(id)) {
        selectedItemIds = [id];
      }

      this.lineIndex = lineIndex;
      this.$emit("update:selectedItemIds", selectedItemIds);
    },

    removeSelection() {
      this.$emit("update:selectedItemIds", []);
    },

    looseFocus(event: any) {
      event.target.blur();
    },

    updateStatus(status: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsStatus(id, status).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated status.";
          }
        });
      }
    },

    updateGroup1(group: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (group == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsGroup1(id, group).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated group.";
          }
        });
      }
    },

    updateProject(project: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (project == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsProject(id, project).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated project.";
          }
        });
      }
    },

    updateMachine(machine: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (machine == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsMachine(id, machine).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated machine.";
          }
        });
      }
    },

    updateQuantity(qty: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (qty == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsQuantity(id, qty).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated quantity.";
          }
        });
      }
    },

    updatePartnumber(partnumber: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (partnumber == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsPartnumber(id, partnumber).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated partnumber.";
          }
        });
      }
    },

    updateDefinition(definition: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (definition == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsDefinition(id, definition).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated definition.";
          }
        });
      }
    },

    updateManufacturer(manufacturer: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (manufacturer == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsManufacturer(id, manufacturer).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated manufacturer.";
          }
        });
      }
    },

    updateSupplier(supplier: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (supplier == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsSupplier(id, supplier).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated supplier.";
          }
        });
      }
    },

    updateNoteGeneral(note: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (note == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsNoteGeneral(id, note).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated note.";
          }
        });
      }
    },

    updateNoteSupplier(note: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (note == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsNoteSupplier(id, note).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated supplier note.";
          }
        });
      }
    },

    setDesiredDeliveryDate(date: any) {
      if (date != null && date != undefined) {
        this.pickedDesiredDate = new Date(date);
      } else {
        //@ts-ignore
        this.pickedDesiredDate = null; // new Date();
      }
    },

    updateDesiredDeliveryDate() {
      var c = 0;
      const ids = this.selectedItemIds;
      const formattedDate = moment(this.pickedDesiredDate).format("YYYY-MM-DD");
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsDesiredDeliveryDate(id, formattedDate).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated desired delivery date.";
          }
        });
      }
    },

    setExpectedDeliveryDate(date: any) {
      if (date != null && date != undefined) {
        this.pickedExpectedDate = new Date(date);
      } else {
        //@ts-ignore
        this.pickedExpectedDate = null;  // new Date();
      }
    },

    updateExpectedDeliveryDate() {
      var c = 0;
      const ids = this.selectedItemIds;
      const formattedDate = moment(this.pickedExpectedDate).format("YYYY-MM-DD");
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsExpectedDeliveryDate(id, formattedDate).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated expected delivery date.";
          }
        });
      }
    },

    updateStorage(storage: string) {
      var c = 0;
      const ids = this.selectedItemIds;
      if (storage == null) { return }
      for (var i = 0; i < ids.length; i++) {
        const id = ids[i];
        boughtItemsRequest.putItemsStorage(id, storage).then(response => {
          c++;
          if (response.status == 403) {
            this.notificationWarning = response.data.detail;
          }
          if (c == ids.length) {
            this.fetchBoughtItems();
            // @ts-ignore
            this.notificationInfo = "Updated storage place.";
          }
        });
      }
    },

    calcDiffInWeeks(fromDate: any, toDate: any) {
      if (fromDate == null || toDate == null) { return ""; }
      const to = moment(toDate);
      const from = moment(fromDate);
      return to.diff(from, "week");
    },

    calcDiffInWeeksFromToday(toDate: any) {
      if (toDate == null) { return ""; }
      const to = moment(toDate);
      return to.diff(moment(), "week");
    },

    resizeTextarea(event: any) {
      var textarea = event.target;
      textarea.style.width = "252px";
      textarea.style.height = "20px";
      textarea.style.height = textarea.scrollHeight + "px";
    },
  },
  watch: {
    triggerGetNewData() {
      if (this.triggerGetNewData) {
        this.fetchBoughtItems();
        this.$emit("update:triggerGetNewData", false);
        this.$emit("update:selectedItemIds", []);
      }
    },

    // autoFetchIsPaused() {
    //   if (!this.autoFetchIsPaused) {
    //     boughtItemsService.clearCache();
    //     this.autoFetchBoughtItems();
    //   }
    // },

    filter: {
      handler: function (newVal) {
        this.$emit("update:filter", this.filter);
        this.$emit("update:selectedItemIds", []);

        // This could slow down everything...
        this.fetchBoughtItems();
      },
      deep: true
    },
    // pickedExpectedDate() {
    //   this.updateExpectedDeliveryDate();
    // },
    // pickedDesiredDate() {
    //   this.updateDesiredDeliveryDate();
    // }
  },
  created() {
    let vm = this;
    document.addEventListener("keyup", function (event) {
      if (event.key === "Escape") {
        vm.removeSelection();
      }
    })
  },
  mounted() {
    this.boughtItems = [];

    this.fetchUserById();
    // this.fetchBoughtItems();
    this.autoFetchBoughtItems();
  },
}
</script>

<template>
  <div class="scope" v-on:keyup.esc="removeSelection">
    <div class="wrapper">
      <table class="cursor-default" v-bind:class="{ 'allow-text-select': showTextOnly, 'cursor-text': showTextOnly }">
        <thead>
          <tr>
            <th class="first sticky-col" id="number">#</th>
            <th class="first sticky-col" id="item-id">ID</th>
            <th class="first sticky-col" id="status">Status</th>
            <th class="first sticky-col" id="project">Project</th>
            <th class="first sticky-col" id="machine">Machine</th>
            <th class="first sticky-col" id="quantity">Qty</th>
            <th class="first sticky-col" id="unit">Unit</th>
            <th class="first sticky-col" id="partnumber">Partnumber</th>
            <th class="first" id="definition">Definition</th>
            <th class="first" id="manufacturer">Manufacturer</th>
            <th class="first" id="supplier">Supplier</th>
            <th class="first" id="group">Group</th>
            <th class="first" id="note-general">Note</th>
            <th class="first" id="note-supplier">Supplier Note</th>
            <th class="first" id="created" v-if="!showRequestView">Created</th>
            <th class="first" id="creator" v-if="!showUnclutter && !showRequestView">Creator</th>
            <th class="first" id="desired">Desired</th>
            <th class="first" id="requested" v-if="!showRequestView">Requested</th>
            <th class="first" id="requester" v-if="!showUnclutter && !showRequestView">Requester</th>
            <th class="first" id="ordered" v-if="!showRequestView">Ordered</th>
            <th class="first" id="orderer" v-if="!showUnclutter && !showRequestView">Orderer</th>
            <th class="first" id="expected" v-if="!showRequestView">Expected</th>
            <th class="first" id="delivered" v-if="!showRequestView">Delivered</th>
            <th class="first" id="taken-over-by" v-if="!showUnclutter && !showRequestView">Taken by</th>
            <th class="first" id="arrival-weeks" v-if="!showUnclutter && !showRequestView">Arrival</th>
            <th class="first" id="total-delivery-weeks" v-if="!showUnclutter && !showRequestView">Total</th>
            <th class="first" id="storage-place" v-if="!showUnclutter && !showRequestView">Storage</th>
          </tr>
          <tr v-if="showTextOnly == false">
            <th class="second sticky-col" id="number">
              <!-- {{ filter.limit }} -->
            </th>
            <th class="second sticky-col" id="item-id" @contextmenu.prevent="() => { filter.id = '' }">
              <input class="filter-input" v-model="filter.id" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second sticky-col" id="status" @contextmenu.prevent="() => { filter.status = '' }">
              <select class="filter-select" v-model="filter.status" @change="fetchBoughtItems">
                <option value="">All</option>
                <option v-for="option in availableOptionsStatus" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </th>
            <th class="second sticky-col" id="project" @contextmenu.prevent="() => { filter.project = '' }">
              <input class="filter-input" v-model="filter.project" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second sticky-col" id="machine" @contextmenu.prevent="() => { filter.machine = '' }">
              <input class="filter-input" v-model="filter.machine" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second sticky-col" id="quantity"></th>
            <th class="second sticky-col" id="unit"></th>
            <th class="second sticky-col" id="partnumber" @contextmenu.prevent="() => { filter.partnumber = '' }">
              <input class="filter-input" v-model="filter.partnumber" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second" id="definition" @contextmenu.prevent="() => { filter.definition = '' }">
              <input class="filter-input" v-model="filter.definition" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second" id="manufacturer" @contextmenu.prevent="() => { filter.manufacturer = '' }">
              <input class="filter-input" v-model="filter.manufacturer" v-on:keyup.enter="fetchBoughtItems()"
                type="text" placeholder="Filter">
            </th>
            <th class="second" id="supplier" @contextmenu.prevent="() => { filter.supplier = '' }">
              <input class="filter-input" v-model="filter.supplier" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second" id="group" @contextmenu.prevent="() => { filter.group1 = '' }">
              <input class="filter-input" v-model="filter.group1" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second" id="note-general"></th>
            <th class="second" id="note-supplier"></th>
            <th class="second" id="created" v-if="!showRequestView"
              @contextmenu.prevent="() => { filter.createdDate = '' }">
              <input class="filter-input" v-model="filter.createdDate" v-on:keyup.enter="fetchBoughtItems()" type="text"
                placeholder="Filter">
            </th>
            <th class="second" id="creator" v-if="!showUnclutter && !showRequestView"></th>
            <th class="second" id="desired"></th>
            <th class="second" id="requested" v-if="!showRequestView"></th>
            <th class="second" id="requester" v-if="!showUnclutter && !showRequestView"></th>
            <th class="second" id="ordered" v-if="!showRequestView"></th>
            <th class="second" id="orderer" v-if="!showUnclutter && !showRequestView"></th>
            <th class="second" id="expected" v-if="!showRequestView"></th>
            <th class="second" id="delivered" v-if="!showRequestView"></th>
            <th class="second" id="taken-over-by" v-if="!showUnclutter && !showRequestView"></th>
            <th class="second" id="arrival-weeks" v-if="!showUnclutter && !showRequestView">(Weeks)</th>
            <th class="second" id="total-delivery-weeks" v-if="!showUnclutter && !showRequestView">(Weeks)</th>
            <th class="second" id="storage-place" v-if="!showUnclutter && !showRequestView"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in boughtItems" :key="item.id" v-on:click="
          multiSelect($event, item.id, index),
          setExpectedDeliveryDate(item.expected_delivery_date),
          setDesiredDeliveryDate(item.desired_delivery_date)" v-bind:class="{
    'selected': selectedItemIds.includes(item.id),
    'open': showRainbow && item.status == 'open',
    'requested': showRainbow && item.status == 'requested',
    'ordered': showRainbow && item.status == 'ordered',
    'late': showRainbow && item.status == 'late',
    'partial': showRainbow && item.status == 'partial',
    'delivered': showRainbow && item.status == 'delivered',
    'canceled': showRainbow && item.status == 'canceled',
    'lost': showRainbow && item.status == 'lost'
  }">
            <td id="number" class="sticky-col">
              <IconBellRing v-if="item.high_priority" class="bell-icon" />
              <span v-else>{{ index + 1 }}</span>
            </td>
            <td id="item-id" class="sticky-col" @contextmenu.prevent="() => { filter.id = item.id }">
              {{ item.id }}
            </td>
            <td id="status" class="sticky-col" @contextmenu.prevent="() => { filter.status = item.status }">
              <select v-if="//@ts-ignore
              currentUser && currentUser.is_superuser && showTextOnly == false" class="cell-select"
                v-model="item.status" @change="updateStatus(item.status)">
                <option v-for="option in availableOptionsStatus" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
              <div v-else>
                {{ item.status.toUpperCase() }}
              </div>
            </td>
            <td id="project" class="sticky-col" @contextmenu.prevent="() => { filter.project = item.project }">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.project" type="text" placeholder="Project"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateProject(item.project), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.project }}
              </div>
            </td>
            <td id="machine" class="sticky-col" @contextmenu.prevent="() => { filter.machine = item.machine }">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.machine" type="text" placeholder="Machine"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateMachine(item.machine), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.machine }}
              </div>
            </td>
            <td id="quantity" class="sticky-col">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.quantity" type="number" placeholder="Quantity"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateQuantity(item.quantity), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.quantity }}
              </div>
            </td>
            <td id="unit" class="sticky-col">
              <div v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.unit }}
              </div>
            </td>
            <td id="partnumber" class="sticky-col" @contextmenu.prevent="() => { filter.partnumber = item.partnumber }">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.partnumber" type="text" placeholder="Partnumber"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updatePartnumber(item.partnumber), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.partnumber }}
              </div>
            </td>
            <td id="definition" @contextmenu.prevent="() => { filter.definition = item.definition }">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.definition" type="text" placeholder="Definition"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateDefinition(item.definition), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.definition }}
              </div>
            </td>
            <td id="manufacturer" @contextmenu.prevent="() => { filter.manufacturer = item.manufacturer }">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.manufacturer" type="text" placeholder="Manufacturer"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateManufacturer(item.manufacturer), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.manufacturer }}
              </div>
            </td>
            <td id="supplier" @contextmenu.prevent="() => { filter.supplier = item.supplier }">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.supplier" type="text" placeholder="Supplier"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateSupplier(item.supplier), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.supplier }}
              </div>
            </td>
            <td id="group" @contextmenu.prevent="() => { filter.group1 = item.group_1 }">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.group_1" type="text" placeholder="Group"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateGroup1(item.group_1), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.group_1 }}
              </div>
            </td>
            <td id="note-general">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <textarea class="cell-textarea-note" v-model="item.note_general" type="text" placeholder="Note"
                  @input="resizeTextarea($event)" @focusin="pauseFetchBoughtItems(true), resizeTextarea($event)"
                  @focusout="updateNoteGeneral(item.note_general), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)"></textarea>
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.note_general }}
              </div>
            </td>
            <td id="note-supplier">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <textarea class="cell-textarea-note" v-model="item.note_supplier" type="text"
                  placeholder="Supplier Note" @input="resizeTextarea($event)"
                  @focusin="pauseFetchBoughtItems(true), resizeTextarea($event)"
                  @focusout="updateNoteSupplier(item.note_supplier), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)"></textarea>
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.note_supplier }}
              </div>
            </td>
            <td id="created" v-if="!showRequestView" @contextmenu.prevent="() => { filter.createdDate = item.created }">
              {{ item.created }}
            </td>
            <td id="creator" v-if="!showUnclutter && !showRequestView">
              <div v-bind:class="{ 'fix-height': showFixHeight }">{{
              //@ts-ignore
              userById[item.creator_id] }}
              </div>
            </td>
            <td id="desired">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <!-- <Datepicker class="datepicker" v-model="pickedDesiredDate" style="width:75px;text-align:center" /> -->
                <Datepicker class="datepicker" v-model="pickedDesiredDate"
                  @update:model-value="updateDesiredDeliveryDate" style="width:75px;height:14px;text-align:center" />
              </div>
              <div v-else>
                {{ item.desired_delivery_date }}
              </div>
            </td>
            <td id="requested" v-if="!showRequestView">{{ item.requested_date }}</td>
            <td id="requester" v-if="!showUnclutter && !showRequestView">
              <div v-bind:class="{ 'fix-height': showFixHeight }">{{
              //@ts-ignore
              userById[item.requester_id] }}
              </div>
            </td>
            <td id="ordered" v-if="!showRequestView">{{ item.ordered_date }}</td>
            <td id="orderer" v-if="!showUnclutter && !showRequestView">
              <div v-bind:class="{ 'fix-height': showFixHeight }">{{
              //@ts-ignore
              userById[item.orderer_id] }}
              </div>
            </td>
            <td id="expected" v-if="!showRequestView">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <!-- <Datepicker class="datepicker" v-model="pickedExpectedDate" style="width:75px;text-align:center" /> -->
                <Datepicker class="datepicker" v-model="pickedExpectedDate"
                  @update:model-value="updateExpectedDeliveryDate" style="width:75px;height:14px;text-align:center" />
              </div>
              <div v-else>
                {{ item.expected_delivery_date }}
              </div>
            </td>
            <td id="delivered" v-if="!showRequestView">{{ item.delivery_date }}</td>
            <td id="taken-over-by" v-if="!showUnclutter && !showRequestView">
              <div v-bind:class="{ 'fix-height': showFixHeight }">{{
              //@ts-ignore
              userById[item.taken_over_id] }}
              </div>
            </td>
            <td id="arrival-weeks" v-if="!showUnclutter && !showRequestView">{{
              calcDiffInWeeksFromToday(item.expected_delivery_date)
            }}</td>
            <td id="total-delivery-weeks" v-if="!showUnclutter && !showRequestView">{{
              calcDiffInWeeks(item.ordered_date, item.delivery_date)
            }}</td>
            <td id="storage-place" v-if="!showUnclutter && !showRequestView">
              <div v-if="//@ts-ignore
              currentUser.is_superuser && selectedItemIds.includes(item.id) && showTextOnly == false">
                <input class="cell-input" v-model="item.storage_place" type="text" placeholder="Storage Place"
                  @focusin="pauseFetchBoughtItems(true)"
                  @focusout="updateStorage(item.storage_place), pauseFetchBoughtItems(false)"
                  v-on:keyup.enter="looseFocus($event), pauseFetchBoughtItems(false)">
              </div>
              <div v-else v-bind:class="{ 'fix-height': showFixHeight }">
                {{ item.storage_place }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";

.scope {
  width: 100%;
  height: 100%;

  color: black;
  background-color: white;

  border-radius: 5px;
}

.wrapper {
  overflow-x: auto;
  overflow-y: auto;
  height: 100%;

  border-radius: 5px;

  position: relative;
  // white-space: nowrap;
}

.bell-icon {
  color: red;
  transform: scale(0.6);
  vertical-align: middle;
}

table {
  // border-collapse: collapse;
  border-collapse: separate;
  border-spacing: 0;

  width: 100%;
  border-radius: 5px;
}

th {
  z-index: 10;
  // padding: 8px;
  // margin: 8px;
  font-family: 'Play', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px; //0.9em;
}

tr {
  margin: 0;
  padding: 0;
  height: 20px;
}

tbody tr {
  border-bottom: solid thin rgb(50, 50, 50);
}

tr:nth-child(even)>td {
  background: rgb(230, 230, 230)
}

tr:nth-child(odd)>td {
  background: rgb(240, 240, 240)
}

tr:hover>td {
  filter: brightness(1.05)
}

tr.open>td {
  background: rgb(230, 230, 230)
}

tr.requested>td {
  background: rgb(240, 150, 70)
}

tr.ordered>td {
  background: rgb(240, 230, 70)
}

tr.late>td {
  background: rgb(250, 100, 80)
}

tr.partial>td {
  // background: rgb(180, 250, 170);
  background: rgb(90, 250, 90);
  background: linear-gradient(0deg, rgba(90, 250, 90, 1) 0%, rgba(240, 230, 70, 1) 50%);
}

tr.delivered>td {
  background: rgb(90, 250, 90);
}

tr.canceled>td {
  background: rgb(109, 109, 109);
  color: white;
}

tr.lost>td {
  background: rgb(80, 30, 30);
  color: white;
}

tr.selected>td {
  background: rgb(160, 220, 255);
  color: black;
  // font-weight: bold;
}

tr.selected:hover>td {
  background: rgb(170, 230, 255);
}

td {
  z-index: 0;
  height: 22px;

  font-size: 14px; //0.8em;

  margin: 0;
  padding: 0;
  // padding-top: 1px;
  // padding-bottom: 1px;
  // padding-left: 5px;
  // padding-right: 5px;

  word-wrap: break-word;
  border-right: solid thin rgb(220, 220, 220);
  border-bottom: solid thin rgb(100, 100, 100);
}

.fix-height {
  // height: 20px;
  // max-height: 20px;
  height: min-content;
  width: 100%; // calc(100% - 5px);

  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  white-space: nowrap;

  // background-color: aqua;
}

// Sticky rows & cols

.first {
  position: sticky;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  top: 0px;

  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;

  background: rgb(207, 207, 207);
}

.second {
  position: sticky;
  height: 30px;
  min-height: 30px;
  max-height: 30px;
  top: 40px;

  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;

  background: rgb(207, 207, 207);
  border-bottom: solid thin rgb(50, 50, 50);
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  // background-color: white;
  z-index: 20;
}

th.sticky-col {
  z-index: 40;
}

td.sticky-col {
  z-index: 30;
}


// columns
#number {
  width: 35px;
  min-width: 35px;
  max-width: 35px;
  left: 0px;
  text-align: center;
}

#item-id {
  width: 45px;
  min-width: 45px;
  max-width: 45px;
  left: 37px;
  text-align: center;
}

#status {
  width: 86px;
  min-width: 86px;
  min-width: 86px;
  left: 84px;
}

#project {
  width: 61px;
  min-width: 61px;
  max-width: 61px;
  left: 172px;
  text-align: center;
}

#machine {
  width: 61px;
  min-width: 61px;
  max-width: 61px;
  left: 235px;
  text-align: center;
}

#quantity {
  width: 41px;
  min-width: 41px;
  max-width: 41px;
  left: 298px;
  text-align: center;
}

#unit {
  width: 41px;
  min-width: 41px;
  max-width: 41px;
  left: 341px;
  text-align: center;
}

#partnumber {
  width: 301px;
  min-width: 301px;
  max-width: 301px;
  left: 384px;
}

#definition {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
}

#manufacturer {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

#supplier {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

#group {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
}

#note-general {
  width: auto;
  min-width: 152px;
  max-width: 252px;
}

#note-supplier {
  width: auto;
  min-width: 152px;
  max-width: 252px;
}

#created {
  width: 81px;
  min-width: 81px;
  max-width: 81px;
  text-align: center;
}

#creator {
  min-width: 121px;
  max-width: 121px;
}

#desired {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#requested {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#requester {
  min-width: 121px;
  max-width: 121px;
}

#ordered {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#orderer {
  min-width: 121px;
  max-width: 121px;
}

#expected {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#delivered {
  text-align: center;
  min-width: 81px;
  max-width: 81px;
}

#taken-over-by {
  min-width: 121px;
  max-width: 121px;
}

#total-delivery-weeks {
  text-align: center;
  min-width: 61px;
  max-width: 61px;
}

#arrival-weeks {
  text-align: center;
  min-width: 61px;
  max-width: 61px;
}

#storage-place {
  min-width: 221px;
  max-width: 221px;
}

// input elements
select {
  padding: 0;
  margin: 0;
}

input {
  padding: 0;
  margin: 0;
}

.cell-select {
  width: 100%;
  height: 18px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  border: none;
  background-color: transparent;

  font-size: 12px; //0.9em;
}

.cell-input {
  width: 100%;
  height: 18px;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  box-shadow: none;
  background-color: transparent;
  outline: none;
  border: none;
  border-color: inherit;

  font-size: 12.25px;
  // font-size: 13px; //0.9em;
}

.cell-textarea-note {
  width: 100%;
  min-width: 152px;
  max-width: 252px;

  height: 18px;
  min-height: 18px;
  // margin-top: 3px;
  // max-height: 300px;

  overflow: hidden;
  resize: none;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;

  box-shadow: none;
  background-color: transparent;
  outline: none;
  border: none;
  border-color: inherit;

  font-family: Calibri, Arial, Helvetica, sans-serif;
  font-size: 13.5px; //1em;
}

.filter-select {
  width: 100%;
  height: 22px;

  box-sizing: border-box;
}

.filter-input {
  width: 100%;
  height: 22px;

  box-sizing: border-box;
}
</style>
