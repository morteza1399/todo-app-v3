import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  tasks: [],
};

const getters = {
  get_tasks: (state) => {
    return state.tasks;
  },
};

const mutations = {
  SET_TASKS(state, data) {
    state.tasks = data;
  },
};

const actions = {
  async getTasks(context) {
    let response = await fetch("http://localhost:3000/tasks");
    let data = await response.json();
    if (response.status == 200) {
      context.commit('SET_TASKS', data)
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
