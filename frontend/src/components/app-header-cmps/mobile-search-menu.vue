<template>
	<section v-if="isMobileSearchOpen" class="mobile-search-menu flex col align">
		<div class="mobile-search-container flex just align">
			<div class="back-button flex align just" @click="closeMobileMenu">
				<img src="../../assets/Images/logos/back-button.svg" alt="" />
			</div>
			<input
				type="text"
				class="mobile-search-input"
				placeholder="Where are you going?"
				@change="setFilter"
				v-model="filterBy.destination"
			/>
		</div>
		<button class="medium-red-btn" @click="setFilter">Search</button>
	</section>
</template>
<script>
export default {
	name: 'mobile-search-menu',
	props: {
		isMobileSearchOpen: {
			type: Boolean,
		},
	},
	data() {
		return {
			filterBy: {
				destination: '',
				guests: null,
			},
		};
	},
	methods: {
		closeMobileMenu() {
			this.$emit('onMobileSearchClosed');
		},
		setFilter() {
			this.$store.commit({ type: 'setFilter', filterBy: {...this.filterBy} });
			this.closeMobileMenu();
      this.$router.push(`/stay`)
      this.$store.dispatch({ type: "loadStays" });
		},
	},
	computed: {},
	components: {},
};
</script>
<style></style>
