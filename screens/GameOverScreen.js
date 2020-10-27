import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import BodyText from "../components/BodyFont";
import Colors from "../constants/Colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <BodyText style={styles.gameOverTitle}>The Game is Over!</BodyText>
      <BodyText style={styles.title}>
        Number of rounds: {props.roundsNumber}
      </BodyText>
      <BodyText style={styles.title}>Number was: {props.userNumber}</BodyText>
      <Button
        title="New game"
        onPress={props.restartGame}
        color={Colors.secondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverTitle: {
    fontSize: 32,
    marginBottom: 20,
    color: Colors.primary,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default GameOverScreen;
