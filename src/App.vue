<template>
  <div>
    <!-- Header -->
    <Header />
    <Transition name="fade" mode="out-in">
      <Quiz />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import Quiz from "@/components/quiz/Quiz.vue";
import Header from "@/components/global/Header.vue";
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
