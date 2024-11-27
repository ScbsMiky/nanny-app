import { StyleProp, ViewStyle } from "react-native";
import { FontSizeVariant } from "../../styles/styles";
import { ColorsVariant } from "../Button/style";

export type InputProps = {
  label?: string;

  type?: "text" | "date" | "time" | "password" | "number";
  value?: string;

  disable?: boolean;
  
  sizeVariant?: FontSizeVariant;
  colorVariant?: keyof typeof ColorsVariant;

  containerStyle?: StyleProp<ViewStyle>;

  children?: JSX.Element | JSX.Element[ ];

  onChange?(text: string): void;
};