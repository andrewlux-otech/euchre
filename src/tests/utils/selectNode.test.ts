import { selectNode } from "../../utils/selectNode";
import { State } from "../../types/mcts";
import seedrandom from "seedrandom";

describe("selectNode Utility", () => {
  it("should select a node given a state", () => {
    const state: State = {
      visits: 5,
      hand: [
        { rank: "Jack", suit: "Clubs", visits: 10, value: 2, hand: [] },
        { rank: "Jack", suit: "Diamonds", visits: 5, value: 0.5, hand: [] }
      ]
    };
    const result = selectNode(state);
    expect(result).toBeDefined();
  });

  it("should select the node with the highest UCB score", () => {
    const state = {
      visits: 20, // Parent visits
      hand: [
        { rank: "Jack", suit: "Clubs", visits: 10, value: 2, hand: [] },
        { rank: "Jack", suit: "Diamonds", visits: 5, value: 0.5, hand: [] }
      ],
    };
  
    const selectedNode = selectNode(state);
  
    expect(selectedNode).toEqual({ rank: "Jack", suit: "Diamonds", visits: 5, value: 0.5, hand: [] });
  });

  it("should prioritize unvisited nodes", () => {
    const state: State = {
      visits: 20,
      hand: [
        { rank: "Jack", suit: "Clubs", visits: 10, value: 2, hand: [] },
        { rank: "Jack", suit: "Diamonds", visits: 0, value: 0, hand: [] }
      ],
    };

    const selectedNode = selectNode(state);

    expect(selectedNode).toEqual({ rank: "Jack", suit: "Diamonds", visits: 0, value: 0, hand: [] });
  });

  it("should randomly select an unexplored node", () => {
    const state: State = {
      visits: 20,
      hand: [
        { rank: "Jack", suit: "Clubs", visits: 0, value: 0, hand: [] },
        { rank: "Jack", suit: "Diamonds", visits: 0, value: 0, hand: [] },
        { rank: "Ten", suit: "Diamonds", visits: 0, value: 0, hand: [] },
        { rank: "Nine", suit: "Diamonds", visits: 0, value: 0, hand: [] },
        { rank: "Queen", suit: "Diamonds", visits: 0, value: 0, hand: [] }
      ],
    };
  
    const selectedNode1 = selectNode(state, seedrandom("seed1"));
    const selectedNode2 = selectNode(state, seedrandom("seed1"));
  
    // Random selection should be deterministic given the same seed
    expect(selectedNode1).toEqual(selectedNode2);
  });

  it("should randomly choose between the same UCB score", () => {
    const state = {
      visits: 20, // Parent visits
      hand: [
        { rank: "Jack", suit: "Clubs", visits: 4, value: 1, hand: [] },
        { rank: "Jack", suit: "Diamonds", visits: 4, value: 1, hand: [] },
        { rank: "Ten", suit: "Diamonds", visits: 4, value: 1, hand: [] },
        { rank: "Nine", suit: "Diamonds", visits: 4, value: 1, hand: [] },
        { rank: "Queen", suit: "Diamonds", visits: 4, value: 1, hand: [] }
      ],
    };
  
    const selectedNode1 = selectNode(state, seedrandom("seed1"));
    const selectedNode2 = selectNode(state, seedrandom("seed1"));
  
    // Random selection should be deterministic given the same seed
    expect(selectedNode1).toEqual(selectedNode2);
  });
});
