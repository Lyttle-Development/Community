export function findTranslation(
  translations: { key: string; value: string }[],
  key: string,
) {
  const translation = translations.find((t) => t.key === key);
  if (!translation) return '';
  return translation.value;
}
