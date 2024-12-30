import { useFetchCards } from "@/hooks/useFetchCards";
import { Card } from "../types/types";

interface UseCardStateResult {
  cards: Card[];
  loading: boolean;
  error: string | null;
  getCards: () => Promise<void>;
  resetCards: () => void;
}

export const useCardState = (email: string): UseCardStateResult => {
  const { cards, loading, error, getCards, resetCards } = useFetchCards(email);

  return {
    cards,
    loading,
    error,
    getCards,
    resetCards,
  };
};
