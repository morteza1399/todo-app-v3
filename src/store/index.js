import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  tasks: [],
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  status: localStorage.getItem("status"),
};

const getters = {
  tasks: (state) => {
    if (state.status === "Active") {
      return state.tasks.filter((item) => {
        return item.isCompleted === false;
      });
    } else if (state.status === "Complete") {
      return state.tasks.filter((item) => {
        return item.isCompleted === true;
      });
    } else {
      return state.tasks;
    }
  },
};

const mutations = {
  SET_TASKS(state, data) {
    state.tasks = data;
  },
  SET_STATUS(state, data) {
    state.status = data;
  },
};

const actions = {
  async getTasks(context) {
    let response = await fetch("/tasks");
    let data = await response.json();
    if (response.status == 200) {
      context.commit("SET_TASKS", data);
      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  },
  async postTasks(context, tasks) {
    let response = await fetch("/tasks", {
      method: "POST",
      headers: context.state.headers,
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
    let response = await fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: context.state.headers,
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
    let response = await fetch(`/tasks/${id}`, {
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
