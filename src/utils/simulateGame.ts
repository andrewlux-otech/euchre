import { Node } from "../types/mcts";
import { expandNode } from "./expandNode";
import { selectNode } from "./selectNode";

export function simulateGame(node: Node): number {
  let currentNode = node;

  while (currentNode.state.myWins + currentNode.state.myLosses !== 5) {
    currentNode = selectNode(expandNode(currentNode));

    if (currentNode.state.trick.length !== 4) {
      continue;
    }

    const winner = currentNode.state.trick.findIndex(
      ({ suit, rank }) => suit === currentNode.state.trump && rank === "Jack",
    );

    if (winner !== undefined) {
      if ((winner + currentNode.state.turn) % 2 === 0) {
        currentNode.state.myWins += 1;
      } else {
        currentNode.state.myLosses += 1;
      }
      continue;
    }
  }

  // Evaluate the terminal state
  if (currentNode.state.myWins === 5) {
    if (currentNode.state.myBid) {
      if (currentNode.state.alone) {
        return 4;
      }
      return 2;
    }
    return 2;
  }

  if (currentNode.state.myWins >= 3) {
    if (currentNode.state.myBid) {
      return 1;
    }
    return 2;
  }

  if (currentNode.state.myWins === 0) {
    if (currentNode.state.myBid) {
      return -2;
    }
    if (currentNode.state.alone) {
      return -4;
    }
    return -2;
  }

  if (currentNode.state.myBid) {

    return -2;
  }
  return -1;
}
