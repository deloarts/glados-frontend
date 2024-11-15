export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function camelToTitle(text: string): string {
  const result = text
    .replace(/(_)+/g, " ")
    .replace(/([a-z])([A-Z][a-z])/g, "$1 $2")
    .replace(/([A-Z][a-z])([A-Z])/g, "$1 $2")
    .replace(/([a-z])([A-Z]+[a-z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z][a-z])/g, "$1 $2")
    .replace(/([a-z]+)([A-Z0-9]+)/g, "$1 $2")

    // Note: the next regex includes a special case to exclude plurals of acronyms, e.g. "ABCs"
    .replace(/([A-Z]+)([A-Z][a-rt-z][a-z]*)/g, "$1 $2")
    .replace(/([0-9])([A-Z][a-z]+)/g, "$1 $2")

    // Note: the next two regex use {2,} instead of + to add space on phrases like Room26A and 26ABCs but not on phrases like R2D2 and C3PO"
    .replace(/([A-Z]{2,})([0-9]{2,})/g, "$1 $2")
    .replace(/([0-9]{2,})([A-Z]{2,})/g, "$1 $2")
    .trim();

  return capitalizeFirstLetter(result);
}
