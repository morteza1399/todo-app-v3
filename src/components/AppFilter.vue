<template>
  <div>
    <a
      href="#"
      :class="`${
        currentIndex === index
          ? 'dark:filter-link filter-link-light text-blue-200'
          : 'dark:filter-link filter-link-light'
      }`"
      v-for="(filterItem, index) in filterItems"
      :key="index"
      @click.prevent="filterTodoItem(filterItem)"
    >
      {{ filterItem }}
    </a>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "@/pinia/todo";

const store = useTodoStore();
const filterItems = ref(["All", "Active", "Complete"]);
const currentIndex = ref(+localStorage.getItem("current-index"));

function filterTodoItem(item) {
  localStorage.setItem("filter-status", item);
  store.setFilterStatus(item);
  let key = filterItems.value.indexOf(item);
  currentIndex.value = key;
  localStorage.setItem("current-index", currentIndex.value);
}
</script>
