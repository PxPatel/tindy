import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSwipeContext } from "../../contexts/SwipeContext";
import Card from "../../components/Card";

const Dashboard: React.FC = () => {
  const { cards, currentIndex, loading, getCards, handleSwipe } =
    useSwipeContext();

  useEffect(() => {
    if (cards.length === 0) {
      console.log("Fetching cards...");
      getCards();
    }
  }, []);

  if (loading) return <div>Loading!</div>;

  const currentCard = cards[currentIndex];

  if (!currentCard)
    return <Text style={styles.noMoreCards}>No more cards!</Text>;

  return (
    <View style={styles.container}>
      <Card card={currentCard} onSwipe={handleSwipe} />
      {/* <SwipeFeedback card={currentCard} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMoreCards: {
    fontSize: 20,
    color: "#888",
  },
});

export default Dashboard;
