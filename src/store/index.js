import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  tasks: [],
  baseUrl: "http://localhost:3000",
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
    let response = await fetch(`${context.state.baseUrl}/tasks`);
    let data = await response.json();
    if (response.status == 200) {
      context.commit("SET_TASKS", data);
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
  async postTasks(context, tasks) {
    let response = await fetch(`${context.state.baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(tasks),
    });
    let data = await response.json();
    if (response.status == 201) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
  async updateTasks(context, { id, updatedTask }) {
    let response = await fetch(`${context.state.baseUrl}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(updatedTask),
    });
    let data = await response.json();
    if (response.status == 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
  async deleteTasks(context, id) {
    let response = await fetch(`${context.state.baseUrl}/tasks/${id}`, {
      method: "DELETE",
    });
    let data = await response.json();
    if (response.status == 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
