export const formatDate = (date: Date): string => {
  return `${date.getDate()}-${
    date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  }-${date.getFullYear()}`;
};
