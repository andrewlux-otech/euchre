import { Node, Card } from "../types/mcts";
import { isLeft } from "./isLeft";
import { followsSuit } from "./followsSuit";
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
      children: node.state.hands[node.state.turn]!.map((card) =>
        childMap(card!),
      ),
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
        isLeft(node.state.trump, card!),
        card!,
      ),
    ).length === 0;

  if (playerIsVoid) {
    node.state.void = node.state.void.map((myVoid, i) => {
      if (i === node.state.turn) {
        return Array.from(
          new Set([
            ...myVoid,
            leadIsLeft ? node.state.trump : node.state.trick[0].suit,
          ]),
        ) as Array<Card["suit"]>;
      }

      return myVoid;
    });
    return {
      ...node,
      children: node.state.hands[node.state.turn]!.map((card) =>
        childMap(card!),
      ),
    } as Node;
  }

  return {
    ...node,
    children: node.state.hands[node.state.turn]!.filter((card) =>
      followsSuit(
        leadIsLeft,
        node.state.trick[0],
        node.state.trump,
        isLeft(node.state.trump, card!),
        card!,
      ),
    ).map((card) => childMap(card!)),
  } as Node;
}
