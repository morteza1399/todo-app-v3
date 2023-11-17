<template>
  <div>
    <div
      class="h-auto rounded text-lg shadow-lg responsive-width dark:bg-dark-100 dark:text-white-100 bg-white-400 text-blue-300"
    >
      <table class="w-full h-auto table-auto">
        <tbody>
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
          <tr
            v-if="noTask"
            class="flex-centered create-border-bottom border-solid border-b cursor-pointer border-white-200 dark:border-gray-300"
          >
            <td class="flex-centered p-4">NO TASKS</td>
          </tr>
        </tbody>
        <tfoot class="text-sm dark:text-gray-100">
          <tr class="flex justify-between">
            <td class="py-4 ml-6 font-bold text-gray-400">
              {{ messageItemsLeft }}
            </td>
            <td
              class="py-4 xl:block lg:block md:block sm:hidden xs:hidden xxs:hidden"
            >
              <a
                href="#"
                :class="`${
                  currentIndex === index
                    ? 'dark:filter-link filter-link-light text-blue-200'
                    : 'dark:filter-link filter-link-light'
                }`"
                v-for="(filterItem, index) in this.filterItems"
                :key="index"
                @click.prevent="filterTodoItem(filterItem)"
              >
                {{ filterItem }}
              </a>
            </td>
            <td
              class="py-4 mr-6 cursor-pointer font-bold dark:hover:text-white-100 text-gray-400 hover:text-blue-300"
              @click="clearCompletedTodoItem"
            >
              Clear Completed
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      class="flex-centered rounded py-4 my-3 responsive-width xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex dark:bg-dark-100 dark:text-gray-100 bg-white-400 text-gray-400"
    >
      <a
        href="#"
        :class="`${
          currentIndex === index
            ? 'dark:filter-link filter-link-light text-blue-200'
            : 'dark:filter-link filter-link-light'
        }`"
        v-for="(filterItem, index) in this.filterItems"
        :key="index"
        @click.prevent="filterTodoItem(filterItem)"
      >
        {{ filterItem }}
      </a>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import AppCircle from "./AppCircle.vue";
export default {
  name: "AppTable",
  data() {
    return {
      filterItems: ["All", "Active", "Complete"],
      currentIndex: +localStorage.getItem("currentIndex"),
    };
  },
  components: {
    draggable,
    AppCircle,
  },
  computed: {
    noTask() {
      return this.$store.getters.tasks.length === 0;
    },
    activeTodoItems() {
      return this.$store.getters.tasks.filter((item) => {
        return item.isCompleted === false;
      });
    },
    messageItemsLeft() {
      if (this.activeTodoItems.length > 1) {
        return `${this.activeTodoItems.length} items left`;
      } else {
        return `${this.activeTodoItems.length} item left`;
      }
    },
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
    filterTodoItem(item) {
      localStorage.setItem("status", item);
      this.$store.commit("SET_STATUS", item);
      let key = this.filterItems.indexOf(item);
      this.currentIndex = key;
      localStorage.setItem("currentIndex", this.currentIndex);
    },
    clearCompletedTodoItem() {
      for (const item of this.$store.getters.tasks) {
        if (item.isCompleted) {
          this.removeTodoItem(item);
        }
      }
    },
  },
};
</script>
