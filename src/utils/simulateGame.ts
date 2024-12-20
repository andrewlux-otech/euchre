import { Node } from "../types/mcts";
import { expandNode } from "./expandNode";
import { selectNode } from "./selectNode";

export function simulateGame(
  node: Node
): number {
  let currentNode = node;

  while (currentNode.state.myWins + currentNode.state.myLosses !== 5) {
    currentNode = selectNode(expandNode(currentNode));

    if (currentNode.state.myHand[0].rank === 'Ace') {
      currentNode.state.myWins += 1;
    } else {
      currentNode.state.myLosses += 1;
    }
  }

  // Evaluate the terminal state
  if (currentNode.state.myWins === 5) {
    return 4;
  }

  if (currentNode.state.myWins >= 3) {
    return 1;
  }

  return -1;
}
