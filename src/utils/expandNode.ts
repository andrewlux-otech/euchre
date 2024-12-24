import { Node } from "../types/mcts";

export function expandNode(node: Node): Node {
  if (node.children.length !== 0) {
    return node;
  }

  let turn = mod(node.state.turn - 1, 4);

  if (node.state.alone !== undefined && mod(turn - 2, 4) === node.state.alone) {
    turn = mod(turn - 1, 4);
  }

  return {
    ...node,
    children: node.state.hands[node.state.turn].map((card) => ({
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
    })),
  } as Node;
}

function mod(m: number, n: number) {
  return ((m % n) + n) % n;
}
