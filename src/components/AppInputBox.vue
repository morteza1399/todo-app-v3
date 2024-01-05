<template>
  <div
    class="flex items-center my-6 h-14 rounded dark:bg-dark-100 dark:text-white-200 bg-white-400 text-dark-100"
  >
    <AppCircle />
    <input
      autocomplete="off"
      class="w-full h-full rounded ml-2 focus:outline-none dark:bg-dark-100 bg-white-400 caret-blue-200"
      type="text"
      name="new-todo"
      id="new-todo"
      placeholder="Create a new todo..."
      v-model="newTodoItem"
      @keyup.enter="addTodoItem"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "@/pinia/todo";
import { truncateString } from "@/utils/Helper";

const newTodoItem = ref("");
const store = useTodoStore();

function addTodoItem() {
  newTodoItem.value = truncateString(newTodoItem.value.trim(), 20);

  if (
    !newTodoItem.value ||
    store.allTodoItemNames.includes(newTodoItem.value)
  ) {
    return;
  }

  store
    .postTodoItem({
      name: newTodoItem.value,
      isCompleted: false,
    })
    .then(() => {
      newTodoItem.value = "";
    })
    .catch((err) => {
      return err;
    });
}
</script>
