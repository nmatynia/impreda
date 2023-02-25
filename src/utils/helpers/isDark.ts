export const isDark = (hexCode: string) => {
  // Remove the # character from the hexcode if it exists
  hexCode = hexCode.replace("#", "");

  // Convert the hexcode to RGB values
  let r = parseInt(hexCode.substring(0, 2), 16);
  let g = parseInt(hexCode.substring(2, 4), 16);
  let b = parseInt(hexCode.substring(4, 6), 16);

  // Calculate the luminance using the formula for relative luminance in WCAG 2.0
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // If the luminance is less than 128, the color is considered dark
  return luminance < 128;
}



