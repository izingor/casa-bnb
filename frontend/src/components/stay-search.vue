<template>
  <div>
    <div class="filter-container">
      <form class="flex align just">
        <div class="filter">
          <div
            class="search-container-outer"
            :style="{ width: isSearchOpen ? '25%' : '30%' }"
          >
            <div class="search-container" @click="focusSearch">
              <div class="border"></div>
              <span>Location</span>
              <input
                class="search-input"
                v-model="filterBy.destination"
                type="text"
                placeholder="Where are you going?"
                ref="input"
              />
            </div>
          </div>
          <div class="date-start" @click="showDatePicker">
            <div class="border"></div>
            <span>Check in</span>
            <p>{{ startDate }}</p>
          </div>
          <div class="date-end" @click="showDatePicker">
            <div class="border"></div>
            <span>Check out</span>
            <p>{{ endDate }}</p>
          </div>
          <div class="relative">
            <!-- </add-guests-count> -->
            <add-guests-count
              v-if="addGuestsMenu"
              :guests="filterBy.guests"
              @addGuests="changeGuests"
            />
          </div>
          <div class="search-guests" @click="addGuests">
            <div class="guests-container">
              <span>Guests</span>
              <p v-if="!filterBy.guests">Add guests</p>
              <p v-else>{{ filterBy.guests }}</p>
            </div>
          </div>
          <div
            @click="openSearch"
            class="search-btn-container"
            :style="{ width: isSearchOpen ? '130px' : '50px' }"
          >
            <img src="../assets/Images/logos/search-icon.svg" alt="" />
            <p
              v-if="isSearchOpen"
              :style="{ opacity: isSearchOpen ? '100%' : '0%' }"
            >
              Search
            </p>
          </div>
        </div>
      </form>
      <el-date-picker
        v-model="pickedDates"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
  </div>
</template>

<script>
import addGuestsCount from "./add-guests-count.vue";

export default {
  name: "search",
  props: {
    isMobile: {
      type: Boolean,
    },
    screenSize: {
      type: Object,
    },
  },
  data() {
    return {
      isSearchOpen: false,
      addGuestsMenu: false,
      filterBy: {
        destination: "",
        guests: null,
      },
      pickedDates: null,
    };
  },
  created() {
    this.setFilter();
  },
  mounted() {
    window.addEventListener("click", this.clickCheck);
  },
  unmounted() {
    window.removeEventListener("click", this.clickCheck);
  },
  computed: {
    curFilterBy() {
      return this.$store.getters.filterBy;
    },
    startDate() {
      if (this.pickedDates) {
        const startDate = new Date(this.pickedDates[0]);
        return (
          new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            startDate
          ) +
          " " +
          startDate.getDate()
        );
      } else {
        return "Add dates";
      }
    },
    endDate() {
      if (this.pickedDates) {
        const endDate = new Date(this.pickedDates[1]);
        return (
          new Intl.DateTimeFormat("en-US", { month: "long" }).format(endDate) +
          " " +
          endDate.getDate()
        );
      } else {
        return "Add dates";
      }
    },
  },
  methods: {
    setFilter() {
      this.filterBy.destination = this.curFilterBy.destination;
      this.filterBy.guests = this.curFilterBy.guests;
    },
    doFilter() {
      this.$router.push({
        name: "stay",
        query: {
          destination: this.filterBy.destination,
          guests: this.filterBy.guests,
        },
      });
    },
    showDatePicker() {
      this.$el.querySelector(".el-range-editor").click();
      console.log('opening date picker');

    },
    openSearch() {
      if (this.screenSize.isMediumSize) {
        this.doFilter();
        return;
      }
      if (this.isSearchOpen) this.doFilter();
      this.isSearchOpen = true;
    },
    focusSearch() {
      this.$refs.input.focus();
      if (this.screenSize.isMediumSize) return;
      this.isSearchOpen = true;
    },
    clickCheck(ev) {
      const el = ev.target.className;
      const local = ev.target.localName;
      if (
        local === "img" ||
        local === "p" ||
        local === "span" ||
        el === "search-btn-container" ||
        el === "search-container" ||
        el === "search-input" ||
        el === "date-start" ||
        el === "date-end" ||
        el === "guests-container" ||
        el === "guests-input-modal flex aling just col space" ||
        el === "guests-details flex align just space" ||
        el === ""
      )
        return;
      else {
        this.isSearchOpen = false;
        this.addGuestsMenu = false;
      }
    },
    addDates() {
      this.dateMenu = !this.dateMenu;
      if (this.screenSize.isMediumSize) return;
      this.isSearchOpen = true;
    },
    addGuests() {
      this.addGuestsMenu = !this.addGuestsMenu;
      if (this.screenSize.isMediumSize) return;
      this.isSearchOpen = true;
    },
    changeGuests(num) {
      if (!this.filterBy.guests) this.filterBy.guests = 0;
      if (typeof this.filterBy.guests === "string")
        this.filterBy.guests = parseInt(this.filterBy.guests);
      if (num < 0 && this.filterBy.guests === 0) return;
      this.filterBy.guests += num;
    },
  },
  components: {
    addGuestsCount,
  },
};
</script>
