export const percentageFormat = (value: number, total: number, inverse?: boolean, absolute?: boolean) => {
  let result: number = 0;

  result = value / total;

  if (inverse) result -= 1;
  if (absolute) result = Math.abs(result);

  result *= 100;

  return result.toFixed(2).toString().concat('%');
};