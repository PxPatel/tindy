import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";
import { Card as CardType, SwipeResult } from "../types/types";

interface CardProps {
  card: CardType;
  onSwipe: (direction: SwipeResult, cardId: string) => Promise<void>;
}

const Card: React.FC<CardProps> = ({ card, onSwipe }) => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 120) {
          onSwipe(SwipeResult.LIKE, card.id);
          Animated.spring(pan, {
            toValue: { x: 500, y: 0 },
            useNativeDriver: false,
          }).start(() => pan.setValue({ x: 0, y: 0 }));
        } else if (gestureState.dx < -120) {
          onSwipe(SwipeResult.DISLIKE, card.id);
          Animated.spring(pan, {
            toValue: { x: -500, y: 0 },
            useNativeDriver: false,
          }).start(() => pan.setValue({ x: 0, y: 0 }));
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.card, { transform: pan.getTranslateTransform() }]}
    >
      <Image source={{ uri: card.image }} style={styles.image} />
      <Text style={styles.title}>{card.trackName}</Text>
      <Text style={styles.description}>{card.albumName}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default Card;
