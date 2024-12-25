import { backpropagate } from "../../utils/backpropagate";
import { Node } from "../../types/mcts";

describe("backpropagate Utility", () => {
  it("should log the backpropagation result", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [[]],
        myWins: 5,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: undefined,
        myBid: true,
      },
    };

    const result = backpropagate(node, [node]);

    // Verify the result is as expected
    expect(result).toBe(false);
    expect(node.visits).toEqual(1);
    expect(node.value).toEqual(2);
  });

  it("should handle embedded nodes", () => {
    const child: Node = {
      id: "JD",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [[], [], [], []],
        myWins: 5,
        myLosses: 0,
        trump: "Diamonds",
        trick: [
          { suit: "Diamonds", rank: "Ten" },
          { suit: "Hearts", rank: "Jack" },
          { suit: "Clubs", rank: "Jack" },
          { suit: "Diamonds", rank: "Jack" },
        ],
        turn: 3,
        alone: undefined,
        myBid: true,
      },
    };

    const parent: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [child],
      state: {
        hands: [[{ suit: "Diamonds", rank: "Jack" }], [], [], []],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [
          { suit: "Diamonds", rank: "Ten" },
          { suit: "Hearts", rank: "Jack" },
          { suit: "Clubs", rank: "Jack" },
        ],
        turn: 0,
        alone: undefined,
        myBid: true,
      },
    };

    const result = backpropagate(child, [parent, child]);

    // Verify the result is as expected
    expect(result).toBe(false);
    expect(parent.visits).toEqual(1);
    expect(parent.value).toEqual(2);
    expect(child.visits).toEqual(1);
    expect(child.value).toEqual(2);
  });
});
