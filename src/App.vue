<template>
  <div class="todo-app h-auto pt-2">
    <div
      class="flex justify-between pt-24 mx-auto xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12"
    >
      <h1 class="text-white font-semibold text-4xl tracking-widest">TODO</h1>
      <img src="./assets/images/icon-sun.svg" alt="" />
    </div>
    <div
      class="my-6 mx-auto font-josefin-sans gray-color text-lg xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12"
    >
      <div
        class="h-5 w-5 border-solid border-2 border-gray-700 rounded-3xl translate-y-5 translate-x-3 absolute"
      ></div>
      <input
        class="w-full pl-12 pt-4 pr-4 pb-4 rounded focus:outline-none bg-dark white-color"
        type="text"
        name=""
        id=""
        placeholder="Create a new todo..."
      />
    </div>
    <div
      class="mx-auto bg-dark rounded font-josefin-sans text-lg shadow-2xl xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12"
    >
      <table class="w-full table-auto">
        <tbody>
          <tr
            class="border-solid border-b-2 border-gray-700"
            v-for="(item, index) in todoItems"
            :key="index"
          >
            <td class="p-4 flex items-center white-color">
              <div
                class="h-5 w-5 border-solid border-2 border-gray-700 rounded-3xl mr-2"
              ></div>
              <span>{{ item.task }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot class="text-sm gray-color">
          <tr class="flex justify-between">
            <td class="py-4 ml-6 hover:text-white">{{ todoItems.length }} items left</td>
            <td class="py-4 xl:block lg:block md:block sm:hidden xs:hidden xxs:hidden">
              <span class="px-2 hover:text-white">All</span>
              <span class="px-2 hover:text-white">Active</span>
              <span class="px-2 hover:text-white">Completed</span>
            </td>
            <td class="py-4 mr-6 hover:text-white">Clear Completed</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      class="flex justify-center items-center py-4 my-2 mx-auto bg-dark gray-color rounded font-josefin-sans xl:w-1/3 lg:w-2/3 md:w-2/3 sm:w-10/12 xs:w-10/12 xxs:w-11/12 xl:hidden lg:hidden md:hidden sm:flex xs:flex xxs:flex"
    >
      <span class="px-2 hover:text-white">All</span>
      <span class="px-2 hover:text-white">Active</span>
      <span class="px-2 hover:text-white">Completed</span>
    </div>
    <div class="flex justify-center items-center font-josefin-sans gray-color text-sm mx-auto xl:w-1/3 h-3/3 py-7">
      <p class="xl:mr-6 lg:mr-6 md:mr-6 sm:mr-4 xs:mr-4 xxs:mr-4">Drag and drop to render list</p>
    </div>
    <!-- <div
      class="text-sm gray-color font-josefin-sans mx-auto py-7 text-center xl:w-1/3 h-3/3"
    >
      Drag and drop to render list
    </div> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      todoItems: [
        { task: "learn html" },
        { task: "learn css" },
        { task: "learn javascript" },
        { task: "learn vue" },
        { task: "learn vue" },
        { task: "learn vue" },
      ],
    };
  },
};
</script>
