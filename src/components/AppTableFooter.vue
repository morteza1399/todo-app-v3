<template>
  <tfoot class="text-sm dark:text-gray-100">
    <tr class="flex justify-between">
      <td class="py-4 ml-6 font-bold text-gray-400">{{ messageItemsLeft }}</td>
      <td class="py-4 xl:block lg:block md:block sm:hidden xs:hidden xxs:hidden">
        <AppFilter />
      </td>
      <td
        class="py-4 mr-6 cursor-pointer font-bold dark:hover:text-white-100 text-gray-400 hover:text-blue-300"
        @click="clearCompletedTodoItem"
      >Clear Completed</td>
    </tr>
  </tfoot>
</template>

<script>
import AppFilter from "./AppFilter.vue";
export default {
  name: "AppTableFooter",
  components: {
    AppFilter
  },
  computed: {
    activeTodoItems() {
      return this.$store.getters.tasks.filter(item => {
        return item.isCompleted === false;
      });
    },
    messageItemsLeft() {
      if (this.activeTodoItems.length > 1) {
        return `${this.activeTodoItems.length} items left`;
      } else {
        return `${this.activeTodoItems.length} item left`;
      }
    }
  },
  methods: {
    clearCompletedTodoItem() {
      for (const item of this.$store.getters.tasks) {
        if (item.isCompleted) {
          this.$store
            .dispatch("deleteTasks", item.id)
            .then(() => {
              const index = this.$store.state.tasks.indexOf(item);
              this.$store.state.tasks.splice(index, 1);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
};
</script>
