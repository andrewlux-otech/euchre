import { Node } from "../types/mcts";
import { expandNode } from "./expandNode";
import { selectNode } from "./selectNode";
import { isLeft } from "./isLeft";

export function simulateGame(node: Node): number {
  let currentNode = node;

  while (currentNode.state.myWins + currentNode.state.myLosses !== 5) {
    currentNode = selectNode(expandNode(currentNode));

    if (
      currentNode.state.trick.length !== 4 &&
      (currentNode.state.trick.length !== 3 ||
        currentNode.state.alone === undefined)
    ) {
      continue;
    }

    let winner: number | undefined;

    winner = currentNode.state.trick.findIndex(
      ({ suit, rank }) => suit === currentNode.state.trump && rank === "Jack",
    );

    if (winner === undefined) {
      winner = currentNode.state.trick.findIndex((card) =>
        isLeft(currentNode.state.trump, card),
      );
    }

    if (winner === undefined) {
      winner = currentNode.state.trick
        .map((card, i) => ({
          card,
          i,
        }))
        .filter(({ card }) => card.suit === currentNode.state.trump)
        .sort((a, b) => {
          const ranks: Array<
            "Nine" | "Ten" | "Jack" | "Queen" | "King" | "Ace"
          > = ["Nine", "Ten", "Queen", "King", "Ace"];
          return (
            ranks.findIndex((rank) => rank === a.card.rank) -
            ranks.findIndex((rank) => rank === b.card.rank)
          );
        })[0]?.i;
    }

    if (winner === undefined) {
      winner = currentNode.state.trick
        .map((card, i) => ({
          card,
          i,
        }))
        .filter(({ card }) => card.suit === currentNode.state.trick[0].suit)
        .sort((a, b) => {
          const ranks: Array<
            "Nine" | "Ten" | "Jack" | "Queen" | "King" | "Ace"
          > = ["Nine", "Ten", "Jack", "Queen", "King", "Ace"];
          return (
            ranks.findIndex((rank) => rank === a.card.rank) -
            ranks.findIndex((rank) => rank === b.card.rank)
          );
        })[0]?.i;
    }

    if (winner === undefined) {
      throw new Error("cant determine winner");
    }

    if (currentNode.state.turn % 2 === 0) {
      // my team's lead
      if (winner % 2 === 0) {
        currentNode.state.myWins += 1;
      } else {
        currentNode.state.myLosses += 1;
      }
    } else {
      if (winner % 2 === 1) {
        currentNode.state.myWins += 1;
      } else {
        currentNode.state.myLosses += 1;
      }
    }
  }

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
}
