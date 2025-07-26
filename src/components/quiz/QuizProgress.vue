<template>
  <div class="mb-6">
    <div class="flex justify-between mb-2">
      <span>
        {{ $t("quiz.question") }} {{ quizStore.currentQuestionIndex + 1 }}
        {{ $t("quiz.of") }} {{ quizStore.questions.length }}
      </span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="bg-green-600 h-2.5 rounded-full transition-all duration-300"
        :style="{ width: quizStore.progressPercentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from "@/stores/quiz";
const quizStore = useQuizStore();
</script>
