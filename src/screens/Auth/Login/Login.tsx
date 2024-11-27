import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import useRequest, { apiUrl } from "../../../hooks/UseRequest/UseRequest";

import dims from "../../../utils/dims";

import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

import { AuthStyles } from "./../Auth/style";
import { globalColors, globalFontSize } from "../../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountContext } from "../../../contexts/accounts";

export default function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
  const account = useContext(AccountContext);

  const [loginData, setLoginData] = useState({ password: "", email: "" });

  const { setLoading, setError, error, loading, submit } = useRequest({
    url: `${apiUrl}/api/account/signin`,
    method: "POST",
    state: { authorization: "", account: undefined },
    onContent(content) {
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

  return (
    <LinearGradient colors={[globalColors.pink, globalColors.darkPurple]} style={AuthStyles.container}>
      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Nanny</Text>

        <Input onChange={(text) => setLoginData({ ...loginData, email: text })} label="E-mail" />
        <Input onChange={(text) => setLoginData({ ...loginData, password: text })} label="Senha" type="password" />

        <View style={{ marginBottom: dims.getSize(6) }} />

        <Button onClick={( ) => submit({ body: loginData })} disable={loading} label="Entrar" />
        <Button onClick={( ) => navigation.navigate("auth")} disable={loading} label="Voltar" />

        {error ? <Text style={{ color: globalColors.darkPink, fontSize: globalFontSize.small, textAlign: "center" }}>{error}</Text> : <></>}

        <View style={AuthStyles.forgot}>
          <Text style={{ fontSize: globalFontSize.small, color: globalColors.white, marginRight: dims.getSize(4) }}>Esqueceu a senha ?</Text>

          <View onTouchEnd={( ) => navigation.push("auth-password-forgot")} style={AuthStyles.forgot}>
            <Text style={{ fontWeight: "bold", fontSize: globalFontSize.small, color: globalColors.pink }}>Clique aqui</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};