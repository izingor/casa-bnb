<template>
  <section v-if="stay" class="stay-details-header">
    <h1 class="details-header-name">{{ stay.name }}</h1>

    <div class="details-sub-header flex space wrap">
      <div class="details-sub-header-2 flex align just">
        <ratings-reviews :stay="stay" />
        <div class="details-header-location flex align">
          <span class="bullet">·</span>
          <p class = "stay-location-name"> {{ stay.loc.city }}, {{ stay.loc.country }} </p>
        </div>
      </div>

      <div class="save-share flex">
        <div class="details-header-share-section">
          <button type="button" class="share-btn">
            <div class="btn-text flex">
              <span class="share"
                ><svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style="
                    display: block;
                    fill: none;
                    height: 16px;
                    width: 16px;
                    stroke: currentcolor;
                    stroke-width: 2;
                    overflow: visible;
                  "
                >
                  <g fill="none">
                    <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"></path>
                    <path d="M16 3v23V3z"></path>
                    <path d="M6 13l9.293-9.293a1 1 0 0 1 1.414 0L26 13"></path>
                  </g></svg
              ></span>
              <u>Share</u>
            </div>
          </button>
        </div>
        <div class="details-header-save-section">
          <button type="button" class="save-btn">
            <div aria-hidden="true" class="btn-text flex">
              <span class="save">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style="
                    display: block;
                    fill: none;
                    height: 16px;
                    width: 16px;
                    stroke: currentcolor;
                    stroke-width: 2;
                    overflow: visible;
                  "
                >
                  <path
                    d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
                  ></path>
                </svg>
              </span>
              <u>Save</u>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import ratingsReviews from "./../reusable-cmps/ratings-reviews-cmp.vue";

export default {
  components: {
    ratingsReviews,
  },
  name: "stay-details-header",
  props: {
    stay: Object,
  },
  data() {
    return {};
  },
  async created() {},
  methods: {},
};
</script>