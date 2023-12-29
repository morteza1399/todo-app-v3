<template>
  <div>
    <div :class="containerClasses">
      <div v-if="isHover" :class="dotClasses"></div>
      <img
        v-if="isCompleted"
        src="@/assets/images/icon-check.svg"
        alt="check"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isHover: {
    type: Boolean,
    default: false,
  },
});

const containerClasses = computed(() => {
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
      : "ml-[0.9rem] create-border rounded-full",
  ];
});

const dotClasses = computed(() => {
  return [
    "flex-centered",
    "h-5",
    "w-5",
    props.isCompleted ? "hidden" : "rounded-full dark:bg-dark-100 bg-white-400",
  ];
});
</script>
