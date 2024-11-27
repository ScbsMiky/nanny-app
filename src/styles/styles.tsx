import dims from "../utils/dims";

export const globalColors = {
  red: "#E42B59",
  grey: "#929292",
  pink: "#C6A5D4",
  black: "#867F8A",
  darkPink: "#C6A5D4",
  white: "#FFFFFF",
  purple: "#794b8b",
  darkPurple: "#4C2A59"
};

export const globalSpacings = {
  small: dims.getSize(2),
  normal: dims.getSize(4),
  medium: dims.getSize(6),
  larget: dims.getSize(8),
  bigger: dims.getSize(10)
};

export const globalFontSize = {
  small: dims.getSize(6),
  verySmall: dims.getSize(5.6),

  normal: dims.getSize(8),
  medium: dims.getSize(10),
  larger: dims.getSize(12),
  bigger: dims.getSize(14)
};

export type SpacingVariant = keyof typeof globalSpacings;
export type FontSizeVariant = keyof typeof globalFontSize;