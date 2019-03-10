import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

const inputClearText = require("../../../assets/images/clear_text.png");

const ClearText = ({ onPress }) => {
  const { containerStyle, clearText } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Image style={clearText} source={inputClearText} />
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 2,
    alignSelf: "flex-end",
    marginRight: 0
  },
  clearText: {
    alignSelf: "flex-end",
    marginBottom: 15
  }
};

export { ClearText };
