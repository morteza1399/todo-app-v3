<template>
  <tfoot class="text-sm dark:text-gray-100">
    <tr class="flex justify-between">
      <td class="py-4 ml-6 font-bold text-gray-400">{{ messageItemsLeft }}</td>
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

<script setup>
import { computed } from "vue";
import AppFilter from "@/components/AppFilter.vue";
import { useTodoStore } from "@/pinia/todo";

const store = useTodoStore();

const activeTodoItems = computed(() => {
  return store.all_tasks.filter((item) => item.isCompleted === false);
});

const messageItemsLeft = computed(() => {
  if (activeTodoItems.value.length > 1) {
    return `${activeTodoItems.value.length} items left`;
  } else {
    return `${activeTodoItems.value.length} item left`;
  }
});

function clearCompletedTodoItem() {
  for (const item of store.all_tasks) {
    if (item.isCompleted) {
      store.deleteTasks(item);
    }
  }
}
</script>
