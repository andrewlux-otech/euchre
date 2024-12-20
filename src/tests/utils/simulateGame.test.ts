import { simulateGame } from "../../utils/simulateGame";
import { Node } from "../../types/mcts";

describe("simulateGame Utility", () => {
  it("should simulate a terminal state and evaluate it", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        myHand: [],
        deck: [],
        myWins: 5,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result).toBe(4);
  });

  it("should simulate to a terminal state and evaluate it", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        myHand: [{ suit: "Diamonds", rank: "Jack" }],
        deck: [],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [
          { suit: "Hearts", rank: "Jack" },
          { suit: "Clubs", rank: "Jack" },
          { suit: "Spades", rank: "Jack" },
        ],
        turn: 0,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result).toBe(4);
  });
});
