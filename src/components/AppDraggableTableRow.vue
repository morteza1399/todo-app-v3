<template>
  <draggable :list="$store.getters.tasks">
    <tr
      class="flex justify-between items-center group dark:create-border-bottom dark:border-gray-300 border-solid border-b cursor-pointer border-white-200"
      v-for="item in $store.getters.tasks"
      :key="item.id"
      @click="updateTodoItem(item)"
    >
      <td class="flex-centered p-4">
        <AppCircle :is-completed="item.isCompleted" :has-hover="true" />
        <span
          :class="[
            'select-none font-size',
            {
              'ml-2 line-through dark:text-gray-200 text-white-200':
                item.isCompleted,
            },
          ]"
        >
          {{ item.name }}
        </span>
      </td>
      <td class="flex-centered p-4">
        <img
          class="xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex filter grayscale group-hover:flex hover:brightness-0 invert"
          src="@/assets/images/icon-cross.svg"
          alt="cross"
          @click.stop="removeTodoItem(item)"
        />
      </td>
    </tr>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import AppCircle from "./AppCircle.vue";
export default {
  name: "AppDraggableTableRow",
  components: {
    draggable,
    AppCircle,
  },
  methods: {
    removeTodoItem(item) {
      this.$store
        .dispatch("deleteTasks", item.id)
        .then(() => {
          const index = this.$store.getters.tasks.indexOf(item);
          this.$store.getters.tasks.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTodoItem(item) {
      item.isCompleted = !item.isCompleted;
      this.$store.dispatch("updateTasks", {
        id: item.id,
        updatedTask: item,
      });
    },
  },
};
</script>
