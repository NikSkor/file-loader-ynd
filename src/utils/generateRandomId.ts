export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 8) +
  Date.now().toString().substring(9);
};
  