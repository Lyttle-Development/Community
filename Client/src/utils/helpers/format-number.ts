/**
 * formats number: 1000000.123 => 1,000,000.123
 * @param value
 */
export function formatNumber(value: number | string): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
