import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { TodoItemsConstants, FilterConstants } from "@/utils/AppConstants";

import axios from "axios";

export const useTodoStore = defineStore("todo", () => {

  interface TodoItem {
    id: number;
    name: string;
    isCompleted: boolean;
  }

  // Reactive state
  const todoItems = ref<TodoItem[]>([]);
  const filterStatus = ref<string>(
    String(localStorage.getItem(FilterConstants.LOCAL_STORAGE_FILTER_KEY))
  );

  // Computed properties
  const allTodoItems = computed<TodoItem[]>(() => filterTodoItems());

  const allTodoItemNames = computed<string[]>(() =>
    allTodoItems.value.map((item) => item.name)
  );

  const hasTodoItems = computed<boolean>(() => allTodoItems.value.length > 0);

  const activeTodoItems = computed<TodoItem[]>(() =>
    allTodoItems.value.filter((item) => !item.isCompleted)
  );

  const messageItemsLeft = computed<string>(() => {
    const itemCount = activeTodoItems.value.length;
    return `${itemCount} item${itemCount > 1 ? "s" : ""} left`;
  });

  // Methods
  async function fetchTodoItem() {
    try {
      let response = await axios.get("/todo-items");
      const localStorageData = localStorage.getItem(
        TodoItemsConstants.LOCAL_STORAGE_TODOITEM_KEY
      );
      todoItems.value =
        localStorageData === null
          ? response.data
          : JSON.parse(localStorageData);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function postTodoItem(item: TodoItem) {
    try {
      let response = await axios.post("/todo-items", item);
      todoItems.value.push(response.data);
      saveTodoItemToLocalStorage();
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function updateTodoItem(item: TodoItem) {
    try {
      item.isCompleted = !item.isCompleted;
      saveTodoItemToLocalStorage();
      let response = await axios.put(`/todo-items/${item.id}`, item);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async function deleteTodoItem(item: TodoItem) {
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

  function setFilterStatus(data: string) {
    filterStatus.value = data;
  }

  function saveTodoItemToLocalStorage() {
    localStorage.setItem(
      TodoItemsConstants.LOCAL_STORAGE_TODOITEM_KEY,
      JSON.stringify(todoItems.value)
    );
  }

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
  };
});
