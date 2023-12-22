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
      v-model="task"
      @keyup.enter="addedTask"
    />
  </div>
</template>

<script setup>
import AppCircle from "@/components/AppCircle.vue";
import { ref, computed } from "vue";
import { useTodoStore } from "@/pinia/todo";

const task = ref("");
const store = useTodoStore();

const all_tasks = computed(() => store.all_tasks.map((item) => item.name));

function addedTask() {
  task.value = truncateString(task.value, 20);
  task.value = task.value.trim();
  if (task.value.length === 0 || all_tasks.value.includes(task.value)) return;
  store
    .postTasks({
      name: task.value,
      isCompleted: false,
    })
    .then(() => {
      task.value = "";
    })
    .catch((err) => {
      alert(err.message);
    });
}

function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}
</script>
