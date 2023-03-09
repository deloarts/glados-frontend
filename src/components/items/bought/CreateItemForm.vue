<script lang="ts">
import { ref } from "vue";
import moment from "moment";

import Toggle from "@vueform/toggle";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import SelectNewUpdate from "@/components/elements/SelectNewUpdate.vue";

export default {
  name: 'CreateItemForm.vue',
  props: ["formData"],
  emits: ["update:formData"],
  components: {
    Toggle,
    SelectNewUpdate,
    Datepicker
  },
  setup() {
    const pickedDesiredDate = ref(); // ref(new Date());

    const formatDesiredDate = (pickedDesiredDate: Date) => {
      const day = pickedDesiredDate.getDate();
      const month = pickedDesiredDate.getMonth() + 1;
      const year = pickedDesiredDate.getFullYear();

      return `${day}.${month}.${year}`;
    }

    return {
      pickedDesiredDate,
      formatDesiredDate
    }
  },
  data() {
    return {
      // Globals
      notificationWarning: this.$notificationWarning,
      notificationInfo: this.$notificationInfo,

      // Vars
      name: "",
      highPriority: false,

      // Options
      availableOptionsPriority: [
        { text: "Normal", value: "normal" },
        { text: "High", value: "high" }
      ],
      availableUnits: [],
    };
  },
  methods: {
    buildPartnumber() {
      const partnumber = this.name + " - " + this.formData.definition + " - " + this.formData.manufacturer;
      let formData = this.formData;
      formData["partnumber"] = partnumber;
      this.$emit("update:formData", formData);
    }
  },
  watch: {
    formData: {
      handler: function (newVal) {

        // if (this.formData.priority == "high") {
        //   this.highPriority = true;
        // } else {
        //   this.highPriority = false;
        // }

        if (this.formData.desired_delivery_date != null && this.formData.desired_delivery_date != undefined) {
          const date = Date.parse(String(this.formData.desired_delivery_date));
          this.pickedDesiredDate = new Date(date);
        }

        this.buildPartnumber();
        this.$emit("update:formData", this.formData);
      },
      deep: true
    },

    name() {
      this.buildPartnumber();
    },

    pickedDesiredDate() {
      if (this.pickedDesiredDate instanceof Date) {
        this.formData.desired_delivery_date = moment(this.pickedDesiredDate).format("YYYY-MM-DD");
      } else {
        this.formData.desired_delivery_date = null;
      }
    },

    // highPriority() {
    //   if (this.highPriority) {
    //     this.formData.priority = "high";
    //   } else {
    //     this.formData.priority = "normal";
    //   }
    // }
  },
  mounted() {
  },
  beforeMount() {
  }
};
</script>

<template>
  <div class="scope">
    <div class="container">
      <div id="grid">
        <div id="project" class="grid-item-center">
          <input class="text-input" v-model="formData.project" placeholder="Project *">
        </div>
        <div id="machine" class="grid-item-center">
          <input class="text-input" v-model="formData.machine" placeholder="Machine">
        </div>
        <div id="quantity" class="grid-item-center">
          <input class="text-input" v-model="formData.quantity" type="number" placeholder="Quantity *">
        </div>
        <div id="unit" class="grid-item-center">
          <SelectNewUpdate v-model:selection="formData.unit" />
        </div>
        <div id="name" class="grid-item-center">
          <input class="text-input" v-model="name" placeholder="Name *">
        </div>
        <div id="definition" class="grid-item-center">
          <input class="text-input" v-model="formData.definition" placeholder="Definition *">
        </div>
        <div id="manufacturer" class="grid-item-center">
          <input class="text-input" v-model="formData.manufacturer" placeholder="Manufacturer *">
        </div>
        <div id="supplier" class="grid-item-center">
          <input class="text-input" v-model="formData.supplier" placeholder="Supplier">
        </div>
        <div id="desired" class="grid-item-center">
          <Datepicker class="date-input" v-model="pickedDesiredDate" :format="formatDesiredDate" :clearable="true"
            placeholder="Desired Delivery Date" dark />
        </div>
        <div id="note-general" class="grid-item-center">
          <textarea class="text-input-multiline" v-model="formData.note_general" placeholder="Note"></textarea>
        </div>
        <div id="note-supplier" class="grid-item-center">
          <textarea class="text-input-multiline" v-model="formData.note_supplier"
            placeholder="Note Supplier"></textarea>
        </div>
        <div id="notify" class="grid-item-center">
          <Toggle v-model="formData.notify_on_delivery"></Toggle>
        </div>
        <div id="notify-text" class="grid-item-left">
          Notify me on delivery
        </div>
        <div id="priority" class="grid-item-center">
          <Toggle v-model="formData.high_priority"></Toggle>
        </div>
        <div id="priority-text" class="grid-item-left">
          High priority
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';
@import '@/assets/gridBase.scss';


.container {
  padding-top: 25px;
  padding-bottom: 25px;
}

#grid {
  grid-gap: 10px;
  grid-template-rows: 40px 40px 40px 40px 40px 40px 40px 40px 25px 25px;
  grid-template-columns: 50px 200px 150px 450px;
  grid-template-areas: "project project project note-general"
    "machine machine machine note-general"
    "quantity quantity unit note-general"
    "name name name note-general"
    "definition definition definition note-supplier"
    "manufacturer manufacturer manufacturer note-supplier"
    "supplier supplier supplier note-supplier"
    "desired desired desired note-supplier"
    "notify notify-text notify-text notify-text"
    "priority priority-text priority-text priority-text"
}

#notify {
  grid-area: notify;
}

#notify-text {
  grid-area: notify-text;
}

#priority {
  grid-area: priority;
}

#priority-text {
  grid-area: priority-text;
}

#project {
  grid-area: project;
}

#machine {
  grid-area: machine;
}

#quantity {
  grid-area: quantity;
}

#unit {
  grid-area: unit;
}

#name {
  grid-area: name;
}

#definition {
  grid-area: definition;
}

#manufacturer {
  grid-area: manufacturer;
}

#supplier {
  grid-area: supplier;
}

#desired {
  grid-area: desired;
}

#note-general {
  grid-area: note-general;
  padding-top: 10px;
  padding-bottom: 10px;
}

#note-supplier {
  grid-area: note-supplier;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>