export function blur() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}
