import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { HomeStyles } from "./style";

import Frame from "../../components/Frame/Frame";
import Switch from "../../components/Switch/Switch";
import dims from "../../utils/dims";
import { globalColors, globalFontSize, globalSpacings } from "../../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import useRequest, { apiUrl } from "../../hooks/UseRequest/UseRequest";
import { NannyData, WorkData } from "../../types";
import Button from "../../components/Button/Button";
import { navigate } from "../../utils/navigate";

HomeScreen.Profile = function(props: { isFirst?: boolean, isLast?: boolean, avatar: string; name: string }) {
  return (
    <View style={{ marginLeft: (!props.isFirst) ? dims.getSize(4) : 0, marginRight: (!props.isLast) ? dims.getSize(4) : 0 }}>
      <Image style={{ borderRadius: 100 }} source={{ uri: props.avatar, width: dims.getSize(12), height: dims.getSize(12) }} />
      <Text>{props.name}</Text>
    </View>
  );
};

HomeScreen.RecentWorks = function(props: { isLoading: boolean; works: WorkData[ ] }) {
  return (
    <View>
      <Text style={{ marginTop: dims.getSize(globalSpacings.small), fontWeight: "bold" }}>Trabalhos recentes</Text>
      
      {
        (props.isLoading)
          ? <Text>Carregando. . .</Text>
          : (props.works.length == 0)
            ? <Text>Nenhum trabalho foi publicado ate o momento</Text>
            : <></>
      }
    </View>
  );
};

HomeScreen.RecentNannies = function(props: { isLoading: boolean; nannies: NannyData[ ] }) {
  return (
    <View>
      <Text style={{ marginTop: dims.getSize(globalSpacings.small), fontWeight: "bold" }}>Babás recentes</Text>
            
      {
        (props.isLoading)
          ? <Text>Carregando. . .</Text>
          : (props.nannies.length == 0)
            ? <Text>Nenhuma babá se candidadou ate o momento</Text>
            : <></>
      }

      <View style={{ marginTop: dims.getSize(4) }} />

      <Button
        onClick={( ) => navigate("hire")}
        colorVariant="pink"
        sizeVariant="verySmall"
        label="Preciso de uma babá"
      />
    </View>
  );
};

HomeScreen.BestNannies = function(props: { isLoading: boolean; nannies: NannyData[ ] }) {
  return (
    <View style={{ borderBottomWidth: 2, paddingVertical: dims.getSize(5), borderBottomColor: globalColors.darkPink }}>
      <Text style={{ marginTop: dims.getSize(globalSpacings.small), fontWeight: "bold" }}>Babás recomendadas</Text>

      <ScrollView style={{ display: "flex", flexDirection: "row" }} horizontal>
        {
          props.nannies.length == 0
          ? <Text>Nenhuma bába encontrada</Text>
          : <>
              {props.nannies.map((nanny, index) => (
                <HomeScreen.Profile
                  key={index}

                  isLast={index == (props.nannies.length - 1)}
                  isFirst={index == 0}

                  name={nanny.name}
                  avatar={`${apiUrl}/avatars/${nanny.avatar}`}
                />
              ))}
            </>
        }
      </ScrollView>
    </View>
  );
};

export default function HomeScreen( ) {
  const bestNannies = useRequest({
    url: `${apiUrl}/api/nanny/best`,
    method: "GET",
    state: { nannies: [ ] as NannyData[ ] }
  });

  const recentNannies = useRequest({
    url: `${apiUrl}/api/nanny/recent`,
    method: "GET",
    state: { nannies: [ ] as NannyData[ ] }
  });

  const recentWorks = useRequest({
    url: `${apiUrl}/api/work/recent`,
    method: "GET",
    state: { works: [ ] as WorkData[ ] }
  });

  const [currentSelection, setCurrentSelection] = useState<0 | 1>(0);

  return (
    <Frame>
      <View style={HomeStyles}>
        <Switch
          firstLabel="Sou babá"
          secondLabel="Quero uma babá"
          value={currentSelection}
          onChange={(index) => setCurrentSelection(index as (0 | 1))}
        />

        <HomeScreen.BestNannies isLoading={recentNannies.loading} nannies={recentNannies.content.nannies} />

        <View style={{ position: "relative", display: "flex", flexDirection: "row", marginTop: dims.getSize(8) }}>
          <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: (dims.width - dims.getSize(22.4)) }}>
            <Text style={{ fontSize: globalFontSize.small }}>Buscando por uma <Text style={{ fontWeight: "bold" }}>{(currentSelection == 0) ? "oportunidade" : "babá"} ?</Text></Text>
            <Text style={{ fontSize: globalFontSize.small }}>Sinta-se a vontade em sua <Text style={{ fontWeight: "bold" }}>busca</Text></Text>
          </View>

          <View>
            <Image
              style={{
                width: dims.getSize(20),
                height: dims.getSize(20)
              }}
              source={require("../../../assets/fc7a9ef3cf3f3f7e6431a122e26e9143.png")}
            />
          </View>
        </View>
        
        {
          currentSelection == 1
            ? <HomeScreen.RecentNannies isLoading={bestNannies.loading} nannies={bestNannies.content.nannies} />
            : <HomeScreen.RecentWorks isLoading={recentWorks.loading} works={recentWorks.content.works} />
        }
      </View>
    </Frame>
  );
};