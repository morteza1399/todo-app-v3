<template>
  <div class="flex justify-between items-center pt-16 sm:pt-24">
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

<script setup>
import { ref, onMounted } from "vue";
const theme = ref(localStorage.getItem("theme"));

function toggleTheme() {
  document.body.classList.toggle("dark");
  if (document.body.className.includes("dark")) {
    localStorage.setItem("theme", "dark");
    theme.value = localStorage.getItem("theme");
  } else {
    localStorage.setItem("theme", "");
    theme.value = localStorage.getItem("theme");
  }
}

onMounted(() => {
  if (theme.value === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
</script>
