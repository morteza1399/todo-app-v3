<template>
  <div>
    <div
      class="font-josefin h-auto rounded text-lg shadow-lg responsive-width dark:bg-dark-100 dark:text-white-100 bg-white-400 text-blue-300"
    >
      <table class="w-full h-auto table-auto">
        <tbody>
          <div is="draggable" :list="todoItems" tag="div">
            <tr
              class="flex justify-between items-center group dark:create-border-bottom dark:border-gray-300 border-solid border-b cursor-pointer border-white-200"
              v-for="item in todoItems"
              :key="item.id"
            >
              <td class="flex-centered p-4">
                <div
                  :class="`${
                    item.status === 'completed'
                      ? 'flex-centered h-6 w-6 bg-gradient-to-br rounded-[100%] from-blue-100 to-purple dark:border-gray-300 border-white-200'
                      : 'flex-centered h-6 w-6 mr-2 create-border rounded-[100%] hover:bg-gradient-to-br from-blue-100 to-purple hover:border-none dark:border-gray-300 border-white-200'
                  }`"
                >
                  <div
                    :class="`${
                      item.status === 'completed'
                        ? 'hidden'
                        : 'flex-centered h-5 w-5 rounded-[100%] dark:bg-dark-100 bg-white-400'
                    }`"
                  ></div>
                  <img
                    :class="`${
                      item.status === 'completed' ? 'flex' : 'hidden'
                    }`"
                    src="@/assets/images/icon-check.svg"
                    alt="check"
                  />
                </div>
                <span
                  :class="[
                    'select-none font-size',
                    {
                      'ml-2 line-through dark:text-gray-200 text-white-200':
                        item.status === 'completed',
                    },
                  ]"
                  @click="updateTodoItem(item)"
                >
                  {{ item.name }}
                </span>
              </td>
              <td class="flex-centered p-4">
                <img
                  class="xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex group-hover:flex"
                  src="@/assets/images/icon-cross.svg"
                  alt="cross"
                  @click="removeTodoItem(item)"
                />
              </td>
            </tr>
          </div>
          <tr
            v-if="hasTasks"
            class="flex-centered create-border-bottom border-solid border-b cursor-pointer border-white-200 dark:border-gray-300"
          >
            <td class="flex-centered p-4">NO TASKS</td>
          </tr>
        </tbody>
        <tfoot class="text-sm dark:text-gray-100">
          <tr class="flex justify-between">
            <td
              class="py-4 ml-6 font-bold dark:hover:text-white-100 text-gray-400 hover:text-blue-300"
            >
              {{ todoItems.length }} items left
            </td>
            <td
              class="py-4 xl:block lg:block md:block sm:hidden xs:hidden xxs:hidden"
            >
              <a
                href="#"
                class="dark:filter-link filter-link-light"
                @click="filterTodoItem('all')"
                >All</a
              >
              <a
                href="#"
                class="dark:filter-link filter-link-light"
                @click="filterTodoItem('active')"
                >Active</a
              >
              <a
                href="#"
                class="dark:filter-link filter-link-light"
                @click="filterTodoItem('completed')"
                >Complete</a
              >
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
      class="flex-centered font-josefin rounded py-4 my-3 responsive-width xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex dark:bg-dark-100 dark:text-gray-100 bg-white-400 text-gray-400"
    >
      <a
        href="#"
        class="dark:filter-link filter-link-light"
        @click="filterTodoItem('all')"
        >All</a
      >
      <a
        href="#"
        class="dark:filter-link filter-link-light"
        @click="filterTodoItem('active')"
        >Active</a
      >
      <a
        href="#"
        class="dark:filter-link filter-link-light"
        @click="filterTodoItem('completed')"
        >Complete</a
      >
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "AppTable",
  components: {
    draggable,
  },
  props: {
    todoItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasTasks() {
      return this.todoItems.length == 0;
    },
  },
  methods: {
    removeTodoItem(item) {
      this.$emit("remove-item", item);
    },
    updateTodoItem(item) {
      this.$emit("update-item", item);
    },
    filterTodoItem(property) {
      this.$emit("filter-item", property);
    },
    clearCompletedTodoItem() {
      this.$emit("clear-complete-item");
    },
  },
};
</script>
