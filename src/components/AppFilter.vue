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

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodoStore } from "@/pinia/todo";
import { FilterConstants } from "@/utils/AppConstants";

const store = useTodoStore();
const filterItems = ref<string[]>(["All", "Active", "Complete"]);
const currentIndex = ref<number>(
  Number(localStorage.getItem(FilterConstants.LOCAL_STORAGE_INDEX_KEY))
);

function filterTodoItem(item: string, index: number) {
  localStorage.setItem(FilterConstants.LOCAL_STORAGE_FILTER_KEY, item);
  store.setFilterStatus(item);
  currentIndex.value = index;
  localStorage.setItem(FilterConstants.LOCAL_STORAGE_INDEX_KEY, `${index}`);
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
