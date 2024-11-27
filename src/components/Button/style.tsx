import { StyleSheet } from "react-native";
import dims from "../../utils/dims";
import { globalColors } from "../../styles/styles";

export const ColorsVariant = {
  dark: {
    color: "#ffffff",
    background: "#2b2b2b",
    disabledColor: "",
    disabledBackground: ""
  },

  light: {
    color: "#000000",
    background: "#ffffff",
    disabledColor: "#686868",
    disabledBackground: "#e0e0e0"
  },

  pink: {
    color: "#ffffff",
    background: globalColors.pink,
    disabledColor: "#ffffff",
    disabledBackground: globalColors.pink
  },

  darkPurple: {
    color: "#ffffff",
    background: "#5b2463",
    disabledColor: "",
    disabledBackground: ""
  },


  lightPurple: {
    color: "#ffffff",
    background: "#b251be",
    disabledColor: "",
    disabledBackground: ""
  }
};

export const ButtonStyles = StyleSheet.create({
  container: {
    width: "auto",

    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ffffff",

    borderRadius: dims.getSize(5),

    paddingVertical: dims.getSize(4),
    paddingHorizontal: dims.getSize(4),

    marginBottom: dims.getSize(4)
  }
});