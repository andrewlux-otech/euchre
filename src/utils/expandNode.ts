import { Node } from "../types/mcts";

export function expandNode(node: Node): Node {
  if (!node) {
    throw new Error("Node cannot be null or undefined");
  }

  if (node.children.length === node.state.deck.length) {
    return node;
  }

  if (node.children.length !== 0) {
    throw new Error('unexpected state');
  }

  return {
    ...node,
    children: node.state.deck.map((card) => ({
      id: `${card.rank[0]}${card.suit[0]}`,
      children: [],
      state: node.state,
      visits: 0,
      value: 0,
    }))
  };
}