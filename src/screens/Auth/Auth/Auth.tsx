import { useContext, useEffect } from "react";

import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../../../components/Button/Button";

import useRequest, { apiUrl } from "../../../hooks/UseRequest/UseRequest";

import { AccountContext } from "../../../contexts/accounts";

import { AuthStyles } from "./style";
import { globalColors, globalFontSize } from "../../../styles/styles";

export default function AuthScreen({ navigation }: NativeStackScreenProps<any>) {
  const account = useContext(AccountContext);

  const { setLoading, setError, loading, content, submit } = useRequest({
    url: `${apiUrl}/api/account/signin`,
    method: "POST",
    state: { account: undefined },
    onContent(content) {
      account.update(content.account);

      navigation.push("home");
    }
  });

  useEffect(( ) => {
    setLoading(true);

    AsyncStorage.getItem("authorization", (err, result) => {
      if(err) {
        setError(err.message);
        return;
      };

      if(!result) {
        return;
      };

      submit({ headers: { authorization: result } });
    }).finally(( ) => setLoading(false));
  }, [ ]);

  return (
    <LinearGradient colors={[globalColors.pink, globalColors.darkPurple]} style={AuthStyles.container}>
      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Nanny</Text>

        {!loading
          ? <>
              <Button onClick={( ) => navigation.navigate("auth-login")} label="Entrar" />
              <Button onClick={( ) => navigation.navigate("auth-signup")} label="Criar conta" />
            </>
          : <>
              <ActivityIndicator size={globalFontSize.medium} color={globalColors.darkPink} />
            </>
          }

        <View onTouchEnd={( ) => navigation.navigate("home")}>
          <Text style={AuthStyles.forgot}>Entrar sem conta</Text>
        </View>
      </View>
    </LinearGradient>
  );
};