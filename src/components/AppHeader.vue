<template>
  <div class="flex justify-between items-center pt-16 sm:pt-24">
    <h1 class="font-semibold text-4xl tracking-[0.5em] text-white-200">TODO</h1>
    <button class="flex focus:outline-none" @click="toggleTheme">
      <img :src="iconSrc" :alt="iconName" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ThemeConstants } from "@/utils/AppConstants";

const currentTheme = ref<string>(
  String(localStorage.getItem(ThemeConstants.LOCAL_STORAGE_THEME_KEY))
);

const isDarkTheme = computed<boolean>(() => currentTheme.value === "dark");
const iconSrc = computed<string>(
  () => `src/assets/images/icon-${iconName.value}.svg`
);

const iconName = computed<string>(() =>
  isDarkTheme.value ? ThemeConstants.SUN_ICON : ThemeConstants.MOON_ICON
);

function toggleTheme() {
  const bodyClassList = document.body.classList;
  const isDark = bodyClassList.toggle(ThemeConstants.DARK_THEME_CLASS);
  currentTheme.value = isDark ? "dark" : "";
  localStorage.setItem(
    ThemeConstants.LOCAL_STORAGE_THEME_KEY,
    currentTheme.value
  );
}

onMounted(() => {
  if (isDarkTheme.value) {
    document.body.classList.add(ThemeConstants.DARK_THEME_CLASS);
  }
});
</script>
