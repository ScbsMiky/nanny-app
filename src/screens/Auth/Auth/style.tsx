import { StyleSheet } from "react-native";
import dims from "../../../utils/dims";
import { globalColors, globalFontSize } from "../../../styles/styles";

export const AuthStyles = StyleSheet.create({
  container: {
    flex: 1,
  
    display: "flex",
    alignContent: "center",
    justifyContent: "center"
  },

  content: {
    width: dims.width * 0.75,

    marginLeft: "auto",
    marginRight: "auto"
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: globalColors.white,
    fontSize: globalFontSize.medium,
    marginBottom: dims.getSize(8),
  },

  forgot: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    color: globalColors.white,
    textAlign: "center"
  }
});