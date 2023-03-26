export const isDark = (hexCode: string) => {
  const hexCodeWithoutHash = hexCode.replace('#', '');

  const r = parseInt(hexCodeWithoutHash.substring(0, 2), 16);
  const g = parseInt(hexCodeWithoutHash.substring(2, 4), 16);
  const b = parseInt(hexCodeWithoutHash.substring(4, 6), 16);

  // Calculate the luminance using the formula for relative luminance in WCAG 2.0
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // If the luminance is less than 128, the color is considered dark
  return luminance < 128;
};
