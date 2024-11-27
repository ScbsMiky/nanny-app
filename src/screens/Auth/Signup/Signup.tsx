import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import dims from "../../../utils/dims";

import { AuthStyles } from "./../Auth/style";
import { globalColors, globalFontSize } from "../../../styles/styles";

import { checkIfHasEmptyField } from "../../../libs/util";
import useRequest, { apiUrl } from "../../../hooks/UseRequest/UseRequest";
import Input from "../../../components/Input/Input";
import Switch from "../../../components/Switch/Switch";
import Button from "../../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountContext } from "../../../contexts/accounts";

export default function SignupScreen({ navigation }: NativeStackScreenProps<any>) {
  const account = useContext(AccountContext);

  const { setError, setLoading, submit, loading, error } = useRequest({
    url: `${apiUrl}/api/account/create`,
    method: "POST",
    state: {
      account: undefined,
      authorization: ""
    },
    onContent(content) {
      setLoading(true);

      AsyncStorage.setItem("authorization", content.authorization, (err) => {
        if(err) {
          setError(err.message);
          return;
        };

        account.update(content.account);

        navigation.navigate("profile");
      }).finally(( ) => setLoading(false));
    },
  });

  const [canSubmit, setCanSubmit] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  
  const [accountFields, setAccountFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",

    rg: "",
    cpf: "",
    gender: "female",
    birthDate: "11/10/2024",
    
    isNanny: false,

    address: {
      city: "",
      state: "",
      number: "",
      street: "",
      landmark: "",
      neighborhood: "",
    }
  });

  const handleChangeValue = (name: string, content: string | boolean) => {
    if(name.startsWith("address")) {
      name = name.split(".")[1]!;
      // @ts-ignore
      accountFields.address[name] = content;
    } else {
      // @ts-ignore
      accountFields[name] = content;
    };

    setAccountFields({ ...accountFields });

    setCanSubmit(checkIfHasEmptyField(accountFields));
  };

  const handleSubmit = ( ) => {
    setCurrentScreen(currentScreen == 0 ? 1 : currentScreen == 1 ? 2 : 2);

    if(!checkIfHasEmptyField(accountFields)) {
      setError("Preencha todos os campos");
      return;
    };

    submit({ body: accountFields });
  };

  return (
    <LinearGradient colors={[globalColors.pink, globalColors.darkPurple]} style={AuthStyles.container}>
      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Nanny</Text>

        <View style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "space-between" }}>
          <View onTouchEnd={( ) => setCurrentScreen(0)}>
            <Text style={{ color: currentScreen == 0 ? globalColors.white : globalColors.pink }}>Conta</Text>
          </View>

          <View style={{ width: dims.getSize(2.1), backgroundColor: globalColors.darkPink }}/>

          <View onTouchEnd={( ) => setCurrentScreen(1)}>
            <Text style={{ color: currentScreen == 1 ? globalColors.white : globalColors.pink }}>Pessoal</Text>
          </View>

          <View style={{ width: dims.getSize(2.1), backgroundColor: globalColors.darkPink }}/>

          <View onTouchEnd={( ) => setCurrentScreen(2)}>
            <Text style={{ color: currentScreen == 2 ? globalColors.white : globalColors.pink }}>Endereço</Text>
          </View>
        </View>

        <View style={{ marginTop: dims.getSize(4) }} />

        <View style={{ display: currentScreen == 0 ? undefined : "none" }}>
          <Input onChange={(text) => handleChangeValue("email", text)} value={accountFields.email} label="E-mail" />
          <Input onChange={(text) => handleChangeValue("password", text)} value={accountFields.password} label="Senha" type="password" />

          <Switch
            value={accountFields.isNanny ? 0 : 1}
            
            firstLabel="Sou babá"
            secondLabel="Quero uma babá"

            onChange={(index) => handleChangeValue("isNanny", index == 0)}
          />
        </View>

        <View style={{ display: currentScreen == 1 ? undefined : "none" }}>
          <Input onChange={(text) => handleChangeValue("name", text)} value={accountFields.name} label="Nome completo" />
          <Input onChange={(text) => handleChangeValue("phone", text)} value={accountFields.phone} label="Numero de celular" />
          <Input onChange={(text) => handleChangeValue("cpf", text)} value={accountFields.cpf} type="number" label="CPF" />
          <Input onChange={(text) => handleChangeValue("rg", text)} value={accountFields.rg} type="number" label="RG" />
          <Input onChange={(text) => handleChangeValue("birthDate", text)} value={accountFields.birthDate} type="date" label="Data de Nascimento" />
          
          <Switch
            value={accountFields.gender == "male" ? 0 : 1}
            firstLabel="Homem"
            secondLabel="Mulher"
            onChange={(index) => handleChangeValue("gender", index == 0 ? "male" : "female")}
          />
        </View>
      
        <View style={{ display: currentScreen == 2 ? undefined : "none" }}>
          <Input onChange={(text) => handleChangeValue("address.street", text)} value={accountFields.address.street} label="Rua" />
          <Input onChange={(text) => handleChangeValue("address.neighborhood", text)} value={accountFields.address.neighborhood} label="Bairro" />
          
          <Input onChange={(text) => handleChangeValue("address.city", text)} value={accountFields.address.city} label="Cidade" />
          <Input onChange={(text) => handleChangeValue("address.state", text)} value={accountFields.address.state} label="Estado" />

          <Input onChange={(text) => handleChangeValue("address.number", text)} value={accountFields.address.number} label="Numero" />
          <Input onChange={(text) => handleChangeValue("address.landmark", text)} value={accountFields.address.landmark} label="Referencia" />

          <Text style={{ marginTop: dims.getSize(4), fontSize: globalFontSize.verySmall, color: globalColors.darkPink }}>Apenas sua cidade e estado ficara visivel aos outros usuarios. Precisamos desses dados para manter a segurança dos outros usuarios.</Text>
        </View>

        <View style={{ marginTop: dims.getSize(4) }} />

        <Button onClick={handleSubmit} label={canSubmit ? "Criar" : "Proximo"} />
        <Button onClick={( ) => navigation.navigate("auth")} disable={loading} label="Voltar" />

        {error ? <Text style={{ color: globalColors.darkPink, fontSize: globalFontSize.small, textAlign: "center" }}>{error}</Text> : <></>}
      </View>
    </LinearGradient>
  );
};