export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Helper to format sizing values - adds 'px' if value is a number without unit.
 * Useful for width, height, minWidth, maxWidth, minHeight, maxHeight, etc.
 * @param value - The sizing value (string or number)
 * @returns The formatted value with 'px' suffix if purely numeric, or undefined if empty
 */
export const formatSizingValue = (value: string | number | undefined): string | number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const strValue = String(value).trim();
  // If it's purely numeric, add 'px'
  if (/^\d+(\.\d+)?$/.test(strValue)) {
    return `${strValue}px`;
  }
  return strValue;
};
