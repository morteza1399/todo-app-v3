<template>
  <draggable :list="all_tasks">
    <tr
      class="flex justify-between items-center group dark:create-border-bottom dark:border-gray-300 border-solid border-b cursor-pointer border-white-200"
      v-for="item in all_tasks"
      :key="item.id"
      @click="updateTasks(item.id, item)"
    >
      <td class="flex-centered p-4">
        <AppCircle :is-completed="item.isCompleted" :has-hover="true" />
        <span
          :class="[
            'select-none',
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
          class="filter grayscale group-hover:flex hover:brightness-0 invert"
          src="@/assets/images/icon-cross.svg"
          alt="cross"
          @click.stop="deleteTasks(item)"
        />
      </td>
    </tr>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import AppCircle from "./AppCircle.vue";
import { mapState, mapActions } from "pinia";
import { useTodoStore } from "../store/index";

export default {
  name: "AppDraggableTableRow",
  components: {
    draggable,
    AppCircle,
  },
  computed: {
    ...mapState(useTodoStore, ["all_tasks"]),
  },
  methods: {
    ...mapActions(useTodoStore, ["updateTasks", "deleteTasks"]),
  },
};
</script>
