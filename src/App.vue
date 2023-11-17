<template>
  <div
    class="min-h-screen bg-no-repeat bg-top xl:dark:bg-desktop-dark lg:dark:bg-desktop-dark md:dark:bg-desktop-dark sm:dark:bg-desktop-dark xs:dark:bg-mobile-dark xxs:dark:bg-mobile-dark dark:bg-dark-200 xl:bg-desktop-light lg:bg-desktop-light md:bg-desktop-light sm:bg-desktop-light xl:bg-white-400 lg:bg-white-400 md:bg-white-400 sm:bg-white-200 xs:bg-white-200 xxs:bg-white-200 xs:bg-mobile-light xxs:bg-mobile-light"
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
export default {
  name: "App",
  components: {
    AppHeader,
    AppInputBox,
    AppTable,
    AppReorderList,
  },
  methods: {
    fetchTasks() {
      this.$store
        .dispatch("getTasks")
        .then(() => {
          return this.$store.getters.tasks;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
