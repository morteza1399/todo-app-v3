<template>
  <div>
    <div
      class="font-josefin h-auto bg-dark-100 text-white-100 rounded text-lg shadow-2xl responsive-width"
    >
      <table class="w-full h-auto table-auto">
        <tbody>
          <tr
            class="flex justify-between items-center create-border-bottom"
            v-for="item in todoItems"
            :key="item.id"
          >
            <td class="flex-centered p-4">
              <div
                :class="{
                  'flex-centered h-6 w-6 mr-2 create-border rounded-3xl hover:bg-gradient-to-br from-blue to-purple hover:border-none':
                    item.status != 'completed',
                  'flex-centered h-6 w-6 bg-gradient-to-br rounded-3xl from-blue to-purple':
                    item.status === 'completed',
                }"
              >
                <div
                  :class="{
                    'flex-centered h-5 w-5 bg-dark-100 rounded-3xl':
                      item.status != 'completed',
                    hidden: item.status === 'completed',
                  }"
                ></div>
                <img
                  :class="{
                    hidden: item.status != 'completed',
                    flex: item.status == 'completed',
                  }"
                  src="../assets/images/icon-check.svg"
                  alt=""
                />
              </div>
              <span
                :class="[
                  'xl:ml-4 lg:ml-4 md:ml-4 xl:text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs xxs:text-xs',
                  {
                    'ml-2 line-through text-gray-200':
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
                class="xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex"
                src="../assets/images/icon-cross.svg"
                alt=""
                @click="removeTodoItem(item)"
              />
            </td>
          </tr>
          <tr v-if="hasTasks" class="flex-centered create-border-bottom">
            <td class="flex-centered p-4">NO TASKS</td>
          </tr>
        </tbody>
        <tfoot class="text-sm text-gray-100">
          <tr class="flex justify-between">
            <td class="py-4 ml-6 hover:text-white font-bold">
              {{ todoItems.length }} items left
            </td>
            <td
              class="py-4 xl:block lg:block md:block sm:hidden xs:hidden xxs:hidden"
            >
              <a href="#" class="filter-link" @click="filterTodoItem('all')"
                >All</a
              >
              <a href="#" class="filter-link" @click="filterTodoItem('active')"
                >Active</a
              >
              <a
                href="#"
                class="filter-link"
                @click="filterTodoItem('completed')"
                >Complete</a
              >
            </td>
            <td
              class="py-4 mr-6 hover:text-white-100 cursor-pointer font-bold"
              @click="clearCompletedTodoItem"
            >
              Clear Completed
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      class="flex-centered font-josefin bg-dark-100 text-gray-100 rounded py-4 responsive-width xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex"
    >
      <a href="#" class="filter-link" @click="filterTodoItem('all')">All</a>
      <a href="#" class="filter-link" @click="filterTodoItem('active')"
        >Active</a
      >
      <a href="#" class="filter-link" @click="filterTodoItem('completed')"
        >Complete</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AppTable",
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