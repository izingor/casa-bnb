<template>
  <!-- <div> -->
  <header
    class="main-header"
    ref="header"
    :class="{
      visible: !isOpen,
    }"
    :style="{ backgroundColor: searchStatus }"
  >
    <div
      :class="{
        'main-layout': screenSize.isHome,
        'details-layout': !screenSize.isHome,
      }"
    >
      <div class="header-content flex space">
        <div class="logo flex align">
          <h2>
            <router-link :class="{ 'color-theme': colorsChange }" to="/">
              <span class="logo-txt">casa</span>
              <span class="casa-symbol">⌂</span>
              <span class="logo-txt">bnb</span>
            </router-link>
          </h2>
        </div>
        <small-search-bar
          :isOpen="isOpen"
          @openSearch="openSearch"
        ></small-search-bar>
        <mobile-search-bar
          @onMobileSearchOpened="onMobileSearchOpened"
        ></mobile-search-bar>
        <mobile-search-menu
          :isMobileSearchOpen="isMobileSearchOpen"
          @onMobileSearchClosed="onMobileSearchClosed"
          :class="{ 'mobile-search-slide': isMobileSearchOpen }"
        ></mobile-search-menu>
        <nav class="nav-bar flex just align space">
          <div class="explore-link flex just align">
            <router-link :class="{ 'color-black': colorsChange }" to="/stay"
              >Explore</router-link
            >
          </div>
          <div class="host-link flex just align">
            <router-link :class="{ 'color-black': colorsChange }" to="/"
              >Become a Host</router-link
            >
          </div>
          <!-- <router-link></router-link> -->
          <user-badge :isMobileSize = "screenSize.isMobileSize"></user-badge>
        </nav>
      </div>
      <stay-search v-if="isOpen" :screenSize="screenSize"></stay-search>
    </div>
  </header>
  <!-- </div> -->
</template>
<script>
import userBadge from "./app-header-cmps/user-badge.vue";
import staySearch from "../components/stay-search.vue";
import datePicker from "../components/date-picker.vue";
import smallSearchBar from "../components/small-search-bar.vue";
import mobileSearchBar from "./app-header-cmps/mobile-search-bar.vue";
import mobileSearchMenu from "./app-header-cmps/mobile-search-menu.vue";

export default {
  name: "app-header",
  data() {
    return {
      isOpen: null,
      colorsChange: null,
      isSearchClicked: false,
      isDetailsPage: false,
      isMobileSearchOpen: false,
      screenSize: {
        isMobileSize: false,
        isMediumSize: false,
        isHome: true,
        path: null,
      },
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.checkScreenSize);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    handleScroll() {
      if (window.scrollY === 0 && this.$route.path === "/") {
        this.colorsChange = false;
        this.isOpen = true;
      }
      if (window.scrollY !== 0) {
        this.colorsChange = true;
        this.isOpen = false;
        this.isSearchClicked = false;
      }
    },
    openSearch() {
      console.log("header opening search");
      this.isOpen = true;
      this.isDetailsPage = false;
      this.isSearchClicked = true;
    },
    checkPagePath() {
      const stayPath = this.$route.path.substring(1, 5);
      this.screenSize.path = stayPath;
      this.$emit("screenResize", this.screenSize);
      if (this.$route.path !== "/") {
        this.isOpen = false;
        this.colorsChange = true;
        this.screenSize.isHome = false;
        this.isDetailsPage = true;
      } else {
        this.screenSize.isHome = true;
        this.isOpen = true;
        this.colorsChange = false;
        this.isSearchClicked = false;
        // this.isDetailsPage = false;
      }
      this.$emit("currPath", this.$route.path);
    },
    onMobileSearchOpened() {
      this.isMobileSearchOpen = !this.isMobileSearchOpen;
    },
    onMobileSearchClosed() {
      this.isMobileSearchOpen = !this.isMobileSearchOpen;
    },
    checkScreenSize({ target }) {
      const screenSize = target.innerWidth;
      if (screenSize < 992) this.screenSize.isMediumSize = true;
      else this.screenSize.isMediumSize = false;
      if (screenSize < 780) {
        this.screenSize.isMobileSize = true;
      } else {
        this.screenSize.isMobileSize = false;
        this.$emit("screenResize", this.screenSize);
      }
    },
  },

  computed: {
    searchStatus() {
      if (this.isSearchClicked) return "rgba(255, 255, 255)";
    },
  },
  watch: {
    $route(to, from) {
      this.checkPagePath();
    },
  },
  components: {
    userBadge,
    staySearch,
    datePicker,
    smallSearchBar,
    mobileSearchBar,
    mobileSearchMenu,
  },
};
</script>
