import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BodyText from "../components/BodyFont";
import Colors from "../constants/Colors";
import OwnButton from "../components/OwnButton";

const GameOverScreen = (props) => {
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 2
  );
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 2);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });
  return (
    <ScrollView>
      <View style={styles.screen}>
        <BodyText style={styles.gameOverTitle}>The Game is Over!</BodyText>
        <Image
          source={require("../assets/success.png")}
          style={styles.image}
          resizeMode={"contain"}
        />
        <BodyText style={styles.title}>
          Your phone needed{" "}
          <Text style={styles.highlightText}>{props.roundsNumber}</Text> rounds
          to guess the number{" "}
          <Text style={styles.highlightText}>{props.userNumber}</Text>
        </BodyText>
        <View style={{ width: buttonWidth }}>
          <OwnButton
            title="New game"
            onPress={props.restartGame}
            color={Colors.secondary}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  gameOverTitle: {
    fontSize: 32,
    color: Colors.primary,
  },
  title: {
    fontSize: 24,
    margin: 30,
    textAlign: "center",
  },
  image: {
    height: Dimensions.get("window").height * 0.3,
    width: Dimensions.get("window").width * 0.8,
  },
  highlightText: {
    color: Colors.secondary,
    fontSize: 32,
  },
});

export default GameOverScreen;
