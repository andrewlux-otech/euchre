import { Node } from "../types/mcts";

export function backpropagate(
  currentNode: Node,
  nodeList: Array<Node>,
): boolean {
  if (currentNode.state.myWins + currentNode.state.myLosses !== 5) {
    return true;
  }
  const value = (() => {
    // Evaluate the terminal state
    if (currentNode.state.myWins === 5) {
      if (currentNode.state.myBid) {
        if (currentNode.state.alone !== undefined) {
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
      if (currentNode.state.alone !== undefined) {
        return -4;
      }
      return -2;
    }

    if (currentNode.state.myBid) {
      return -2;
    }
    return -1;
  })();

  nodeList.forEach((node) => {
    node.visits += 1;
    node.value += value;
  });

  return false;
}
