<template>
  <div>
    <div
      class="h-auto rounded text-lg shadow-lg dark:bg-dark-100 dark:text-white-100 bg-white-400 text-blue-300"
    >
      <table class="w-full h-auto table-auto">
        <AppTableBody />
        <AppTableFooter />
      </table>
    </div>
    <div
      class="flex-centered sm:hidden flex rounded py-4 my-3 dark:bg-dark-100 dark:text-gray-100 bg-white-400 text-gray-400"
    >
      <AppFilter />
    </div>
  </div>
</template>

<script>
import AppTableBody from "./AppTableBody.vue";
import AppTableFooter from "./AppTableFooter.vue";
import AppFilter from "./AppFilter.vue";

export default {
  name: "AppTable",
  components: {
    AppTableBody,
    AppTableFooter,
    AppFilter,
  },
};
</script>
