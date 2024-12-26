import { Node, Card } from "../types/mcts";
import { isLeft } from "./isLeft";
import { createNode } from "./createNode";

export function expandNode(node: Node): Node {
  // const childFilter = (card: Card) =>
  //   node.children.find(
  //     (child) => child.id === `${card.rank[0]}${card.suit[0]}`,
  //   ) === undefined;

  const childMap = createNode(node);

  if (node.state.trick.length === 0) {
    return {
      ...node,
      children: node.state.hands[node.state.turn]!.map(childMap),
    } as Node;
  }
  const leadIsLeft = isLeft(node.state.trump, node.state.trick[0]);

  const playerIsVoid =
    node.state.trick.length === 0 ||
    node.state.hands[node.state.turn]!.filter((card) =>
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
      children: node.state.hands[node.state.turn]!.map(childMap),
    } as Node;
  }

  return {
    ...node,
    children: node.state.hands[node.state.turn]!.filter((card) =>
      followsSuit(
        leadIsLeft,
        node.state.trick[0],
        node.state.trump,
        isLeft(node.state.trump, card),
        card,
      ),
    ).map(childMap),
  } as Node;
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
