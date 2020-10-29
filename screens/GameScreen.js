import React, { useState, useRef, useEffect } from "react";
import { Alert, StyleSheet, View, Dimensions } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyFont";
import OwnButton from "../components/OwnButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 10
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get("window").height);
      setButtonWidth(Dimensions.get("window").width / 10);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nxtNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nxtNumber);
    setRounds((curRounds) => curRounds + 1);
  };

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <BodyText>Opponent's Guess</BodyText>
        <View style={styles.controls}>
          <View style={{ width: buttonWidth }}>
            <OwnButton
              title={<Ionicons name="md-remove" size={24} color="white" />}
              onPress={nextGuessHandler.bind(this, "lower")}
            />
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={{ width: buttonWidth }}>
            <OwnButton
              title={<Ionicons name="md-add" size={24} color="white" />}
              onPress={nextGuessHandler.bind(this, "higher")}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={{ width: buttonWidth }}>
          <OwnButton
            title={<Ionicons name="md-remove" size={24} color="white" />}
            onPress={nextGuessHandler.bind(this, "lower")}
          />
        </View>
        <View style={{ width: buttonWidth }}>
          <OwnButton
            title={<Ionicons name="md-add" size={24} color="white" />}
            onPress={nextGuessHandler.bind(this, "higher")}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 20,
    width: "70%",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "50%",
  },
});

export default GameScreen;
