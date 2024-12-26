import { Node, Card } from "../types/mcts";

export function backpropagate(
  currentNode: Node,
  root: Node,
  nodeList: Array<Card>,
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
      root.children.find(
        ({ id }) =>
          id === `${nodeList[index].rank[0]}${nodeList[index].suit[0]}`,
      ) ||
      (() => {
        throw new Error("bad propagate");
      })();

    // if (child === undefined) {
    //   child = createNode(root)(nodeList[index]);
    //   root.children.push(child);
    // }
    // root = child;

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
