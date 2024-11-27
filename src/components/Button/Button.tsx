import { Text, View } from "react-native";

import { ButtonProps } from "./type";
import { globalFontSize } from "../../styles/styles";
import { ButtonStyles, ColorsVariant } from "./style";

export default function Button(props: ButtonProps) {
  const onClick = ( ) => {
    if(typeof props.onClick == "function" && !props.disable) {
      return props.onClick( );
    };
  };

  return (
    <View onTouchEnd={onClick} style={[ButtonStyles.container, { backgroundColor: ColorsVariant[props.colorVariant || "light"][props.disable ? "disabledBackground" : "background"] }, props.containerStyle]}>
      <Text
        style={[{ color: ColorsVariant[props.colorVariant || "light"][props.disable ? "disabledColor" : "color"], fontSize: globalFontSize[props.sizeVariant || "small"] }, props.textStyle]}
        children={props.label}
      />
    </View>
  );
};