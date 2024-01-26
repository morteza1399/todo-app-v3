<template>
  <tfoot class="text-sm dark:text-gray-100">
    <tr class="flex justify-between">
      <td class="py-4 ml-6 font-bold text-gray-400">
        {{ store.messageItemsLeft }}
      </td>
      <td class="py-4 hidden sm:flex">
        <AppFilter />
      </td>
      <td
        class="py-4 mr-6 cursor-pointer font-bold dark:hover:text-white-100 text-gray-400 hover:text-blue-300"
        @click="clearCompletedTodoItem"
      >
        Clear Completed
      </td>
    </tr>
  </tfoot>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/pinia/todo";

const store = useTodoStore();

function clearCompletedTodoItem() {
  store.allTodoItems
    .filter((item) => item.isCompleted)
    .forEach((completedItem) => store.deleteTodoItem(completedItem));
}
</script>
