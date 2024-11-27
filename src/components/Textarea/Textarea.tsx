import { View } from "react-native";

import { TextareaProps } from "./type";
import { TextareaStyles } from "./style";

export default function Textarea(props: TextareaProps) {
  return (
    <View style={TextareaStyles.container}>
      {props.children}      
    </View>
  );
};