import Vue from 'vue';

const defaultFilters = {
  city: 'Любой',
  ageMin: 18,
  ageMax: 100,
  gender: 'any',
  datingServices: [
    {
      name: 'Mamba',
      checked: true,
    },
    {
      name: 'Tinder',
      checked: true,
    },
    {
      name: 'Badoo',
      checked: true,
    },
    {
      name: 'Dating.ru',
      checked: true,
    },
    {
      name: 'Chpoking.ru',
      checked: true,
    },
    {
      name: 'Остальные',
      checked: true,
    },
  ],
  rangeDate: null
};

export default {
  namespaced: true,
  state: {
    filters: defaultFilters
  },
  getters: {
    getFilters: state => state.filters,
    getRequestParams: (state) => {
      let filters = state.filters;
      let requestParams = '';

      if (filters.city !== defaultFilters.city) {
        requestParams += '&city=' + filters.city;
      }

      if (filters.ageMin !== defaultFilters.ageMin) {
        requestParams += '&ageMin=' + filters.ageMin;
      }

      if (filters.ageMax !== defaultFilters.ageMax) {
        requestParams += '&ageMax=' + filters.ageMax;
      }

      if (filters.gender !== defaultFilters.gender) {
        requestParams += '&gender=' + filters.gender;
      }

      // todo createdAt заменить на рейтинг
      if (filters.rangeDate !== null) {
        requestParams += '&order=createdAt';
        if (filters.rangeDate !== 'ALL') {
          requestParams += '&rangeDate=' + filters.rangeDate;
        }
      }


      let neededFilterService = true;
      for (let datingService of filters.datingServices) {
        neededFilterService = neededFilterService && datingService.checked;
      }

      console.log(neededFilterService);

      if (!neededFilterService) {
        for (let datingService of filters.datingServices) {
          if (datingService.checked) {
            requestParams += '&services=' + datingService.name;
          }
        }
      }

      return requestParams;
    }
  },
  mutations: {
    setFilters(state, filters) {
      state.filters = filters;
    },
    setRangeDate(state, rangeDate) {
      state.filters.rangeDate = rangeDate;
    }
  }
};

