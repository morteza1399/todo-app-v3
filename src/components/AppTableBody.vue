<template>
  <tbody>
    <VueDraggableNext
      v-if="store.hasTodoItems"
      :list="store.allTodoItems"
      @end="store.saveTodoItemToLocalStorage"
      >
      <tr
        v-for="item in store.allTodoItems"
        :key="item.id"
        class="flex justify-between items-center sm:w-[30rem] w-80 overflow-x-scroll dark:bg-dark-100 bg-white-400 group dark:create-border-bottom dark:border-gray-300 border-solid border-b cursor-pointer border-white-200"
        @click="store.updateTodoItem(item)"
      >
        <td class="flex-centered p-4">
          <AppCircle :is-completed="item.isCompleted" :is-hover="true" />
          <span
            :class="[
              'select-none cursor-grab',
              {
                'ml-2 line-through dark:text-gray-200 text-white-300':
                  item.isCompleted,
              },
            ]"
            >{{ item.name }}</span
          >
        </td>
        <td class="flex-centered p-4">
          <img
            class="filter grayscale flex sm:hidden group-hover:flex dark:hover:brightness-0 invert hover:brightness-200 saturate-[100%]"
            src="@/assets/images/icon-cross.svg"
            alt="cross"
            @click.stop="store.deleteTodoItem(item)"
          />
        </td>
      </tr>
    </VueDraggableNext>
    <tr
      v-else
      class="flex-centered create-border-bottom border-solid border-b cursor-pointer border-white-200 dark:border-gray-300"
    >
      <td class="flex-centered p-4">NO TODO ITEM</td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import { VueDraggableNext } from "vue-draggable-next";
import { useTodoStore } from "@/pinia/todo";

const store = useTodoStore();
</script>
