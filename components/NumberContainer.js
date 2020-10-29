import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  number: {
    color: Colors.secondary,
    fontSize: 52,
    fontFamily: "game-font",
  },
});

export default NumberContainer;
