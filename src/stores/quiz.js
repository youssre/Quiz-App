import { defineStore } from "pinia";
import questionsData from "@/assets/js/questions.json";
import { ref, computed, onMounted, onUnmounted } from "vue";

export const useQuizStore = defineStore("quiz", () => {
  // State
  const questions = ref(questionsData);
  const currentQuestionIndex = ref(0);
  const userAnswers = ref([]);
  const isAnswered = ref(false);
  const score = ref(0);
  const quizFinished = ref(false);
  const timeLeft = ref(5 * 60); // 5 minutes in seconds
  const results = ref([]);
  const isLoading = ref(false);

  // Computed properties
  const shuffledOptions = computed(() => {
    const options = [...questions.value[currentQuestionIndex.value].options];
    return options.sort(() => Math.random() - 0.5);
  });

  const progressPercentage = computed(() => {
    return ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
  });

  const isCorrect = computed(() => {
    const correctAnswers =
      questions.value[currentQuestionIndex.value].correctAnswers;
    const userAns = Array.isArray(userAnswers.value)
      ? userAnswers.value
      : [userAnswers.value];

    console.log("userAnswers", userAns);
    console.log("correctAnswers", correctAnswers);

    return (
      userAns.length === correctAnswers.length &&
      userAns.every((answer) => correctAnswers.includes(answer)) &&
      correctAnswers.every((answer) => userAns.includes(answer))
    );
  });

  // Methods
  const submitAnswer = () => {
    if (userAnswers.value.length) {
      isAnswered.value = true;
      if (isCorrect.value) {
        score.value++;
      }
      // Store result
      results.value.push({
        id: questions.value[currentQuestionIndex.value].id,
        question: questions.value[currentQuestionIndex.value].question,
        difficulty: questions.value[currentQuestionIndex.value].difficulty,
        userAnswers: [...userAnswers.value],
        correctAnswers:
          questions.value[currentQuestionIndex.value].correctAnswers,
        isCorrect: isCorrect.value,
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      isLoading.value = true;

      setTimeout(() => {
        currentQuestionIndex.value++;
        userAnswers.value = [];
        isAnswered.value = false;
        isLoading.value = false;
      }, 1000);
    } else {
      quizFinished.value = true;
    }
  };

  const restartQuiz = () => {
    currentQuestionIndex.value = 0;
    userAnswers.value = [];
    isAnswered.value = false;
    score.value = 0;
    quizFinished.value = false;
    timeLeft.value = 5 * 60;
    results.value = [];
  };

  const isCorrectAnswer = (option) => {
    return questions.value[currentQuestionIndex.value].correctAnswers.includes(
      option
    );
  };

  // Timer logic
  let timer;
  onMounted(() => {
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        quizFinished.value = true;
        clearInterval(timer);
      }
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return {
    questions,
    currentQuestionIndex,
    userAnswers,
    isAnswered,
    score,
    quizFinished,
    timeLeft,
    shuffledOptions,
    progressPercentage,
    isCorrect,
    results,
    isLoading,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    isCorrectAnswer,
  };
});
