import { Card } from "../types/mcts";

export function followsSuit(
  leadIsLeft: boolean,
  lead: Card,
  trump: string,
  attemptIsLeft: boolean,
  card: Card,
): boolean {
  if (leadIsLeft) {
    return card.suit === trump;
  }

  return (
    (card.suit === lead.suit && !attemptIsLeft) ||
    (lead.suit === trump && attemptIsLeft)
  );
}
