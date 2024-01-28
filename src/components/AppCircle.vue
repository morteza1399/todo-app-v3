<template>
  <div>
    <div :class="circleClasses">
      <div v-if="isHover" :class="hoverClasses"></div>
      <img v-if="isCompleted" src="@/assets/images/icon-check.svg" alt="check" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  isCompleted?: boolean;
  isHover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isCompleted: false,
  isHover: false
});

const circleClasses = computed<string[]>(() => {
  return [
    "flex-centered",
    "h-6",
    "w-6",
    "dark:border-gray-300",
    "border-white-300",
    props.isCompleted
      ? "bg-gradient-to-br rounded-full from-blue-100 to-purple"
      : props.isHover
      ? "mr-2 create-border rounded-full hover:bg-gradient-to-br from-blue-100 to-purple hover:border-none"
      : "ml-[0.9rem] create-border rounded-full"
  ];
});

const hoverClasses = computed<string[]>(() => {
  return [
    "flex-centered",
    "h-5",
    "w-5",
    props.isCompleted ? "hidden" : "rounded-full dark:bg-dark-100 bg-white-400"
  ];
});
</script>
