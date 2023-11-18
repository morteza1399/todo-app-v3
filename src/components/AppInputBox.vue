<template>
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
</template>

<script>
import AppCircle from "./AppCircle.vue";
export default {
  name: "AppInputBox",
  data() {
    return {
      task: "",
      spaceRegex: /^\s+$/
    };
  },
  components: {
    AppCircle
  },
  methods: {
    addedTask() {
      let tasks = this.$store.getters.tasks.map(item => item.name);
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
          isCompleted: false
        })
        .then(res => {
          this.$store.state.tasks.push(res);
          this.task = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
