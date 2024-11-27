import { IMessageBoxProps } from "./type";

import { StyledMessageBox } from "./style";
import { Text, View } from "react-native";

MessageBox.Header = function(props: {}) { };

MessageBox.Timestamp = function(props: {}) { };

MessageBox.Content = function(props: {}) {
  return (
    <View>

    </View>
  );
};

MessageBox.Button = function(props: { onClick( ): void; label: string; }) {
  return (
    <View onTouchEnd={( ) => props.onClick( )}>
      <Text>{props.label}</Text>
    </View>
  );
};

export default function MessageBox(props: IMessageBoxProps) {
  return (
    <StyledMessageBox>
      
    </StyledMessageBox>
  );
};