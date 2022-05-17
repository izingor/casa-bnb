<template>
<div class = "main-layout" @click = "onMobileSearchOpened">
	<section class="mobile-search-bar-container main-layout">
		<div class="search-bar flex align just">
			<img src="../../assets/Images/logos/search-icon-red.svg" alt="" />
			<p>Where are you going?</p>
		</div>
	</section>
</div>
</template>
<script>
export default {
	name: 'mobile-search-bar',
	data() {
		return {};
	},
	methods: {
		onMobileSearchOpened() {
			this.$emit('onMobileSearchOpened');
		}
	},
};
</script>
<style></style>
