<template>
  <div class="mobile-menu flex align just">
    <div class="mobile-menu-btn">
      <img
        @click="closeMenu"
        src="https://cdn1.iconfinder.com/data/icons/thin-ui-1/100/Noun_Project_100Icon_1px_grid_thin_ic_arrow_left_simple-512.png"
        alt=""
      />
    </div>

    <div v-if="user" class="mobile-menu-badge">
      <img :src="user.imgUrl" />
      <p>{{ user.fullname }}</p>
    </div>
    <div class="mobile-menu-list">
      <div class="mobile-menu-list-btn">
        <span>Personal info</span>
        <span>Account</span>
        <span>Messages</span>
        <span>Log out</span>
        <span>Help</span>
      </div>
      <div class="mobile-menu-list-btn">
        <p>Hosting</p>
        <span>Host your home</span>
        <span @click="moveToListings">
          <el-badge :value="notification" class="item">
            Manage listings
          </el-badge>
        </span>
      </div>
      <div class="last mobile-menu-list-btn">
        <p>Travel</p>
        <span>Trips</span>
        <!-- <span>Wishlists</span> -->
      </div>
      <!-- <div class="mobile-menu-logout">
        <button>Log out</button>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    notification: {
      type: String,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {};
  },

  methods: {
    moveToListings() {
      this.$emit("readNotification");
      this.$router.push({ path: "/user" });
      this.closeMenu();
    },
    closeMenu() {
      console.log("closing");
      this.$emit("closeMenu");
    },
  },
  computed: {
    orderStatus() {
      if (this.notification) return true;
      else return false;
    },
  },
};
</script>

<style>
.notification-red {
  color: red;
}
</style>
