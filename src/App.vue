<template>
  <div class="todo-app h-auto pt-[0.45rem]">
    <div
      class="flex justify-between pt-24 mx-auto xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12"
    >
      <h1 class="font-semibold text-4xl tracking-[0.5em] text-white-200">
        TODO
      </h1>
      <img src="./assets/images/icon-sun.svg" alt="" />
    </div>
    <div
      class="font-josefin text-gray-100 text-lg my-6 mx-auto xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12"
    >
      <div
        class="h-6 w-6 border-solid border-2 border-gray-700 rounded-3xl translate-y-5 translate-x-3 absolute"
      ></div>
      <input
        class="w-full pl-16 pt-4 pr-4 pb-4 rounded bg-dark-100 focus:outline-none"
        type="text"
        name=""
        id=""
        placeholder="Create a new todo..."
        v-model="task"
        @keyup.enter="addedTask"
      />
    </div>
    <div
      class="font-josefin bg-dark-100 text-white-100 rounded text-lg shadow-2xl mx-auto xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12"
    >
      <table class="w-full table-auto">
        <tbody>
          <tr
            class="flex justify-between items-center border-solid border-b-2 border-gray-700 cursor-pointer"
            v-for="(item, index) in tasks"
            :key="index"
          >
            <td class="flex justify-center items-center p-4">
              <div
                :class="{
                  'flex justify-center items-center h-6 w-6 mr-2 border-2 border-solid border-gray-700 rounded-3xl hover:bg-gradient-to-br from-blue to-purple hover:border-none':
                    item.status != 'completed',
                  'flex justify-center items-center h-6 w-6 bg-gradient-to-br rounded-3xl from-blue to-purple':
                    item.status === 'completed',
                }"
              >
                <div
                  :class="{
                    'flex justify-center items-center h-5 w-5 bg-dark-100 rounded-3xl':
                      item.status != 'completed',
                    hidden: item.status === 'completed',
                  }"
                ></div>
                <img
                  :class="{
                    hidden: item.status != 'completed',
                    flex: item.status == 'completed',
                  }"
                  src="./assets/images/icon-check.svg"
                  alt=""
                />
              </div>
              <span
                :class="[
                  'ml-4',
                  { 'line-through text-gray-200': item.status === 'completed' },
                ]"
                @click="changeStatus(index)"
              >
                {{ item.name }} =========== {{ item.status }}
              </span>
            </td>
            <td class="flex justify-center items-center p-4">
              <img
                class="hidden"
                src="./assets/images/icon-cross.svg"
                alt=""
                @click="removeTask(index)"
              />
            </td>
          </tr>
        </tbody>
        <tfoot class="text-sm text-gray-100">
          <tr class="flex justify-between">
            <td class="py-4 ml-6 hover:text-white">
              {{ tasks.length }} items left
            </td>
            <td
              class="py-4 xl:block lg:block md:block sm:hidden xs:hidden xxs:hidden"
            >
              <span
                class="px-2 hover:text-white-100 cursor-pointer"
                @click="filterTasks('all')"
                >All</span
              >
              <span
                class="px-2 hover:text-white-100 cursor-pointer"
                @click="filterTasks('active')"
                >Active</span
              >
              <span
                class="px-2 hover:text-white-100 cursor-pointer"
                @click="filterTasks('completed')"
                >Complete</span
              >
            </td>
            <td class="py-4 mr-6 hover:text-white-100 cursor-pointer">
              Clear Completed
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      class="flex justify-center items-center font-josefin bg-dark-100 text-gray-100 rounded py-4 my-2 mx-auto xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12 xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex"
    >
      <span
        class="px-2 hover:text-white-100 cursor-pointer"
        @click="filterTasks('all')"
        >All</span
      >
      <span
        class="px-2 hover:text-white-100 cursor-pointer"
        @click="filterTasks('active')"
        >Active</span
      >
      <span
        class="px-2 hover:text-white-100 cursor-pointer"
        @click="filterTasks('completed')"
        >Complete</span
      >
    </div>
    <div
      class="flex justify-center items-center font-josefin text-gray-100 text-sm py-7 mx-auto h-3/3 xl:w-1/3"
    >
      <p class="xl:mr-6 lg:mr-6 md:mr-6 sm:mr-4 xs:mr-4 xxs:mr-4">
        Drag and drop to render list
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tasks: [],
      task: "",
      availableStatus: ["to-do", "active", "completed"],
    };
  },
  methods: {
    addedTask() {
      this.tasks.push({
        name: this.task,
        status: "to-do",
      });
      this.task = "";
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    changeStatus(index) {
      let newIndex = this.availableStatus.indexOf(this.tasks[index].status);
      if (++newIndex > 2) newIndex = 0;
      this.tasks[index].status = this.availableStatus[newIndex];
    },
    filterTasks(property) {
      if (property === "all") {
        this.tasks = this.$store.getters.get_tasks
      } else {
        this.tasks = this.$store.getters.get_tasks
        let filterdTasks = this.tasks.filter((item) => {
          return item.status === property;
        });
        this.tasks = filterdTasks;
      }
    },
  },
  created() {
    this.$store
      .dispatch("getTasks")
      .then(() => {
        this.tasks = this.$store.getters.get_tasks
      })
      .catch((err) => {
        console.log(err, "err");
      });
  },
};
</script>
