export const delay = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));
