<template>
  <tbody>
    <draggable v-if="has_tasks" :list="all_tasks" @end="store.reorderTasks">
      <tr
        class="flex justify-between items-center sm:w-[30rem] w-80 overflow-x-scroll dark:bg-dark-100 bg-white-400 group dark:create-border-bottom dark:border-gray-300 border-solid border-b cursor-pointer border-white-200"
        v-for="item in all_tasks"
        :key="item.id"
        @click="store.updateTasks(item)"
      >
        <td class="flex-centered p-4">
          <AppCircle :is-completed="item.isCompleted" :has-hover="true" />
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
            @click.stop="store.deleteTasks(item)"
          />
        </td>
      </tr>
    </draggable>
    <tr
      v-else
      class="flex-centered create-border-bottom border-solid border-b cursor-pointer border-white-200 dark:border-gray-300"
    >
      <td class="flex-centered p-4">NO TASKS</td>
    </tr>
  </tbody>
</template>

<script setup>
import { computed, defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { useTodoStore } from "@/pinia/todo";
import AppCircle from "@/components/AppCircle.vue";

const store = useTodoStore();
const has_tasks = computed(() => store.has_tasks);
const all_tasks = computed(() => store.all_tasks);

defineComponent({
  components: {
    draggable: VueDraggableNext,
  },
});
</script>
