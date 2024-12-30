import { useState, useCallback } from "react";
import { saveSwipeResult } from "../services";
import { Card, SwipeResult } from "../types/types";

interface UseHandleSwipeResult {
  likedCards: Card[];
  dislikedCards: Card[];
  currentIndex: number;
  handleSwipe: (direction: SwipeResult, cardId: string) => Promise<void>;
  resetSwipes: () => void;
}

export const useHandleSwipe = (
  cards: Card[],
  email: string
): UseHandleSwipeResult => {
  const [likedCards, setLikedCards] = useState<Card[]>([]);
  const [dislikedCards, setDislikedCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handle swipe action
  const handleSwipe = useCallback(
    async (direction: SwipeResult, cardId: string) => {
      const currentCard = cards[currentIndex];
      if (!currentCard) return;

      const isSuccess: boolean = await saveSwipeResult(
        email,
        cardId,
        direction
      );

      if (!isSuccess) {
        console.warn("Failed to save swipe result");
        return;
      }

      if (direction === SwipeResult.LIKE) {
        setLikedCards((prev) => [...prev, currentCard]);
      } else {
        setDislikedCards((prev) => [...prev, currentCard]);
      }

      // Move to the next card
      setCurrentIndex((prev) => prev + 1);
    },
    [cards, currentIndex, email]
  );

  // Reset swipe-related states
  const resetSwipes = useCallback(() => {
    setLikedCards([]);
    setDislikedCards([]);
    setCurrentIndex(0);
  }, []);

  return {
    likedCards,
    dislikedCards,
    currentIndex,
    handleSwipe,
    resetSwipes,
  };
};
