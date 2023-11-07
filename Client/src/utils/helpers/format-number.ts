/**
 * formats number: 1000000.123 => 1,000,000.123
 * @param value
 */
export function formatNumber(value: number | string): string {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  value = Math.round(value);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
