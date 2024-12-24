import { expandNode } from "../../utils/expandNode";
import { Node } from "../../types/mcts";

describe("expandNode Utility", () => {
  it("should add new children to a node with no existing children", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [[], [{ suit: "Diamonds", rank: "Jack" }], [], []],
        myWins: 0,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 1,
        alone: undefined,
        myBid: false,
      },
    };

    const expandedNode = expandNode(node);

    expect(expandedNode).toEqual({
      id: "1",
      visits: 0,
      value: 0,
      children: [
        {
          id: "JD",
          visits: 0,
          value: 0,
          children: [],
          state: {
            hands: [[], [], [], []],
            myWins: 0,
            myLosses: 0,
            trump: "Diamonds",
            trick: [{ suit: "Diamonds", rank: "Jack" }],
            turn: 0,
            alone: undefined,
            myBid: false,
          },
        },
      ],
      state: {
        hands: [[], [{ suit: "Diamonds", rank: "Jack" }], [], []],
        myWins: 0,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 1,
        alone: undefined,
        myBid: false,
      },
    } as Node);
  });

  it("should ignore a node with existing children", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [
        {
          id: "JD",
          visits: 4,
          value: 1,
          children: [],
          state: {
            hands: [[]],
            myWins: 0,
            myLosses: 0,
            trump: "Diamonds",
            trick: [],
            turn: 0,
            alone: undefined,
            myBid: false,
          },
        },
      ],
      state: {
        hands: [[{ suit: "Diamonds", rank: "Jack" }]],
        myWins: 0,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: undefined,
        myBid: false,
      },
    };

    const expandedNode = expandNode(node);

    expect(expandedNode).toEqual(node);
  });

  it("should expand a node using my hand", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [
          [{ suit: "Diamonds", rank: "Ace" }],
          [{ suit: "Hearts", rank: "Jack" }],
          [{ suit: "Clubs", rank: "Jack" }],
          [{ suit: "Spades", rank: "Jack" }],
        ],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: undefined,
        myBid: false,
      },
    };

    const expandedNode = expandNode(node);

    expect(expandedNode).toEqual({
      id: "1",
      visits: 0,
      value: 0,
      children: [
        {
          id: "AD",
          visits: 0,
          value: 0,
          children: [],
          state: {
            hands: [
              [],
              [{ suit: "Hearts", rank: "Jack" }],
              [{ suit: "Clubs", rank: "Jack" }],
              [{ suit: "Spades", rank: "Jack" }],
            ],
            myWins: 4,
            myLosses: 0,
            trump: "Diamonds",
            trick: [{ suit: "Diamonds", rank: "Ace" }],
            turn: 3,
            alone: undefined,
            myBid: false,
          },
        },
      ],
      state: {
        hands: [
          [{ rank: "Ace", suit: "Diamonds" }],
          [{ suit: "Hearts", rank: "Jack" }],
          [{ suit: "Clubs", rank: "Jack" }],
          [{ suit: "Spades", rank: "Jack" }],
        ],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: undefined,
        myBid: false,
      },
    } as Node);
  });

  it("should decrement turn twice on alone hand and partner missed", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [],
      state: {
        hands: [
          [{ suit: "Diamonds", rank: "Ace" }],
          [{ suit: "Spades", rank: "Jack" }],
          [{ suit: "Clubs", rank: "Jack" }],
          [],
        ],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: 1,
        myBid: false,
      },
    };

    const expandedNode = expandNode(node);

    expect(expandedNode).toEqual({
      id: "1",
      visits: 0,
      value: 0,
      children: [
        {
          id: "AD",
          visits: 0,
          value: 0,
          children: [],
          state: {
            hands: [
              [],
              [{ suit: "Spades", rank: "Jack" }],
              [{ suit: "Clubs", rank: "Jack" }],
              [],
            ],
            myWins: 4,
            myLosses: 0,
            trump: "Diamonds",
            trick: [{ suit: "Diamonds", rank: "Ace" }],
            turn: 2,
            alone: 1,
            myBid: false,
          },
        },
      ],
      state: {
        hands: [
          [{ suit: "Diamonds", rank: "Ace" }],
          [{ suit: "Spades", rank: "Jack" }],
          [{ suit: "Clubs", rank: "Jack" }],
          [],
        ],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: 1,
        myBid: false,
      },
    } as Node);
  });
});
