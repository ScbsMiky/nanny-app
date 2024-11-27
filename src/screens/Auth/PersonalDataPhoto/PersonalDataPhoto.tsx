import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import dims from "../../../utils/dims";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { AuthStyles } from "../Auth/style";
import { globalColors } from "../../../styles/styles";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { PersonalDataPhotoStyles } from "./style";

export default function PersonalDataPhotoScreen( ) {
  const camera = useRef<CameraView>(null);

  const [rgBuffer, setRgBuffer] = useState("");
  const [cpfBuffer, setCpfBuffer] = useState("");

  const [currentScreen, setCurrentScreen] = useState(0);

  const [permission, requestPermission] = useCameraPermissions( );

  const handleSubmit = ( ) => {
    if(!camera.current) {
      return;
    };

    camera.current.takePictureAsync( )
      .then((picture) => {
        if(!picture) {
          return;
        };

        if(currentScreen == 0) {
          setCurrentScreen(1);
          setCpfBuffer(picture.uri);
        };

        if(currentScreen == 1) {
          setRgBuffer(picture.uri);
        };
      });
  };

  if(!permission) {
    return (
      <LinearGradient colors={[globalColors.pink, globalColors.darkPurple]} style={AuthStyles.container}>
        <View style={AuthStyles.content}>
          <Text style={AuthStyles.title}>Nanny</Text>

          <Text style={PersonalDataPhotoStyles.text}>Carregando camera. . .</Text>
        </View>
      </LinearGradient>
    );
  };

  if(!permission.granted) {
    return (
      <LinearGradient colors={[globalColors.pink, globalColors.darkPurple]} style={AuthStyles.container}>
        <View style={AuthStyles.content}>
          <Text style={AuthStyles.title}>Nanny</Text>

          <Text style={PersonalDataPhotoStyles.text}>Você precisa permitir que o aplicativo acesse a sua camera para que possamos prosseguir.</Text>

          <Button onClick={( ) => requestPermission( )} label="Conceder acesso" />
        </View>
      </LinearGradient>
    );
  };

  return (
    <LinearGradient colors={[globalColors.pink, globalColors.darkPurple]} style={AuthStyles.container}>
      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Nanny</Text>

        <Text style={PersonalDataPhotoStyles.text}>Coloque o seu {currentScreen == 0 ? "cpf" : "rg"} dentro da area a baixo.</Text>

        <CameraView ref={camera} style={PersonalDataPhotoStyles.camera} facing="back" />

        <View style={{ marginBottom: dims.getSize(6) }} />

        <Button onClick={handleSubmit} label="Proximo" />
      </View>
    </LinearGradient>
  );
};