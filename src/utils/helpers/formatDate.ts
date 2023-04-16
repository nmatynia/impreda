export const formatDate = (date: Date): string => {
  const month = date.toLocaleDateString('en-US', { month: 'short' as const });
  const year = date.getFullYear();
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};
