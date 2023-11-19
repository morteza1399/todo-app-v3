import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => {
    return {
      tasks: [],
      status: localStorage.getItem("status"),
    };
  },
  getters: {
    all_tasks: (state) => {
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
  },
  actions: {
    async getTasks() {
      try {
        let response = await axios.get("/tasks");
        this.tasks = response.data;
        return Promise.resolve(response.data);
      } catch (error) {
        alert(error.message);
        return Promise.reject(error);
      }
    },
    async postTasks(tasks) {
      try {
        let response = await axios.post("/tasks", tasks);
        this.tasks.push(response.data);
        return Promise.resolve(response.data);
      } catch (error) {
        alert(error.message);
        return Promise.reject(error);
      }
    },
    async updateTasks(id, updatedTask) {
      try {
        let response = await axios.put(`/tasks/${id}`, updatedTask);
        updatedTask.isCompleted = !updatedTask.isCompleted;
        return Promise.resolve(response.data);
      } catch (error) {
        alert(error.message);
        return Promise.reject(error);
      }
    },
    async deleteTasks(item) {
      try {
        let response = await axios.delete(`/tasks/${item.id}`);
        let index = this.tasks.indexOf(item);
        this.tasks.splice(index, 1);
        return Promise.resolve(response.data);
      } catch (error) {
        alert(error.message);
        return Promise.reject(error);
      }
    },
    setStatus(data) {
      this.status = data;
    },
  },
});
