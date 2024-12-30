import { useState, useCallback } from "react";
import { getTopTracks } from "@/services"; // API function
import { Card } from "../types/types";

interface UseFetchCardsResult {
  cards: Card[];
  loading: boolean;
  error: string | null;
  getCards: () => Promise<void>;
  resetCards: () => void;
}

export const useFetchCards = (email: string): UseFetchCardsResult => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cards function
  const getCards = useCallback(async () => {
    console.log("getCards called");
    setLoading(true);
    setError(null);
    try {
      //   debugger; // Set a breakpoint here
      const fetchedCards = await getTopTracks(email); // Call your API
      setCards(fetchedCards);
    } catch (err) {
      setError("Failed to load cards. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Reset cards function
  const resetCards = useCallback(() => {
    setCards([]);
  }, []);

  return {
    cards,
    loading,
    error,
    getCards,
    resetCards,
  };
};
