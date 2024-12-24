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

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result.state.myWins).toBe(5);
  });

  it("should simulate one card to a terminal state and evaluate it", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [[]],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [
          { suit: "Diamonds", rank: "Jack" },
          { suit: "Hearts", rank: "Jack" },
          { suit: "Clubs", rank: "Jack" },
          { suit: "Spades", rank: "Jack" },
        ],
        turn: 0,
        alone: undefined,
        myBid: true,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result.state.myWins).toBe(5);
  });

  it("should simulate one trick with my lead to a terminal state and evaluate it", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [
          [{ suit: "Diamonds", rank: "Jack" }],
          [{ suit: "Spades", rank: "Jack" }],
          [{ suit: "Clubs", rank: "Jack" }],
          [{ suit: "Hearts", rank: "Jack" }],
        ],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: undefined,
        myBid: true,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result.state.myWins).toBe(4);
  });

  it("should simulate alone hand and my lead to a terminal state and evaluate it", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [[], [], [], []],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [
          { suit: "Diamonds", rank: "Jack" },
          { suit: "Hearts", rank: "Jack" },
          { suit: "Clubs", rank: "Jack" }
        ],
        turn: 0,
        alone: 0,
        myBid: true,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result.state.myWins).toBe(5);
  });

  it("should simulate deep games", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [
          [],
          [],
          [],
          [],
        ],
        myWins: 0,
        myLosses: 3,
        trump: "Hearts",
        trick: [
          { suit: "Diamonds", rank: "Jack" },
          { suit: "Hearts", rank: "Jack" },
          { suit: "Diamonds", rank: "King" },
        ],
        turn: 0,
        alone: 1,
        myBid: false,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result.state.myLosses).toBe(4);
  });

  it("should handle euchres", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [
          [],
          [],
          [],
          [],
        ],
        myWins: 2,
        myLosses: 1,
        trump: "Hearts",
        trick: [
          { suit: "Hearts", rank: "Jack" },
          { suit: "Diamonds", rank: "Jack" },
          { suit: "Diamonds", rank: "King" },
        ],
        turn: 0,
        alone: 1,
        myBid: false,
      },
    };

    const result = simulateGame(node);

    // Verify the result is as expected
    expect(result.state.myWins).toBe(3);
  });
});
