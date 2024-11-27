import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import dims from "../../../utils/dims";

import { AuthStyles } from "../Auth/style";
import { globalColors, globalFontSize } from "../../../styles/styles";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import useRequest, { apiUrl } from "../../../hooks/UseRequest/UseRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountContext } from "../../../contexts/accounts";

export default function PasswordForgotScreen({ navigation }: NativeStackScreenProps<any>) {
  const account = useContext(AccountContext);

  const { setError, setLoading, submit, loading, error } = useRequest({
    url: `${apiUrl}/api/account/forgot-password`,
    method: "POST",
    state: { validEmail: false, validCode: false, authorization: "", account: undefined },
    onContent(content) {
      if(content.validEmail && currentScreen == 0) {
        setCurrentScreen(1);
      };

      if(content.validCode && currentScreen == 1) {
        setCurrentScreen(2);
      };

      if(content.authorization) {
        setLoading(true);

        AsyncStorage.setItem("authorization", content.authorization, (err) => {
          if(err) {
            setError(err.message);
            return;
          };

          account.update(content.account);

          navigation.navigate("profile");
        }).finally(( ) => setLoading(false));
      };
    },
  });

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentScreen, setCurrentScreen] = useState(0);

  const handleSubmit = ( ) => {
    submit({
      body: {
        code,
        email,
        password,
        action: currentScreen == 0 ? "get-code" : currentScreen == 1 ? "set-code" : "set-password"
      }
    });
  };

  return (
    <LinearGradient colors={[globalColors.pink, globalColors.darkPurple]} style={AuthStyles.container}>
      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Nanny</Text>

        <View style={{ display: currentScreen == 0 ? undefined : "none" }}>
          <Input onChange={(text) => setEmail(text)} value={email} label="Email" />
          <Text style={{ fontSize: globalFontSize.verySmall, color: globalColors.white }}>Precisamos do seu e-mail para enviarmos um codigo de validação</Text>
        </View>

        <View style={{ display: currentScreen == 1 ? undefined : "none" }}>
          <Input onChange={(text) => setCode(text)} value={code} label="Codigo" />
          <Text style={{ fontSize: globalFontSize.verySmall, color: globalColors.white }}>Digite o codigo que enviamos para o seu e-mail</Text>
        </View>

        <View style={{ display: currentScreen == 2 ? undefined : "none" }}>
          <Input onChange={(text) => setPassword(text)} value={password} label="Nova senha" />
          <Text style={{ fontSize: globalFontSize.verySmall, color: globalColors.white }}>Digite a sua nova senha</Text>
        </View>
        
        <View style={{ marginBottom: dims.getSize(8) }} />

        {error ? <Text style={{ color: globalColors.darkPink, fontSize: globalFontSize.small, textAlign: "center" }}>{error}</Text> : <></>}

        <Button onClick={handleSubmit} disable={loading} label="Confirmar" />
      </View>
    </LinearGradient>
  );
};