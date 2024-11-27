import { StyleSheet } from "react-native";
import { globalColors } from "../../styles/styles";

import dims from "../../utils/dims";

export const SwitchStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",

    alignContent: "center",
    justifyContent: "space-between",

    borderRadius: dims.getSize(5),
    backgroundColor: globalColors.white,
  }
});