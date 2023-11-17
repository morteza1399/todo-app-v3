<template>
  <div>
    <a
      href="#"
      :class="`${
        currentIndex === index
          ? 'dark:filter-link filter-link-light text-blue-200'
          : 'dark:filter-link filter-link-light'
      }`"
      v-for="(filterItem, index) in this.filterItems"
      :key="index"
      @click.prevent="filterTodoItem(filterItem)"
    >
      {{ filterItem }}
    </a>
  </div>
</template>

<script>
export default {
  name: "AppFilter",
  data() {
    return {
      filterItems: ["All", "Active", "Complete"],
      currentIndex: +localStorage.getItem("currentIndex"),
    };
  },
  methods: {
    filterTodoItem(item) {
      localStorage.setItem("status", item);
      this.$store.commit("SET_STATUS", item);
      let key = this.filterItems.indexOf(item);
      this.currentIndex = key;
      localStorage.setItem("currentIndex", this.currentIndex);
    },
  },
};
</script>
