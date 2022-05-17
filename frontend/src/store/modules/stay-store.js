import { stayService } from '@/services/stay-service.js';

export default {
  state: {
    stays: [],
    filterBy: {
      destination: '',
      guests: '',
      amenities: [],
      priceRange: null,
    },
    amenities: stayService.getAmenities(),
    lessAmenities: stayService.getLessAmenities(),
    popularDest: stayService.getPopularDest(),
    popularStays: stayService.getPopularStays(),
  },

  getters: {
    filterBy({ filterBy }) {
      // if (!filterBy) return
      var filterToSend = JSON.parse(JSON.stringify(filterBy));
      return filterToSend;
    },
    stays({ stays }) {
      return stays;
    },
    staysToShow({ stays }) {
      const copyStays = JSON.parse(JSON.stringify(stays));
      return copyStays;
    },
    amenities({ amenities }) {
      return amenities;
    },
    lessAmenities({ lessAmenities }) {
      var lessAmenitiesCopy = JSON.parse(JSON.stringify(lessAmenities));
      return lessAmenitiesCopy;
    },
    popularDest({ popularDest }) {
      var popularDestCopy = JSON.parse(JSON.stringify(popularDest));
      return popularDestCopy;
    },
    popularStays({ popularStays }) {
      var popularStaysCopy = JSON.parse(JSON.stringify(popularStays));
      return popularStaysCopy;
    }
  },

  mutations: {
    setStays(state, { stays }) {
      state.stays = stays;
    },
    saveStay(state, { stay }) {
      const idx = state.stays.findIndex((s) => s._id === stay._id);
      if (idx !== -1) state.stays.splice(idx, 1, stay);
      else state.stays.push(stay);
    },
    removeStay(state, { stayId }) {
      const idx = state.stays.findIndex((t) => t._id === stayId);
      state.stays.splice(idx, 1);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy;
    },
  },

  actions: {
    async loadStays({ commit, state }) {
      try {
        const stays = await stayService.query(state.filterBy);
        commit({ type: 'setStays', stays });

      } catch (err) {
        console.log('Had and error loading your stays!');
      }

    },
    async saveStay({ commit }, { stay }) {
      try {
        const savedStay = await stayService.save(stay);
        commit({ type: 'saveStay', stay: savedStay });

      } catch (err) {
        console.log('Had an error while saving your stay');
      }
    },
    removeStay({ commit }, { stayId }) {
      stayService.remove(stayId).then(() => {
        commit({ type: 'removeStay', stayId });
      });
    },
    async getStayById({ state }, { stayId }) {
      console.log('getting stay', stayId);
      const stay = await stayService.getById(stayId);
      return stay;

    }
    // setFilter({ dispatch, commit, state }, { filterBy }) {
    //   // console.log('store', destination, guests);
    //   commit({ type: 'setFilter', filterBy });
    //   dispatch({ type: 'loadStays' })
    //   return Promise.resolve(state.filterBy)

    //   // dispatch({ type: 'loadStays' });
    // },
  },
};
