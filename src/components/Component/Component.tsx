import { View } from "react-native";

import { ComponentProps } from "./type";
import { ComponentStyles } from "./style";

export default function Component(props: ComponentProps) {
  return (
    <View style={ComponentStyles}>
      {props.children}      
    </View>
  );
};