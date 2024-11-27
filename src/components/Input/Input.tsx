import { useRef, useState } from "react";
import { View, TextInput, Text } from "react-native";

import { InputProps } from "./type";
import { InputStyles } from "./style";
import DateTimePicker from "react-native-ui-datepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ColorsVariant } from "../Button/style";

Input.formatDuration = function(duration: number) {
  return `${Math.floor(duration / 60).toString( ).padStart(2, "0")}:${Math.floor(duration % 60).toString( ).padStart(2, "0")}`;
};

export default function Input(props: InputProps) {
  const ref = useRef<TextInput>(null);

  const [isFocus, setIsFocus] = useState((props.value && props.value.length != 0));
  const [isVisible, setIsVisible] = useState(false);
  const [textContent, setTextContent] = useState((props.type == "time" ? Input.formatDuration(Number(props.value || "")) : props.value || ""));

  const handleTouch = ( ) => {
    if(!ref.current || props.disable) {
      return;
    };

    ref.current.focus( );
    setIsFocus(true);

    if(props.type == "date") {
      let oldDate;

      // 00/00/0000
      if(textContent) {
        let [day, month, year] = textContent.split("/");

        oldDate = new Date(Number(year), Number(month) - 1, Number(day));
      
      };
      
      if(!oldDate || oldDate.toString( ) == "Invalid Date") {
        oldDate = new Date( );
      };

      DateTimePickerAndroid.open({
        value: oldDate,
        display: "calendar",
        onChange(event, date) {
          if(!date) {
            return;
          };

          let _date = `${date.getDate( ).toString( ).padStart(2, "0")}/${(date.getMonth( ) + 1).toString( ).padStart(2, "0")}/${date.getFullYear( )}`;
          setTextContent(_date);
          
          if(typeof props.onChange == "function") {
            props.onChange(date.toISOString( ));
          };
        }
      });
    };
  };

  return (
    <>
      <View onTouchEnd={handleTouch} style={[InputStyles.container, { backgroundColor: ColorsVariant[props.colorVariant || "light"][props.disable ? "disabledBackground" : "background"] }, props.containerStyle]}>
        {props.label ? <Text style={[InputStyles.label, isFocus ? InputStyles.labelBlur : undefined]}>{props.label}</Text> : <></>}

        <View style={InputStyles.content}>
          <TextInput
            ref={ref}
            style={[InputStyles.input, { color: ColorsVariant[props.colorVariant || "light"][props.disable ? "disabledColor" : "color"] }]}

            value={textContent}

            onBlur={( ) => setIsFocus(textContent.length != 0)}
            onFocus={( ) => setIsFocus(props.disable ? false : true)}

            readOnly={props.disable || props.type == "date"}

            secureTextEntry={props.type != "password" ? false : !isVisible}

            keyboardType={(props.type == "number" || props.type == "time") ? "numeric" : "default"}

            onChangeText={(text) => {
              if(props.type == "time") {
                setTextContent(Input.formatDuration(Number(text)));
              } else {
                setTextContent(text);
              };

              if(typeof props.onChange == "function") {
                props.onChange(text);
              };
            }}
          />
        </View>
      </View>
    </>
  );
};