const modules = import.meta.glob("./{en,ar}/*.json", { eager: true });
const translations = {};

for (const path in modules) {
  const match = path.match(/\.\/(\w+)\/(\w+)\.json/);
  if (!match) {
    console.error(`Failed to match path: ${path}`);
    continue;
  }
  const [, locale, file] = match;
  if (!translations[locale]) translations[locale] = {};
  translations[locale][file] = modules[path].default;
}

export default translations;
