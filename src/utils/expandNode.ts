import { Node, Card } from "../types/mcts";
import { isLeft } from "./isLeft";

export function expandNode(node: Node): Node {
  if (node.children.length !== 0) {
    return node;
  }

  let turn = mod(node.state.turn - 1, 4);

  if (node.state.alone !== undefined && mod(turn - 2, 4) === node.state.alone) {
    turn = mod(turn - 1, 4);
  }

  const childMap = (card: Card) => ({
    id: `${card.rank[0]}${card.suit[0]}`,
    children: [],
    state: {
      hands: node.state.hands.map((hand) =>
        hand.filter(
          (myCard) => card.suit !== myCard.suit || card.rank !== myCard.rank,
        ),
      ),
      myWins: node.state.myWins,
      myLosses: node.state.myLosses,
      trump: node.state.trump,
      turn,
      trick: [...node.state.trick, card],
      alone: node.state.alone,
      myBid: node.state.myBid,
    },
    visits: 0,
    value: 0,
  });

  if (node.state.trick.length === 0) {
    return {
      ...node,
      children: node.state.hands[node.state.turn].map(childMap),
    } as Node;
  }
  const leadIsLeft = isLeft(node.state.trump, node.state.trick[0]);

  const playerIsVoid =
    node.state.trick.length === 0 ||
    node.state.hands[node.state.turn].filter((card) =>
      followsSuit(
        leadIsLeft,
        node.state.trick[0],
        node.state.trump,
        isLeft(node.state.trump, card),
        card,
      ),
    ).length === 0;

  if (playerIsVoid) {
    return {
      ...node,
      children: node.state.hands[node.state.turn].map(childMap),
    } as Node;
  }

  return {
    ...node,
    children: node.state.hands[node.state.turn]
      .filter((card) =>
        followsSuit(
          leadIsLeft,
          node.state.trick[0],
          node.state.trump,
          isLeft(node.state.trump, card),
          card,
        ),
      )
      .map(childMap),
  } as Node;
}

function mod(m: number, n: number): number {
  return ((m % n) + n) % n;
}

function followsSuit(
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
