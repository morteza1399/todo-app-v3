<template>
  <div>
    <div
      :class="[
        'font-josefin h-auto rounded text-lg shadow-lg responsive-width',
        {
          'bg-dark-100 text-white-100': darkMode,
          'bg-white-400 text-blue-300': !darkMode,
        },
      ]"
    >
      <table class="w-full h-auto table-auto">
        <tbody>
          <div is="draggable" :list="todoItems" tag="div">
            <tr
              :class="[
                'flex justify-between items-center',
                {
                  'create-border-bottom border-gray-300': darkMode,
                  'border-solid border-b cursor-pointer border-white-200':
                    !darkMode,
                },
              ]"
              v-for="item in todoItems"
              :key="item.id"
            >
              <td class="flex-centered p-4">
                <div
                  :class="{
                    'flex-centered h-6 w-6 mr-2 create-border rounded-3xl hover:bg-gradient-to-br from-blue-100 to-purple hover:border-none':
                      item.status != 'completed',
                    'border-gray-300': darkMode,
                    'border-white-200': !darkMode,
                    'flex-centered h-6 w-6 bg-gradient-to-br rounded-3xl from-blue-100 to-purple':
                      item.status === 'completed',
                  }"
                >
                  <div
                    :class="{
                      'flex-centered h-5 w-5 rounded-3xl':
                        item.status != 'completed',
                      'bg-dark-100': darkMode,
                      'bg-white-400': !darkMode,
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
                    'select-none xl:ml-4 lg:ml-4 md:ml-4 xl:text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs xxs:text-xs',
                    {
                      'line-through text-gray-200':
                        item.status === 'completed' && darkMode,
                      'line-through text-white-200':
                        item.status === 'completed' && !darkMode,
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
          </div>
          <tr
            v-if="hasTasks"
            :class="[
              'flex-centered create-border-bottom',
              {
                'border-gray-300': darkMode,
                'border-solid border-b cursor-pointer border-white-200':
                  !darkMode,
              },
            ]"
          >
            <td class="flex-centered p-4">NO TASKS</td>
          </tr>
        </tbody>
        <tfoot :class="['text-sm', { 'text-gray-100': darkMode }]">
          <tr class="flex justify-between">
            <td
              :class="[
                'py-4 ml-6 font-bold',
                {
                  'hover:text-white-100': darkMode,
                  'text-gray-400 hover:text-blue-300': !darkMode,
                },
              ]"
            >
              {{ todoItems.length }} items left
            </td>
            <td
              class="py-4 xl:block lg:block md:block sm:hidden xs:hidden xxs:hidden"
            >
              <a
                href="#"
                :class="{
                  'filter-link': darkMode,
                  'filter-link-light': !darkMode,
                }"
                @click="filterTodoItem('all')"
                >All</a
              >
              <a
                href="#"
                :class="{
                  'filter-link': darkMode,
                  'filter-link-light': !darkMode,
                }"
                @click="filterTodoItem('active')"
                >Active</a
              >
              <a
                href="#"
                :class="{
                  'filter-link': darkMode,
                  'filter-link-light': !darkMode,
                }"
                @click="filterTodoItem('completed')"
                >Complete</a
              >
            </td>
            <td
              :class="[
                'py-4 mr-6 cursor-pointer font-bold',
                {
                  'hover:text-white-100': darkMode,
                  'text-gray-400 hover:text-blue-300': !darkMode,
                },
              ]"
              @click="clearCompletedTodoItem"
            >
              Clear Completed
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      :class="[
        'flex-centered font-josefin rounded py-4 my-3 responsive-width xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex',
        {
          'bg-dark-100 text-gray-100': darkMode,
          'bg-white-400 text-gray-400': !darkMode,
        },
      ]"
    >
      <a
        href="#"
        :class="{
          'filter-link': darkMode,
          'filter-link-light': !darkMode,
        }"
        @click="filterTodoItem('all')"
        >All</a
      >
      <a
        href="#"
        :class="{
          'filter-link': darkMode,
          'filter-link-light': !darkMode,
        }"
        @click="filterTodoItem('active')"
        >Active</a
      >
      <a
        href="#"
        :class="{
          'filter-link': darkMode,
          'filter-link-light': !darkMode,
        }"
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
    darkMode: {
      type: Boolean,
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
