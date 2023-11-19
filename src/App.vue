<template>
  <div
    class="min-h-screen bg-no-repeat bg-top dark:bg-dark-200 bg-white-400 dark:bg-desktop-dark bg-desktop-light sm:dark:bg-mobile-dark sm:bg-mobile-light sm:bg-white-200 sm:min-w-max"
  >
    <AppHeader />
    <AppInputBox />
    <AppTable />
    <AppReorderList />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppInputBox from "@/components/AppInputBox.vue";
import AppTable from "@/components/AppTable.vue";
import AppReorderList from "@/components/AppReorderList.vue";
import { mapActions } from "pinia";
import { useTodoStore } from "./store/index";
export default {
  name: "App",
  components: {
    AppHeader,
    AppInputBox,
    AppTable,
    AppReorderList,
  },
  methods: {
    ...mapActions(useTodoStore, ["getTasks"]),
  },
  created() {
    this.getTasks();
  },
};
</script>
