import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { createI18n } from "vue-i18n";
import translations from "./locales";
import { createPinia } from "pinia";

const pinia = createPinia();
const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: translations,
});

createApp(App).use(pinia).use(i18n).mount("#app");
