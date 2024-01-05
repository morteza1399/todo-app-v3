import { defineStore } from "pinia";
import { ref, computed } from "vue";

import axios from "axios";

export const useTodoStore = defineStore("todo", () => {
  // Reactive state
  const todoItems = ref([]);
  const filterStatus = ref(localStorage.getItem("filter-status"));

  // Computed properties
  const allTodoItems = computed(() => filterTodoItems());

  const allTodoItemNames = computed(() =>
    allTodoItems.value.map((item) => item.name)
  );

  const hasTodoItems = computed(() => allTodoItems.value.length > 0);

  const activeTodoItems = computed(() =>
    allTodoItems.value.filter((item) => !item.isCompleted)
  );

  const messageItemsLeft = computed(() => {
    const itemCount = activeTodoItems.value.length;
    return `${itemCount} item${itemCount > 1 ? "s" : ""} left`;
  });

  // Methods
  async function fetchTodoItem() {
    try {
      let response = await axios.get("/todo-items");
      todoItems.value =
        localStorage.getItem("all-todo-items") === null
          ? response.data
          : JSON.parse(localStorage.getItem("all-todo-items"));
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function postTodoItem(item) {
    try {
      let response = await axios.post("/todo-items", item);
      todoItems.value.push(response.data);
      saveTodoItemToLocalStorage();
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function updateTodoItem(item) {
    try {
      item.isCompleted = !item.isCompleted;
      saveTodoItemToLocalStorage();
      let response = await axios.put(`/todo-items/${item.id}`, item);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function deleteTodoItem(item) {
    try {
      let response = await axios.delete(`/todo-items/${item.id}`);
      let index = todoItems.value.indexOf(item);
      todoItems.value.splice(index, 1);
      saveTodoItemToLocalStorage();
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  function setFilterStatus(data) {
    filterStatus.value = data;
  }

  function saveTodoItemToLocalStorage() {
    localStorage.setItem("all-todo-items", JSON.stringify(todoItems.value));
  }

  function truncateString(str, num) {
    return str.length > num ? str.slice(0, num) + "..." : str;
  }

  // Helper function to filter todo items based on filterStatus
  function filterTodoItems() {
    switch (filterStatus.value) {
      case "Active":
        return todoItems.value.filter((item) => !item.isCompleted);
      case "Complete":
        return todoItems.value.filter((item) => item.isCompleted);
      default:
        return todoItems.value;
    }
  }

  return {
    // Exposed properties
    allTodoItems,
    allTodoItemNames,
    hasTodoItems,
    messageItemsLeft,

    // Exposed methods
    fetchTodoItem,
    postTodoItem,
    updateTodoItem,
    deleteTodoItem,
    setFilterStatus,
    saveTodoItemToLocalStorage,
    truncateString,
  };
});
