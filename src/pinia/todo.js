import { defineStore } from "pinia";
import { ref, computed } from "vue";

import axios from "axios";

export const useTodoStore = defineStore("todo", () => {
  const todoItems = ref([]);
  const filterStatus = ref(localStorage.getItem("filter-status"));

  const allTodoItems = computed(() => {
    if (filterStatus.value === "Active") {
      return todoItems.value.filter((item) => {
        return item.isCompleted === false;
      });
    } else if (filterStatus.value === "Complete") {
      return todoItems.value.filter((item) => {
        return item.isCompleted === true;
      });
    } else {
      return todoItems.value;
    }
  });

  const allTodoItemNames = computed(() =>
    allTodoItems.value.map((item) => item.name)
  );

  const hasTodoItems = computed(() => {
    return allTodoItems.value.length > 0;
  });

  const activeTodoItems = computed(() => {
    return allTodoItems.value.filter((item) => item.isCompleted === false);
  });

  const messageItemsLeft = computed(() => {
    if (activeTodoItems.value.length > 1) {
      return `${activeTodoItems.value.length} items left`;
    } else {
      return `${activeTodoItems.value.length} item left`;
    }
  });

  async function fetchTodoItem() {
    try {
      let response = await axios.get("/todo-items");
      localStorage.getItem("all-todo-items") === null
        ? (todoItems.value = response.data)
        : (todoItems.value = JSON.parse(
            localStorage.getItem("all-todo-items")
          ));
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function postTodoItem(item) {
    try {
      let response = await axios.post("/todo-items", item);
      todoItems.value.push(response.data);
      saveTodoItemToLocalStorage();
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function updateTodoItem(item) {
    try {
      item.isCompleted = !item.isCompleted;
      saveTodoItemToLocalStorage();
      let response = await axios.put(`/todo-items/${item.id}`, item);
      return Promise.resolve(response.data);
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
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  function setFilterStatus(data) {
    filterStatus.value = data;
  }

  function saveTodoItemToLocalStorage() {
    localStorage.getItem("all-todo-items") !== null
      ? localStorage.setItem("all-todo-items", JSON.stringify(todoItems.value))
      : "";
  }

  function reorderTodoItem() {
    localStorage.setItem("all-todo-items", JSON.stringify(allTodoItems.value));
  }

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return {
    allTodoItems,
    allTodoItemNames,
    hasTodoItems,
    messageItemsLeft,
    fetchTodoItem,
    postTodoItem,
    updateTodoItem,
    deleteTodoItem,
    setFilterStatus,
    reorderTodoItem,
    truncateString,
  };
});
