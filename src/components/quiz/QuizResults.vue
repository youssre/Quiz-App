<template>
  <div class="text-center">
    <h2 class="text-2xl sm:text-3xl font-bold mb-4">
      {{ $t("quiz.finished") }}
    </h2>
    <p class="text-lg sm:text-xl mb-6">
      {{
        $t("quiz.score", {
          score: quizStore.score,
          total: quizStore.questions.length,
        })
      }}
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        @click="quizStore.restartQuiz"
        class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {{ $t("quiz.restart") }}
      </button>
      <button
        @click="exportAllToPDF"
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        {{ $t("quiz.exportPDF") }}
      </button>
      <button
        @click="exportAllToExcel"
        class="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
      >
        {{ $t("quiz.exportExcel") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from "@/stores/quiz";
const quizStore = useQuizStore();
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const exportAllToPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Quiz Results Summary", 20, 20);

  let y = 30;
  console.log("quizStore.results", quizStore.results);

  quizStore.results.forEach((result, index) => {
    doc.setFontSize(12);
    doc.text(`Question ${index + 1}: ${result.question}`, 20, y);
    doc.text(`Difficulty: ${result.difficulty}`, 20, y + 10);
    doc.text(
      `Your Answers: ${
        result.userAnswers.length ? result.userAnswers.join(", ") : "None"
      }`,
      20,
      y + 20
    );
    doc.text(
      `Correct Answers: ${result.correctAnswers.join(", ")}`,
      20,
      y + 30
    );
    doc.text(
      `Result: ${result.isCorrect ? "Correct" : "Incorrect"}`,
      20,
      y + 40
    );
    y += 50;
    if (y > 250 && index < quizStore.results.length - 1) {
      doc.addPage();
      y = 20;
    }
  });

  doc.text(
    `Final Score: ${quizStore.score} out of ${quizStore.questions.length}`,
    20,
    y
  );
  doc.save("quiz_results.pdf");
};

const exportAllToExcel = () => {
  const data = quizStore.results.map((result, index) => ({
    QuestionID: result.id,
    Question: result.question,
    Difficulty: result.difficulty,
    UserAnswers: result.userAnswers.join(", "),
    CorrectAnswers: result.correctAnswers.join(", "),
    Result: result.isCorrect ? "Correct" : "Incorrect",
  }));

  data.push({
    QuestionID: "",
    Question: "Final Score",
    Difficulty: "",
    UserAnswers: "",
    CorrectAnswers: "",
    Result: `${quizStore.score} out of ${quizStore.questions.length}`,
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Quiz Results");
  XLSX.writeFile(wb, "quiz_results.xlsx");
};
</script>
