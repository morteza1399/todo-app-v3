import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  tasks: [],
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
  ADD_TASK(state, data) {
    state.tasks.push(data);
  },
  REMOVE_TASK(state, data) {
    state.tasks.splice(data, 1);
  },
  SET_STATUS(state, data) {
    state.status = data;
  },
};

const actions = {
  async getTasks(context) {
    try {
      let response = await axios.get("/tasks");
      context.commit("SET_TASKS", response.data);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async postTasks(context, tasks) {
    try {
      let response = await axios.post("/tasks", tasks, context.state.headers);
      context.commit("ADD_TASK", response.data);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTasks(context, { id, updatedTask }) {
    try {
      let response = await axios.put(
        `/tasks/${id}`,
        updatedTask,
        context.state.headers
      );
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteTasks(context, item) {
    try {
      let response = await axios.delete(`/tasks/${item.id}`);
      let index = context.state.tasks.indexOf(item);
      context.commit("REMOVE_TASK", index);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
