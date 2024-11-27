import { Dimensions } from "react-native";

const window = Dimensions.get("window");

export default {
  font: window.fontScale,
  scale: window.scale,
  
  width: window.width,
  height: window.height,

  rem: window.width / Math.max(window.width, window.height),

  getSize(size: number) {
    return this.rem * (size ** 2);
  }
};