const warnedMessages = new Set<string>();

/** Clears the warnings that were already logged. For tests only. */
export const resetWarnings = () => warnedMessages.clear();

/** Logs a warning once per message, outside production. */
export const warnOnce = (message: string) => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    return;
  }
  if (!warnedMessages.has(message)) {
    warnedMessages.add(message);
    console.warn(message);
  }
};
