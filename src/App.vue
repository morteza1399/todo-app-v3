<template>
  <div
    class="min-h-screen bg-no-repeat bg-top xl:dark:bg-desktop-dark lg:dark:bg-desktop-dark md:dark:bg-desktop-dark sm:dark:bg-desktop-dark xs:dark:bg-mobile-dark xxs:dark:bg-mobile-dark dark:bg-dark-200 xl:bg-desktop-light lg:bg-desktop-light md:bg-desktop-light sm:bg-desktop-light xl:bg-white-400 lg:bg-white-400 md:bg-white-400 sm:bg-white-200 xs:bg-white-200 xxs:bg-white-200 xs:bg-mobile-light xxs:bg-mobile-light"
  >
    <div class="flex justify-between items-center pt-24 responsive-width">
      <h1 class="font-semibold text-4xl tracking-[0.5em] text-white-200">
        TODO
      </h1>
      <button class="flex focus:outline-none" @click="toggleTheme">
        <img
          v-if="theme === 'dark'"
          src="@/assets/images/icon-sun.svg"
          alt="sun"
        />
        <img v-else src="@/assets/images/icon-moon.svg" alt="moon" />
      </button>
    </div>
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
    <AppTable
      :todo-items="tasks"
      @remove-item="removeTask"
      @update-item="updateTask"
      @filter-item="filterTask"
      @clear-complete-item="clearCompleteTask"
    />

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
import AppTable from "@/components/AppTable.vue";
import AppCircle from "./components/AppCircle.vue";
export default {
  name: "App",
  data() {
    return {
      tasks: [],
      task: "",
      spaceRegex: /^\s+$/,
      theme: localStorage.getItem("theme"),
    };
  },
  components: {
    AppTable,
    AppCircle,
  },
  methods: {
    addedTask() {
      if (this.task.length === 0 || this.spaceRegex.test(this.task)) return;
      this.$store
        .dispatch("postTasks", {
          name: this.task,
          isCompleted: false,
        })
        .then((res) => {
          this.tasks.push(res);
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
          const index = this.tasks.indexOf(item);
          this.tasks.splice(index, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTask(item) {
      item.isCompleted = !item.isCompleted;
      this.$store.dispatch("updateTasks", {
        id: item.id,
        updatedTask: item,
      });
    },
    clearCompleteTask() {
      for (const item of this.tasks) {
        if (item.isCompleted) {
          this.removeTask(item);
        }
      }
    },
    filterTask(property) {
      switch (property) {
        case "all":
          this.tasks = this.$store.getters.get_tasks;
          break;
        case "active":
          this.tasks = this.$store.getters.get_tasks;
          let active = this.tasks.filter((item) => {
            return item.isCompleted === false;
          });
          this.tasks = active;
          break;
        case "completed":
          this.tasks = this.$store.getters.get_tasks;
          let completed = this.tasks.filter((item) => {
            return item.isCompleted === true;
          });
          this.tasks = completed;
        default:
          break;
      }
    },
    toggleTheme() {
      document.body.classList.toggle("dark");
      if (document.body.className.includes("dark")) {
        localStorage.setItem("theme", "dark");
        this.theme = localStorage.getItem("theme");
      } else {
        localStorage.setItem("theme", "");
        this.theme = localStorage.getItem("theme");
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
    if (this.theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  },
};
</script>
