<template>
  <div class="mb-4 text-end">
    <span class="text-lg font-semibold"
      >{{ $t("quiz.timeLeft") }}: {{ formatTime(quizStore.timeLeft) }}</span
    >
  </div>
</template>

<script setup>
import { useQuizStore } from "@/stores/quiz";

const quizStore = useQuizStore();

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};
</script>
