export const sleep = (ms: number = 16) =>
  new Promise((resolve) => setTimeout(resolve, ms));
