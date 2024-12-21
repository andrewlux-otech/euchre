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
        myHand: [],
        deck: [{ suit: "Diamonds", rank: "Jack" }],
        myWins: 0,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 1,
        alone: false,
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
            myHand: [],
            deck: [],
            myWins: 0,
            myLosses: 0,
            trump: "Diamonds",
            trick: [{ suit: "Diamonds", rank: "Jack" }],
            turn: 0,
            alone: false,
            myBid: false,
          },
        },
      ],
      state: {
        myHand: [],
        deck: [{ suit: "Diamonds", rank: "Jack" }],
        myWins: 0,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 1,
        alone: false,
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
            myHand: [],
            deck: [],
            myWins: 0,
            myLosses: 0,
            trump: "Diamonds",
            trick: [],
            turn: 0,
            alone: false,
            myBid: false,
          },
        },
      ],
      state: {
        myHand: [],
        deck: [{ suit: "Diamonds", rank: "Jack" }],
        myWins: 0,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: false,
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
        myHand: [{ suit: "Diamonds", rank: "Ace" }],
        deck: [
          { suit: "Hearts", rank: "Jack" },
          { suit: "Clubs", rank: "Jack" },
          { suit: "Spades", rank: "Jack" },
        ],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: false,
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
            myHand: [],
            deck: [
              { suit: "Hearts", rank: "Jack" },
              { suit: "Clubs", rank: "Jack" },
              { suit: "Spades", rank: "Jack" },
            ],
            myWins: 4,
            myLosses: 0,
            trump: "Diamonds",
            trick: [{ suit: "Diamonds", rank: "Ace" }],
            turn: 3,
            alone: false,
            myBid: false,
          },
        },
      ],
      state: {
        myHand: [{ suit: "Diamonds", rank: "Ace" }],
        deck: [
          { suit: "Hearts", rank: "Jack" },
          { suit: "Clubs", rank: "Jack" },
          { suit: "Spades", rank: "Jack" },
        ],
        myWins: 4,
        myLosses: 0,
        trump: "Diamonds",
        trick: [],
        turn: 0,
        alone: false,
        myBid: false,
      },
    } as Node);
  });
});
