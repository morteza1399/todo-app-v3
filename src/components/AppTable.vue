<template>
  <div>
    <div
      class="h-auto rounded text-lg shadow-lg dark:bg-dark-100 dark:text-white-100 bg-white-400 text-blue-300 responsive-width"
    >
      <table class="w-full h-auto table-auto">
        <tbody>
          <AppDraggableTableRow />
          <tr
            v-if="noTask"
            class="flex-centered create-border-bottom border-solid border-b cursor-pointer border-white-200 dark:border-gray-300"
          >
            <td class="flex-centered p-4">NO TASKS</td>
          </tr>
        </tbody>
        <AppTableFooter />
      </table>
    </div>
    <div
      class="flex-centered hidden sm:flex rounded py-4 my-3 dark:bg-dark-100 dark:text-gray-100 bg-white-400 text-gray-400 responsive-width"
    >
      <AppFilter />
    </div>
  </div>
</template>

<script>
import AppDraggableTableRow from "./appdraggabletablerow.vue";
import AppTableFooter from "./AppTableFooter.vue";
import AppFilter from "./AppFilter.vue";
export default {
  name: "AppTable",
  components: {
    AppDraggableTableRow,
    AppTableFooter,
    AppFilter,
  },
  computed: {
    noTask() {
      return this.$store.getters.tasks.length === 0;
    },
  },
};
</script>
