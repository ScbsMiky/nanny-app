import { useState } from "react";
import { View, Text } from "react-native";

import { SwitchStyles } from "./style";
import { DoubleCheckProps } from "./type";

import { globalColors } from "../../styles/styles";

import dims from "../../utils/dims";

Switch.Button = function(props: { onClick?( ): void; label: string; selected?: boolean, isLeft?: boolean, isRight?: boolean }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.selected ? globalColors.pink : "transparent",
        
        paddingVertical: dims.getSize(4.8),

        borderTopLeftRadius: props.isRight ? 0 : dims.getSize(5),
        borderBottomLeftRadius: props.isRight ? 0 : dims.getSize(5),
        borderTopRightRadius: props.isLeft ? 0 : dims.getSize(5),
        borderBottomRightRadius: props.isLeft ? 0 : dims.getSize(5)
      }} 

      onTouchEnd={( ) => typeof props.onClick == "function" ? props.onClick( ) : undefined}

      children={<Text children={props.label} style={{ textAlign: "center", color: props.selected ? globalColors.white : globalColors.black }} />}
    />
  );
};

export default function Switch(props: DoubleCheckProps) {
  const [currentCheck, setCurrentCheck] = useState(props.value || 0);

  return (
    <View style={SwitchStyles.container}>
      <Switch.Button onClick={( ) => { setCurrentCheck(0); if(typeof props.onChange == "function") props.onChange(0); }} label={props.firstLabel} selected={currentCheck == 0} isLeft />
      <Switch.Button onClick={( ) => { setCurrentCheck(1); if(typeof props.onChange == "function") props.onChange(1); }} label={props.secondLabel} selected={currentCheck == 1} isRight />
    </View>
  );
};