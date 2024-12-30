import { createContext, ReactNode, useContext } from "react";
import { useHandleSwipe } from "@/hooks/useHandleSwipe";
import { useCardState } from "../hooks/useCardState";
import { Card, SwipeResult } from "../types/types";

// Define the structure of the context state
interface SwipeContextState {
  cards: Card[];
  likedCards: Card[];
  dislikedCards: Card[];
  currentIndex: number;
  loading: boolean;
  error: string | null;
  getCards: () => Promise<void>;
  handleSwipe: (direction: SwipeResult, cardId: string) => Promise<void>;
  resetCards: () => void;
}

// Default context value
const defaultState: SwipeContextState = {
  cards: [],
  likedCards: [],
  dislikedCards: [],
  currentIndex: 0,
  loading: false,
  error: null,
  getCards: async () => {},
  handleSwipe: async () => {},
  resetCards: () => {},
};

// Create the context
const SwipeContext = createContext<SwipeContextState>(defaultState);

export const SwipeProvider = (props: { children: ReactNode }): JSX.Element => {
  const email = process.env.EMAIL ?? "";
  console.log("Email:", email);

  // Use the custom hooks
  const { cards, loading, error, getCards, resetCards } = useCardState(email);
  const { likedCards, dislikedCards, currentIndex, handleSwipe, resetSwipes } =
    useHandleSwipe(cards, email);

  // Combine resets
  const resetAll = () => {
    resetCards();
    resetSwipes();
  };

  return (
    <SwipeContext.Provider
      value={{
        cards,
        likedCards,
        dislikedCards,
        currentIndex,
        loading,
        error,
        getCards,
        handleSwipe,
        resetCards: resetAll,
      }}
    >
      {props.children}
    </SwipeContext.Provider>
  );
};

// Hook for using the SwipeContext
export const useSwipeContext = (): SwipeContextState => {
  const context = useContext(SwipeContext);
  if (!context) {
    throw new Error("useSwipeContext must be used within a SwipeProvider");
  }
  return context;
};
