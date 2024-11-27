import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { FontSizeVariant } from "../../styles/styles";

import { ColorsVariant } from "./style";

export type ButtonProps = {
  label?: string;

  disable?: boolean;
  
  sizeVariant?: FontSizeVariant;
  colorVariant?: keyof typeof ColorsVariant;

  textStyle?:  StyleProp<TextStyle>;
  containerStyle?:  StyleProp<ViewStyle>;
  
  onClick?( ): void;
  onHover?( ): void;
};