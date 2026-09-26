export const getRandomValueBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
