<template>
  <div>
    <div
      class="h-auto rounded text-lg shadow-lg responsive-width dark:bg-dark-100 dark:text-white-100 bg-white-400 text-blue-300"
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
      class="flex-centered rounded py-4 my-3 responsive-width xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex dark:bg-dark-100 dark:text-gray-100 bg-white-400 text-gray-400"
    >
      <AppFilter />
    </div>
  </div>
</template>

<script>
import AppDraggableTableRow from "./AppDraggableTableRow.vue";
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
