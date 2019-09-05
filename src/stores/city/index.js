  const state = {
    nm: window.localStorage.getItem('cityName') || '广州',
    id: window.localStorage.getItem('cityId') || 20
  };

  const mutations = {
    CITY_INFO(state,res) {
      state.nm = res.nm,
      state.id = res.id
    }
  };

  const actions = {

  };

  export default {
    namespaced: true,
    state,
    actions,
    mutations
  }