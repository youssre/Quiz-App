import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useGlobalStore = defineStore("global", () => {
  // State
  const darkMode = ref(false);

  // Watch for dark mode changes and update document class
  watch(darkMode, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
  };

  return { darkMode, toggleDarkMode };
});
