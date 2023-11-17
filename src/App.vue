<template>
  <div
    class="min-h-screen bg-no-repeat bg-top xl:dark:bg-desktop-dark lg:dark:bg-desktop-dark md:dark:bg-desktop-dark sm:dark:bg-desktop-dark xs:dark:bg-mobile-dark xxs:dark:bg-mobile-dark dark:bg-dark-200 xl:bg-desktop-light lg:bg-desktop-light md:bg-desktop-light sm:bg-desktop-light xl:bg-white-400 lg:bg-white-400 md:bg-white-400 sm:bg-white-200 xs:bg-white-200 xxs:bg-white-200 xs:bg-mobile-light xxs:bg-mobile-light"
  >
    <AppHeader />
    <div
      class="flex items-center responsive-width my-6 h-14 rounded dark:bg-dark-100 dark:text-white-200 bg-white-400 text-dark-100"
    >
      <AppCircle />
      <input
        class="w-full h-full rounded ml-2 focus:outline-none font-size dark:bg-dark-100 bg-white-400"
        type="text"
        name="new-todo"
        id="new-todo"
        placeholder="Create a new todo..."
        v-model="task"
        @keyup.enter="addedTask"
      />
    </div>
    <AppTable />
    <div
      class="flex-centered text-gray-100 text-sm py-7 mx-auto h-3/3 xl:w-1/3"
    >
      <p class="xl:mr-6 lg:mr-6 md:mr-6 sm:mr-4 xs:mr-4 xxs:mr-4">
        Drag and drop to reorder list
      </p>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppTable from "@/components/AppTable.vue";
import AppCircle from "@/components/AppCircle.vue";
export default {
  name: "App",
  data() {
    return {
      task: "",
      spaceRegex: /^\s+$/,
    };
  },
  components: {
    AppHeader,
    AppTable,
    AppCircle,
  },
  methods: {
    addedTask() {
      let tasks = this.$store.getters.tasks.map((item) => item.name);
      this.task = this.task.trim();
      if (
        this.task.length === 0 ||
        this.spaceRegex.test(this.task) ||
        tasks.includes(this.task)
      )
        return;
      this.$store
        .dispatch("postTasks", {
          name: this.task,
          isCompleted: false,
        })
        .then((res) => {
          this.$store.getters.tasks.push(res);
          this.task = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
