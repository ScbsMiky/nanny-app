import { Image, ScrollView, Text, View } from "react-native";

import { FrameProps } from "./type";
import { FrameContentStyles, FrameFooterStyles, FrameHeaderStyles, FrameMenuStyles, FrameStyles } from "./style";
import { SvgXml } from "react-native-svg";
import dims from "../../utils/dims";
import { globalColors, globalFontSize, globalSpacings } from "../../styles/styles";
import { useContext, useState } from "react";
import { BlurView } from "expo-blur";
import { navigate, navigateBack } from "../../utils/navigate";
import { AccountContext } from "../../contexts/accounts";
import { apiUrl } from "../../hooks/UseRequest/UseRequest";

Frame.Menu = function(props: { onMenuClose( ): void; isOpen: boolean }) {
  return (
    <>
      <BlurView onTouchEnd={( ) => props.onMenuClose( )} intensity={40} tint="dark" style={[FrameMenuStyles.blur, { display: props.isOpen ? "flex" : "none" }]} />

      <View style={[FrameMenuStyles.container, { display: props.isOpen ? "flex" : "none" }]}>
        <View style={{ marginTop: dims.getSize(8), alignItems: "center" }}>
          <View onTouchEnd={( ) => navigate("profile")}>
            <Text style={FrameMenuStyles.text}>Perfil</Text>
          </View>
          <View onTouchEnd={( ) => navigate("chat-messages")}>
            <Text style={FrameMenuStyles.text}>Mensagens</Text>
          </View>
        </View>

        <View style={{ marginTop: "auto", alignItems: "center" }}>
          <View onTouchEnd={( ) => navigate("about-us")}>
            <Text style={FrameMenuStyles.text}>Sobre nos</Text>
          </View>
        </View>

        <View style={{ marginTop: dims.getSize(8), marginBottom: dims.getSize(8), alignItems: "center" }}>
          <View>
            <Text style={FrameMenuStyles.text}>Versão do APP: <Text style={{ fontWeight: "bold" }}>0.0.1</Text></Text>
          </View>
        </View>
      </View>
    </>
  );
};

Frame.Header = function(props: { onMenuOpen( ): void; }) {
  const account = useContext(AccountContext);

  return (
    <View style={FrameHeaderStyles.container}>
      <View style={FrameHeaderStyles.content}>
        <View onTouchEnd={( ) => props.onMenuOpen( )} style={FrameFooterStyles.icon}>
          <SvgXml style={{ margin: "auto" }} color={globalColors.purple} width={dims.getSize(8)} height={dims.getSize(8)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>`} />
        </View>

        <View>
          <Text style={{ fontSize: globalFontSize.verySmall, color: globalColors.purple }}>Olá,</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: dims.getSize(22), fontSize: globalFontSize.small, fontWeight: "bold", color: globalColors.purple }}>{account.social.name}</Text>
        </View>
      </View>

      <View onTouchEnd={( ) => navigate("profile", { id: account.id })}>
        <Image
          width={dims.getSize(10)}
          height={dims.getSize(10)}
          style={{ borderRadius: 100 }}
          source={{ uri: `${apiUrl}/avatars/${account.social.avatar}` }}
        />
      </View>
    </View>
  );
};

Frame.Footer = function( ) {
  return (
    <View style={FrameFooterStyles.container}>
      <View onTouchEnd={( ) => navigateBack( )} style={FrameFooterStyles.icon}>
        <SvgXml style={{ margin: "auto" }} color={"white"} width={dims.getSize(9)} height={dims.getSize(10)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>`} />
      </View>

      <View onTouchEnd={( ) => navigate("home")} style={FrameFooterStyles.icon}>
        <SvgXml style={{ margin: "auto" }} color={"white"} width={dims.getSize(8)} height={dims.getSize(9)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22" /></svg>`} />
      </View>

      <View onTouchEnd={( ) => navigate("chat")} style={FrameFooterStyles.icon}>
        <SvgXml style={{ margin: "auto" }} color={"white"} width={dims.getSize(7)} height={dims.getSize(8)} xml={`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H5.2L4 17.2V4H20V16Z" /></svg>`} />
      </View>
    </View>
  );
};

Frame.Container = function(props: { children?: JSX.Element | JSX.Element[ ] }) {
  return (
    <ScrollView scrollEnabled style={FrameContentStyles.container}>
      {props.children}
    </ScrollView>
  );
};

export default function Frame(props: FrameProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={FrameStyles.container}>
      <Frame.Menu onMenuClose={( ) => setIsMenuOpen(false)} isOpen={isMenuOpen} />
      
      <Frame.Header onMenuOpen={( ) => setIsMenuOpen(true)} />

      <Frame.Container children={props.children} />

      <Frame.Footer />
    </View>
  );
};