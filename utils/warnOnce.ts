// Read `process.env.NODE_ENV` as is: app bundlers replace this exact expression with "production".
// Don't add a `typeof process` check: bundlers leave it in, and in the browser it would always
// fail, keeping warnings on in production.
// The try catches the ReferenceError where `process` doesn't exist and nothing replaced it.
const isProduction = (() => {
  try {
    return process.env.NODE_ENV === 'production';
  } catch {
    return false;
  }
})();

const warnedMessages = new Set<string>();

/** Clears the warnings that were already logged. For tests only. */
export const resetWarnings = () => warnedMessages.clear();

/** Logs a warning once per message, outside production. */
export const warnOnce = (message: string) => {
  if (isProduction) {
    return;
  }
  if (!warnedMessages.has(message)) {
    warnedMessages.add(message);
    console.warn(message);
  }
};
