import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BodyFont = (props) => (
  <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  body: {
    fontSize: 24,
    fontFamily: "game-font",
  },
});

export default BodyFont;
