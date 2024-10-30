

export const formatCurrency = (number) => {
  const currency = new Intl.NumberFormat(
    'en-GB',
  ).format(Number(number))
  return currency
}
