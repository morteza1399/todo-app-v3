<template>
  <div>
    <div
      :class="`${
        isCompleted
          ? 'flex-centered h-6 w-6 bg-gradient-to-br rounded-full from-blue-100 to-purple dark:border-gray-300 border-white-300'
          : hasHover === false
          ? 'h-6 w-6 create-border rounded-full ml-[0.9rem] dark:border-gray-300 border-white-300'
          : 'flex-centered h-6 w-6 mr-2 create-border rounded-full hover:bg-gradient-to-br from-blue-100 to-purple hover:border-none dark:border-gray-300 border-white-300'
      }`"
    >
      <div
        v-if="hasHover"
        :class="`${
          isCompleted
            ? 'hidden'
            : 'flex-centered h-5 w-5 rounded-full dark:bg-dark-100 bg-white-400'
        }`"
      ></div>
      <img
        :class="`${isCompleted ? 'flex' : 'hidden'}`"
        src="@/assets/images/icon-check.svg"
        alt="check"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: false,
  },
  hasHover: {
    type: Boolean,
    default: false,
  },
});
</script>
