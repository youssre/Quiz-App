<template>
  <!-- Main Content -->
  <div
    class="bg-white rounded-lg dark:bg-gray-800 shadow-md p-6 sm:p-8 max-w-4xl mx-auto min-h-[calc(100vh-20rem)]"
  >
    <h1
      v-if="!quizStore.quizFinished"
      class="text-2xl sm:text-3xl font-bold mb-6 text-center"
    >
      {{ $t("quiz.title") }}
    </h1>

    <!-- Quiz Content -->

    <div v-if="!quizStore.quizFinished">
      <QuizProgress />
      <QuizTimer />
      <QuizQuestion v-if="!quizStore.isLoading" />
      <!-- skeleton + Loader -->
      <div v-else class="flex animate-pulse space-x-4 mt-6">
        <div class="flex-1 space-y-6 py-1">
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4 mb-5">
              <div class="col-span-2 h-4 rounded bg-gray-200"></div>
            </div>

            <div class="grid grid-cols-3" v-for="i in 4">
              <div class="col-span-1 h-3 rounded bg-gray-200 my-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Results -->
    <QuizResults v-else />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useQuizStore } from "@/stores/quiz";

const QuizTimer = defineAsyncComponent(() =>
  import("@/components/quiz/QuizTimer.vue")
);
const QuizProgress = defineAsyncComponent(() =>
  import("@/components/quiz/QuizProgress.vue")
);
const QuizQuestion = defineAsyncComponent(() =>
  import("@/components/quiz/QuizQuestion.vue")
);
const QuizResults = defineAsyncComponent(() =>
  import("@/components/quiz/QuizResults.vue")
);

const quizStore = useQuizStore();
</script>
