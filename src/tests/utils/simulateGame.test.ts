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
        myHand: [{ suit: "Hearts", rank: "Ace"}],
        deck: [{ suit: "Hearts", rank: "Jack"}, { suit: "Clubs", rank: "Jack"}],
        myWins: 4,
        myLosses: 0,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result).toBe(4);
  });
});
