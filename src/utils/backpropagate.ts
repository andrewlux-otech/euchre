import { Node } from "../types/mcts";

export function backpropagate(
  currentNode: Node,
  root: Node,
  nodeList: Array<string>,
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

  root.visits += 1;
  root.value += value;

  let index = 0;

  while (root.id !== currentNode.id) {
    root =
      root.children.find(({ id }) => id === nodeList[index]) ||
      (() => {
        throw new Error("problem backpropagating");
      })();

    root.visits += 1;

    if (root.state.turn % 2 === 1) {
      root.value += value;
    } else {
      root.value -= value;
    }
    index += 1;
  }

  return false;
}
