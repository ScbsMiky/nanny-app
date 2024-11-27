import { View } from "react-native";

import { CheckboxProps } from "./type";
import { CheckboxStyles } from "./style";

export default function Checkbox(props: CheckboxProps) {
  return (
    <View style={CheckboxStyles.container}>
      {props.children}      
    </View>
  );
};