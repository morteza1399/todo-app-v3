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
    hasTasks() {
      return this.all_tasks.length > 0;
    },
  },
  actions: {
    async getTasks() {
      try {
        let response = await axios.get("/tasks");
        localStorage.getItem("all_tasks") === null
          ? (this.tasks = response.data)
          : (this.tasks = JSON.parse(localStorage.getItem("all_tasks")));
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async postTasks(tasks) {
      try {
        let response = await axios.post("/tasks", tasks);
        this.tasks.push(response.data);
        this.saveTasksToLocalStorage();
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateTasks(updatedTask) {
      try {
        updatedTask.isCompleted = !updatedTask.isCompleted;
        this.saveTasksToLocalStorage();
        let response = await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
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
        this.saveTasksToLocalStorage();
        return Promise.resolve(response.data);
      } catch (error) {
        alert(error.message);
        return Promise.reject(error);
      }
    },
    setStatus(data) {
      this.status = data;
    },
    saveTasksToLocalStorage() {
      localStorage.getItem("all_tasks") !== null
        ? localStorage.setItem("all_tasks", JSON.stringify(this.tasks))
        : "";
    },
    reorderTasks() {
      localStorage.setItem("all_tasks", JSON.stringify(this.all_tasks));
    },
  },
});
