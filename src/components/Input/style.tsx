import { StyleSheet } from "react-native";

import dims from "../../utils/dims";
import { globalColors, globalFontSize } from "../../styles/styles";

export const InputStyles = StyleSheet.create({
  container: {
    width: "auto",
    position: "relative",

    borderRadius: dims.getSize(5),
    marginBottom: dims.getSize(4),

    paddingBottom: 0,
    paddingVertical: dims.getSize(5.5),
    paddingHorizontal: dims.getSize(4.5),
  },

  content: {
    width: "auto"
  },

  label: {
    position: "absolute",
    pointerEvents: "none",

    color: globalColors.black,
    
    top: dims.getSize(4.3),
    left: dims.getSize(4.5),

    fontSize: dims.getSize(5.6),
  },

  input: {
    top: -dims.getSize(3)
  },

  labelBlur: {
    top: -dims.getSize(1),
    color: globalColors.grey,
    fontSize: dims.getSize(4.8),
  }
});