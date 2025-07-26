<template>
  <div class="bg-transparent p-6 rounded-lg">
    <h2 class="text-xl text-start font-semibold mb-4">
      {{ quizStore.questions[quizStore.currentQuestionIndex].question }}
      <span
        class="text-sm text-gray-500"
        v-if="quizStore.questions[quizStore.currentQuestionIndex].difficulty"
      >
        ({{ quizStore.questions[quizStore.currentQuestionIndex].difficulty }})
      </span>
    </h2>
    <p
      v-if="
        quizStore.questions[quizStore.currentQuestionIndex].type === 'multiple'
      "
      class="text-sm text-start text-gray-600 mb-4"
    >
      {{ $t("quiz.selectMultiple") }}
    </p>

    <!-- Answer Options -->
    <form @submit.prevent="quizStore.submitAnswer">
      <div
        v-for="(option, index) in quizStore.shuffledOptions"
        :key="index"
        class="mb-3"
      >
        <label class="flex items-center cursor-pointer">
          <input
            v-if="
              quizStore.questions[quizStore.currentQuestionIndex].type ===
              'single'
            "
            type="radio"
            v-model="quizStore.userAnswers"
            :value="option"
            :disabled="quizStore.isAnswered"
            class="mx-2 h-5 w-5"
          />
          <input
            v-else
            type="checkbox"
            v-model="quizStore.userAnswers"
            :value="option"
            :disabled="quizStore.isAnswered"
            class="mx-2 h-5 w-5"
          />
          <span
            :class="{
              'text-green-600':
                quizStore.isAnswered && quizStore.isCorrectAnswer(option),
              'text-red-600':
                quizStore.isAnswered &&
                quizStore.userAnswers.includes(option) &&
                !quizStore.isCorrectAnswer(option),
            }"
            class="text-lg"
          >
            {{ option }}
          </span>
        </label>
      </div>

      <!-- Feedback and Buttons -->
      <div v-if="quizStore.isAnswered" class="mt-4">
        <p
          :class="quizStore.isCorrect ? 'text-green-600' : 'text-red-600'"
          class="font-semibold text-start"
        >
          {{ quizStore.isCorrect ? $t("quiz.correct") : $t("quiz.incorrect") }}
        </p>
        <button
          @click="quizStore.nextQuestion"
          class="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors cursor-pointer"
        >
          {{ $t("quiz.next") }}
        </button>
      </div>
      <button
        v-else
        type="submit"
        :disabled="!quizStore.userAnswers.length"
        class="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 transition-colors"
        :class="{
          'cursor-not-allowed': !quizStore.userAnswers.length,
          'cursor-pointer': quizStore.userAnswers.length,
        }"
      >
        {{ $t("quiz.submit") }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { useQuizStore } from "@/stores/quiz";
const quizStore = useQuizStore();
</script>
