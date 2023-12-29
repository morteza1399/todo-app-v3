<template>
  <div>
    <a
      href="#"
      v-for="(filterItem, index) in filterItems"
      :key="index"
      :class="{
        'dark:filter-link filter-link-light': true,
        'text-blue-200': currentIndex === index,
      }"
      @click.prevent="filterTodoItem(filterItem, index)"
    >
      {{ filterItem }}
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTodoStore } from "@/pinia/todo";

const store = useTodoStore();
const filterItems = ref(["All", "Active", "Complete"]);
const currentIndex = ref(+localStorage.getItem("current-index"));

function filterTodoItem(item, index) {
  localStorage.setItem("filter-status", item);
  store.setFilterStatus(item);
  currentIndex.value = index;
  localStorage.setItem("current-index", index);
}

onMounted(() => {
  // Ensure currentIndex is a valid index
  if (
    currentIndex.value < 0 ||
    currentIndex.value >= filterItems.value.length
  ) {
    currentIndex.value = 0;
  }
});
</script>
