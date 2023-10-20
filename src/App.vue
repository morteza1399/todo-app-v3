<template>
  <div class="todo-app h-auto pt-2">
    <div class="flex justify-between pt-24 mx-auto xl:w-1/3 lg:w-1/3 md:w-2/3 sm:w-10/12 xs:w-10/12">
      <h1 class="text-white font-semibold text-4xl tracking-widest">TODO</h1>
      <img src="./assets/images/icon-sun.svg" alt="" />
    </div>
    <div class="my-6 mx-auto font-josefin-sans gray-color text-lg xl:w-1/3 lg:w-1/3 md:w-2/3 sm:w-10/12 xs:w-10/12">
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
    <div class="mx-auto bg-dark rounded font-josefin-sans text-lg shadow-2xl xl:w-1/3 lg:w-1/3 md:w-2/3 sm:w-10/12 xs:w-10/12">
      <table class="w-full table-auto">
        <tbody>
          <tr class="border-solid border-b-2 border-gray-700" v-for="(item, index) in todoItems" :key="index">
            <td class="p-4 flex items-center white-color">
              <div
                class="h-5 w-5 border-solid border-2 border-gray-700 rounded-3xl mr-2"
              ></div>
              <span>{{ item.task }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot class="text-xs gray-color">
          <tr class="flex justify-between">
            <td class="py-4 ml-6">5 items left</td>
            <td class="py-4">
              <span class="px-2">All</span>
              <span class="px-2">Active</span>
              <span class="px-2">Completed</span>
            </td>
            <td class="py-4 mr-6">Clear Completed</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="text-center py-8 text-xs gray-color font-josefin-sans">
      Drag and drop to render list
    </div>
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
