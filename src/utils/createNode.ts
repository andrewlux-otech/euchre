import { Node, Card } from "../types/mcts";

export function createNode(node: Node) {
  let turn = mod(node.state.turn - 1, 4);

  if (node.state.alone !== undefined && mod(turn - 2, 4) === node.state.alone) {
    turn = mod(turn - 1, 4);
  }
  return (card: Card) => ({
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
      up: node.state.up,
    },
    visits: 0,
    value: 0,
  });
}

function mod(m: number, n: number): number {
  return ((m % n) + n) % n;
}
