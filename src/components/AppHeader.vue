<template>
  <div
    class="flex justify-between items-center pt-24 sm:pt-12 responsive-width"
  >
    <h1 class="font-semibold text-4xl tracking-[0.5em] text-white-200">TODO</h1>
    <button class="flex focus:outline-none" @click="toggleTheme">
      <img
        v-if="theme === 'dark'"
        src="@/assets/images/icon-sun.svg"
        alt="sun"
      />
      <img v-else src="@/assets/images/icon-moon.svg" alt="moon" />
    </button>
  </div>
</template>

<script>

export default {
  name: "AppHeader",
  data() {
    return {
      theme: localStorage.getItem("theme"),
    };
  },
  methods: {
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
  },
  created() {
    if (this.theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  },
};
</script>
