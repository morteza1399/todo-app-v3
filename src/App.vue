<template>
  <div
    class="min-h-screen bg-no-repeat xl:dark:bg-desktop-dark lg:dark:bg-desktop-dark md:dark:bg-desktop-dark sm:dark:bg-desktop-dark xs:dark:bg-mobile-dark xxs:dark:bg-mobile-dark dark:bg-dark-200 xl:bg-desktop-light lg:bg-desktop-light md:bg-desktop-light sm:bg-desktop-light xs:bg-mobile-light xxs:bg-mobile-light bg-white-400"
    ref="content"
  >
    <div class="flex justify-between items-center pt-24 responsive-width">
      <h1 class="font-semibold text-4xl tracking-[0.5em] text-white-200">
        TODO
      </h1>
      <button class="flex focus:outline-none" @click="toggleTheme">
        <img v-if="isDark" src="@/assets/images/icon-sun.svg" alt="sun" />
        <img v-else src="@/assets/images/icon-moon.svg" alt="moon" />
      </button>
    </div>
    <div
      class="flex items-center font-josefin responsive-width my-6 h-14 rounded dark:bg-dark-100 dark:text-gray-100 bg-white-400 text-dark-100"
    >
      <div
        class="h-6 w-6 create-border rounded-[100%] ml-4 dark:border-gray-300 border-white-200"
      ></div>
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
    <AppTable
      :todo-items="tasks"
      @remove-item="removeTask"
      @update-item="updateTask"
      @filter-item="filterTask"
      @clear-complete-item="clearCompleteTask"
    />

    <div
      class="flex-centered font-josefin text-gray-100 text-sm py-7 mx-auto h-3/3 xl:w-1/3"
    >
      <p class="xl:mr-6 lg:mr-6 md:mr-6 sm:mr-4 xs:mr-4 xxs:mr-4">
        Drag and drop to render list
      </p>
    </div>
  </div>
</template>

<script>
import AppTable from "@/components/AppTable.vue";
export default {
  name: "App",
  data() {
    return {
      tasks: [],
      task: "",
      availableStatus: ["to-do", "active", "completed"],
      isDark: true,
    };
  },
  components: {
    AppTable,
  },
  methods: {
    addedTask() {
      if (this.task.length === 0) return;
      this.$store
        .dispatch("postTasks", {
          name: this.task,
          status: "to-do",
        })
        .then((res) => {
          this.tasks.push(res);
        })
        .then(() => {
          this.task = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeTask(item) {
      this.$store
        .dispatch("deleteTasks", item.id)
        .then(() => {
          this.fetchTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTask(item) {
      let newIndex = this.availableStatus.indexOf(item.status);
      if (++newIndex > 2) newIndex = 0;
      item.status = this.availableStatus[newIndex];
      this.$store.dispatch("updateTasks", {
        id: item.id,
        updatedTask: item,
      });
    },
    clearCompleteTask() {
      for (const item of this.tasks) {
        if (item.status == "completed") {
          this.removeTask(item);
        }
      }
    },
    filterTask(property) {
      if (property === "all") {
        this.tasks = this.$store.getters.get_tasks;
      } else {
        this.tasks = this.$store.getters.get_tasks;
        let filterdTasks = this.tasks.filter((item) => {
          return item.status === property;
        });
        this.tasks = filterdTasks;
      }
    },
    toggleTheme() {
      const html_element = this.$refs.content.parentElement.parentElement;
      this.isDark = !this.isDark;
      if (this.isDark) {
        html_element.classList.add("dark");
      } else {
        html_element.classList.remove("dark");
      }
    },
    fetchTasks() {
      this.$store
        .dispatch("getTasks")
        .then((res) => {
          this.tasks = res;
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