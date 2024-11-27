import { Image, Text, View } from "react-native";

import { ChatStyles } from "./style";
import Frame from "../../components/Frame/Frame";
import dims from "../../utils/dims";
import { globalColors, globalFontSize, globalSpacings } from "../../styles/styles";

ChatScreen.RecentChatBox = function(props: { name: string; avatar: string; lastMessage: string; timestamp: string; }) {
  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: globalSpacings.normal, paddingHorizontal: 0 }}>
      <View>
        <Image
          width={dims.getSize(10)}
          height={dims.getSize(10)}
          style={{ borderRadius: 100 }}
          source={{ uri: props.avatar }}
        />
      </View>

      <View style={{ marginVertical: "auto", marginLeft: globalSpacings.normal, marginRight: "auto" }}>
        <Text style={{ fontSize: globalFontSize.small, fontWeight: "bold", color: globalColors.purple }}>{props.name}</Text>
        <Text style={{ color: globalColors.purple }}>{props.lastMessage}</Text>
      </View>

      <View>
        <Text style={{ fontWeight: "bold", color: globalColors.purple }}>{props.timestamp}</Text>
      </View>
    </View>
  );
};

export default function ChatScreen( ) {
  return (
    <Frame>
      <View style={ChatStyles.container}>
        <Text style={{ fontWeight: "bold" }}>Conversas recentes</Text>
        <ChatScreen.RecentChatBox name="Gian" timestamp="14/11 as 12:51" lastMessage="Você: posso sim !" avatar="https://i.pinimg.com/736x/8a/f3/45/8af34588019b22ccf220c5e140212b6c.jpg" />
        <ChatScreen.RecentChatBox name="Sarah" timestamp="11/11 as 07:46" lastMessage="Você: hmm...hoje não vai dar...perdão" avatar="https://i.pinimg.com/736x/8a/f3/45/8af34588019b22ccf220c5e140212b6c.jpg" />
        <ChatScreen.RecentChatBox name="Teresa" timestamp="08/11 as 19:50" lastMessage="Teresa: Olá! Você ainda esta atendendo ?" avatar="https://i.pinimg.com/736x/8a/f3/45/8af34588019b22ccf220c5e140212b6c.jpg" />
        <ChatScreen.RecentChatBox name="Gislaine" timestamp="08/11 as 20:20" lastMessage="Gislaine: Obrigada !!!" avatar="https://i.pinimg.com/736x/8a/f3/45/8af34588019b22ccf220c5e140212b6c.jpg" />
      </View>
    </Frame>
  );
};