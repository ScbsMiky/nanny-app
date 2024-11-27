import { Text, View } from "react-native";

import { StarsProps } from "./type";
import { StarsStyles } from "./style";
import { SvgXml } from "react-native-svg";
import dims from "../../utils/dims";
import { useState } from "react";
import { weightedAverage } from "../../utils/util";
import { globalColors } from "../../styles/styles";

export default function Stars(props: StarsProps) {
  const [average] = useState(weightedAverage(...props.stars));

  return (
    <View style={StarsStyles.container}>
      <SvgXml color={average <= 1 ? globalColors.purple : "orange"} width={dims.getSize(6)} height={dims.getSize(6)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`} />
      <SvgXml color={average <= 2 ? globalColors.purple : "orange"} width={dims.getSize(6)} height={dims.getSize(6)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`} />
      <SvgXml color={average <= 3 ? globalColors.purple : "orange"} width={dims.getSize(6)} height={dims.getSize(6)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`} />
      <SvgXml color={average <= 4 ? globalColors.purple : "orange"} width={dims.getSize(6)} height={dims.getSize(6)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`} />
      <SvgXml color={average <= 5 ? globalColors.purple : "orange"} width={dims.getSize(6)} height={dims.getSize(6)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg>`} />
    
      <Text style={{ color: globalColors.purple }}>( {props.stars.reduce((length, num) => length + num, 0)} )</Text>
    </View>
  );
};