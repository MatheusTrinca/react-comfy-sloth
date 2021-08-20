export const formatPrice = number => {
  const newNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  const colors = data.map(item => item[type]);
  return ['all', ...new Set(colors)];
};
