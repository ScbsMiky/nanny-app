import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { ProfileStyles } from "./style";

import Frame from "../../components/Frame/Frame";
import Stars from "../../components/Stars/Stars";
import Switch from "../../components/Switch/Switch";
import useRequest, { apiUrl } from "../../hooks/UseRequest/UseRequest";
import dims from "../../utils/dims";
import { globalColors, globalFontSize, globalSpacings } from "../../styles/styles";
import { AccountData } from "../../types";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

ProfileScreen.About = function(props: { about: string; preferences: string[ ]; experiences: string[ ] }) {
  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>Sobre mim</Text>
      <Text>{props.about || "Esse usuario ainda não escreveu nada sobre ele"}</Text>
      <View style={{ marginBottom: dims.getSize(5) }} />

      <Text style={{ fontWeight: "bold" }}>Preferencias</Text>
      <Text>{props.about || "Esse usuario ainda não escreveu nenhuma preferencia"}</Text>
      <View style={{ marginBottom: dims.getSize(5) }} />

      <Text style={{ fontWeight: "bold" }}>Experiencias</Text>
      <Text>{props.about || "Esse usuario ainda não escreveu nenhuma experiencia"}</Text>
    </View>
  );
};

ProfileScreen.Personal = function(props: { account: AccountData }) {
  return (
    <View>
      <Text style={{ fontWeight: "bold", marginBottom: dims.getSize(4) }}>Publico</Text>
      <Input value={props.account.social.name} label="Nome" />
      <Input value={props.account.private.phone} label="Numero de celular" />
      
      <Switch
        firstLabel="Masculino"
        secondLabel="Feminino"
        value={props.account.social.gender == "male" ? 0 : 1}
      />

      <View style={{ marginBottom: dims.getSize(6) }} />

      <Text style={{ fontWeight: "bold", marginBottom: dims.getSize(4) }}>Privado</Text>
      <Input value={props.account.private.rg} label="RG" />
      <Input value={props.account.private.cpf} label="CPF" />

      <Input value={props.account.private.address.street} label="Rua" />
      <Input value={props.account.private.address.neighborhood} label="Bairro" />
      
      <Input value={props.account.private.address.city} label="Cidade" />
      <Input value={props.account.private.address.state} label="Estado" />

      <Input value={props.account.private.address.number} label="Numero" />
      <Input value={props.account.private.address.landmark} label="Referencia" />

      <Button containerStyle={{ paddingVertical: globalSpacings.normal }} textStyle={{ fontWeight: "normal" }} colorVariant="pink" label="Salvar" />
    </View>
  );
};

export default function ProfileScreen({ route }: { route: any }) {
  const accountData = useRequest({
    url: `${apiUrl}/api/account/fetch`,
    method: "GET",
    state: { account: undefined as any as AccountData }
  });

  const [currentSelection, setCurrentSelection] = useState<0 | 1>(0);

  useEffect(( ) => {
    if(route == undefined || route.params == undefined || route.params.id == undefined) {
      accountData.setError("Você precisa informar o ID do usuario que deseja buscar");

      return;
    };

    accountData.submit({ params: { id: route.params.id } });
  }, [ ]);

  return (
    <Frame>
      {
        accountData.loading
          ? <View><Text>Obtendo dados do usuario. . .</Text></View>
          : (accountData.error || (accountData.content.account == undefined || accountData.content.account == null))
            ? <View><Text>{accountData.error}</Text></View>
            : <View style={{ marginBottom: dims.getSize(8) }}>
                <View style={{ alignItems: "center", marginBottom: dims.getSize(8) }}>
                  <Image
                    width={dims.getSize(18)}
                    height={dims.getSize(18)}
                    style={{ borderRadius: 100 }}
                    source={{ uri: `${apiUrl}/avatars/${accountData.content.account.social.avatar}` }}
                  />
                  
                  <Text style={{ fontSize: globalFontSize.small, color: globalColors.purple }}>{accountData.content.account.social.name}</Text>
        
                  <Stars stars={[
                    accountData.content.account.nanny.rating.veryBad,
                    accountData.content.account.nanny.rating.bad,
                    accountData.content.account.nanny.rating.neutral,
                    accountData.content.account.nanny.rating.good,
                    accountData.content.account.nanny.rating.veryGood
                  ]} />
                </View>
        
                <Switch
                  firstLabel="Perfil"
                  secondLabel="Dados pessoais"
                  value={currentSelection}
                  onChange={(index) => setCurrentSelection(index as (0 | 1))}
                />
        
                <View style={{ marginBottom: dims.getSize(5) }} />
        
                {
                  currentSelection == 0
                    ? <ProfileScreen.About
                        about={accountData.content.account.social.about}
                        experiences={accountData.content.account.nanny.experiences.map((exp) => exp.with)}
                        preferences={[]}
                      />
                    : <ProfileScreen.Personal account={accountData.content.account} />
                }
              </View>
      }
    </Frame>
  );
};