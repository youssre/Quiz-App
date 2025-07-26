<template>
  <header class="flex justify-end gap-4 container mx-auto my-6">
    <button
      @click="changeLanguage"
      class="px-4 py-2 rounded bg-gray-800 text-white transition-colors cursor-pointer"
    >
      {{ locale === "en" ? "EN" : "AR" }}
    </button>
    <button
      @click="globalStore.toggleDarkMode"
      class="px-4 py-2 rounded bg-gray-800 text-white transition-colors cursor-pointer"
    >
      {{ globalStore.darkMode ? " ☀︎" : " 🌙" }}
    </button>
  </header>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
const globalStore = useGlobalStore();
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const changeLanguage = () => {
  locale.value = locale.value === "en" ? "ar" : "en";
  // direction
  document.documentElement.dir = locale.value === "en" ? "ltr" : "rtl";
};
</script>
