const KEY = "vero:prefill-email";

/**
 * Hands an email address from one page to the next without putting it in
 * the URL, where it would sit in browser history, referrer headers and
 * server logs. sessionStorage is per-tab and cleared on read, so it only
 * ever carries the value across this one navigation.
 */
export function setPrefillEmail(email: string): void {
  try {
    window.sessionStorage.setItem(KEY, email);
  } catch {
    // Storage unavailable (private browsing, etc). The next page's field
    // just starts empty; not worth failing the navigation over.
  }
}

export function takePrefillEmail(): string {
  try {
    const value = window.sessionStorage.getItem(KEY) ?? "";
    window.sessionStorage.removeItem(KEY);
    return value;
  } catch {
    return "";
  }
}
