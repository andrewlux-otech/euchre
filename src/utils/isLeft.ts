import { Card } from "../types/mcts";

export function isLeft(trump: string, card: Card): boolean {
  return (
    card.rank === "Jack" &&
    ((trump === "Diamonds" && card.suit === "Hearts") ||
      (trump === "Hearts" && card.suit === "Diamonds") ||
      (trump === "Clubs" && card.suit === "Spades") ||
      (trump === "Spades" && card.suit === "Clubs"))
  );
}
