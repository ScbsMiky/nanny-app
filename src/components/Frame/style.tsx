import { StyleSheet } from "react-native";

import dims from "../../utils/dims";

import { globalColors, globalFontSize, globalSpacings } from "../../styles/styles";

export const FrameStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const FrameMenuStyles = StyleSheet.create({
  text: {
    color: globalColors.darkPurple,
    padding: globalSpacings.normal,
    fontSize: globalFontSize.small,
  },

  blur: {
    position: "absolute",

    width: dims.width,
    height: dims.height,

    zIndex: 1,

    backgroundColor: "#0c0c0c55",
  },

  container: {
    position: "absolute",

    display: "flex",
    flexDirection: "column",

    alignItems: "center",

    top: 0,
    left: 0,
    zIndex: 1,

    width: (dims.width * 0.78),
    height: (dims.height),

    borderTopRightRadius: dims.getSize(8),
    borderBottomRightRadius: dims.getSize(6),

    backgroundColor: globalColors.darkPink,
    borderRightColor: globalColors.purple,
    borderRightWidth: dims.getSize(1)
  }
});

export const FrameHeaderStyles = StyleSheet.create({
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },

  container: {
    flex: 0.1,

    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: dims.getSize(4),

    backgroundColor: globalColors.darkPink,

    borderBottomLeftRadius: dims.getSize(7),
    borderBottomRightRadius: dims.getSize(7)
  }
});

export const FrameFooterStyles = StyleSheet.create({
  icon: {
    display: "flex",
    flexDirection: "row",

    marginVertical: "auto",

    alignContent: "center",
    justifyContent: "center",

    width: dims.getSize(10),
    height: dims.getSize(10)
  },

  container: {
    flex: 0.1,

    display: "flex",
    flexDirection: "row",

    justifyContent: "space-around",

    backgroundColor: globalColors.darkPink,

    borderTopLeftRadius: dims.getSize(7),
    borderTopRightRadius: dims.getSize(7)
  }
})
export const FrameContentStyles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: dims.getSize(globalSpacings.normal),
    paddingHorizontal: dims.getSize(globalSpacings.normal)
  }
});