import { StyleSheet } from "react-native";
import { globalColors, globalFontSize } from "../../../styles/styles";
import dims from "../../../utils/dims";

export const PersonalDataPhotoStyles = StyleSheet.create({
  container: {
    
  },

  text: {
    color: globalColors.white,
    fontSize: globalFontSize.small,
    marginBottom: dims.getSize(6),
    textAlign: "center"
  },

  camera: {
    width: "auto",
    height: dims.getSize(20)
  }
});