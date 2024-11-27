import { Text, View } from "react-native";

import { HireStyles } from "./style";
import Frame from "../../components/Frame/Frame";
import Input from "../../components/Input/Input";
import dims from "../../utils/dims";
import Switch from "../../components/Switch/Switch";
import Button from "../../components/Button/Button";
import { globalSpacings } from "../../styles/styles";
import { useContext, useState } from "react";
import { AccountContext } from "../../contexts/accounts";

export default function HireScreen( ) {
  const account = useContext(AccountContext);

  const [serviceData, setServiceData] = useState({
    type: "child" as "child" | "old",
    date: "",
    quantity: 1,
    
    name: account.social.name,
    phone: account.private.phone,

    address: {
      ...account.private.address
    },

    duration: {
      hours: 0,
      minutes: 0
    },
  });

  return (
    <Frame>
      <View style={{ marginBottom: dims.getSize(8) }}>
        <Text style={{ fontWeight: "bold" }}>Informações</Text>

        <Switch
          firstLabel="Infantil"
          secondLabel="Geriátrico"
          value={serviceData.type == "child" ? 0 : 1}
        />

<View style={{ marginTop: dims.getSize(4) }} />

        <Input value={serviceData.date} type="date" label="Data" />
        <Input value={serviceData.quantity.toString( )} type="number" label="Quantidade" />

        <View>
          <Text>Duração</Text>

          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Input containerStyle={{ width: dims.width * 0.41 }} value={"0"} label="Horas" type="number" />
            <View style={{ padding: dims.getSize(4) }} />
            <Input containerStyle={{ width: dims.width * 0.41 }} value={"0"} label="Minutos" type="number" />
          </View>
        </View>

        <View style={{ marginBottom: dims.getSize(4) }} />

        <Text style={{ fontWeight: "bold" }}>Contratante</Text>
        
        <Input disable value={serviceData.name} label="Nome" />
        <Input disable value={serviceData.phone} label="Numero de celular" />

        <View style={{ marginTop: dims.getSize(4) }} />

        <Text style={{ fontWeight: "bold" }}>Endereço</Text>
        
        <Input disable value={serviceData.address.street} label="Rua" />
        <Input disable value={serviceData.address.neighborhood} label="Bairro" />
        
        <Input disable value={serviceData.address.city} label="Cidade" />
        <Input disable value={serviceData.address.state} label="Estado" />

        <Input disable value={serviceData.address.number} label="Numero" />
        <Input disable value={serviceData.address.landmark} label="Referencia" />

        <Button containerStyle={{ paddingVertical: globalSpacings.normal }} textStyle={{ fontWeight: "normal" }} colorVariant="pink" label="Salvar" />
      </View>
    </Frame>
  );
};