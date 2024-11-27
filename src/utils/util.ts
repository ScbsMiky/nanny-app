export function weightedAverage(...data: number[ ]) {
  return (data.reduce((a, b, i) => a + (b * i + 1), 0)) / data.reduce((a, b, i) => a + b, 0);
};