import { selectNode } from "../../utils/selectNode";
import { State, Node } from "../../types/mcts";
import seedrandom from "seedrandom";

describe("selectNode Utility", () => {
  it("should select a node", () => {
    const state: State = {
      myHand: [
        {
          rank: "Jack", suit: "Clubs"
        }, 
        {
          rank: "Jack", suit: "Diamonds"
        }
      ], deck: []
    };

    const result = selectNode({
      id: "0",
      state,
      children: [{
        id: "1",
        visits: 10,
        value: 2,
        children: [],
        state
      }, {
        id: "2",
        visits: 5,
        value: 0.5,
        children: [],
        state
      }],
      visits: 20,
      value: 0
    });
    expect(result).toBeDefined();
  });

  it("should select the node with the highest UCB score", () => {
    const state: State = {
      myHand: [
        {
          rank: "Jack", suit: "Clubs"
        }, 
        {
          rank: "Jack", suit: "Diamonds"
        }
      ], deck: []
    };
  
    const selectedNode = selectNode({
      id: "0",
      state,
      children: [{
        id: "1",
        visits: 10,
        value: 2,
        children: [],
        state
      }, {
        id: "2",
        visits: 5,
        value: 0.5,
        children: [],
        state
      }],
      visits: 20,
      value: 0
    });
  
    expect(selectedNode).toEqual({
      id: "2",
      visits: 5,
      value: 0.5,
      children: [],
      state
    });
  });

  it("should prioritize unvisited nodes", () => {
    const state: State = {
      myHand: [
        {
          rank: "Jack", suit: "Clubs"
        }, 
        {
          rank: "Jack", suit: "Diamonds"
        }
      ], deck: []
    };

    const selectedNode = selectNode({
      id: "0",
      state,
      children: [{
        id: "1",
        visits: 10,
        value: 2,
        children: [],
        state
      }, {
        id: "2",
        visits: 0,
        value: 0,
        children: [],
        state
      }],
      visits: 20,
      value: 0
    });

    expect(selectedNode).toEqual({
      id: "2",
      visits: 0,
      value: 0,
      children: [],
      state
    });
  });

  it("should randomly select an unexplored node", () => {
    const state: State = {
      myHand: [
        {
          rank: "Jack", suit: "Clubs"
        }, 
        {
          rank: "Jack", suit: "Diamonds"
        }
      ], deck: []
    };

    const node: Node = {
      id: "0",
      state,
      children: [{
        id: "1",
        visits: 0,
        value: 0,
        children: [],
        state
      }, {
        id: "2",
        visits: 0,
        value: 0,
        children: [],
        state
      }, {
        id: "3",
        visits: 0,
        value: 0,
        children: [],
        state
      }, {
        id: "4",
        visits: 0,
        value: 0,
        children: [],
        state
      }, {
        id: "5",
        visits: 0,
        value: 0,
        children: [],
        state
      }],
      visits: 20,
      value: 0
    };
  
    const selectedNode1 = selectNode(node, seedrandom("seed1"));
    const selectedNode2 = selectNode(node, seedrandom("seed1"));
  
    // Random selection should be deterministic given the same seed
    expect(selectedNode1).toEqual(selectedNode2);
  });

  it("should randomly choose between the same UCB score", () => {
    const state: State = {
      myHand: [
        {
          rank: "Jack", suit: "Clubs"
        }, 
        {
          rank: "Jack", suit: "Diamonds"
        }
      ], deck: []
    };

    const node: Node = {
      id: "0",
      state,
      children: [{
        id: "1",
        visits: 4,
        value: 1,
        children: [],
        state
      }, {
        id: "2",
        visits: 4,
        value: 1,
        children: [],
        state
      }, {
        id: "3",
        visits: 4,
        value: 1,
        children: [],
        state
      }, {
        id: "4",
        visits: 4,
        value: 1,
        children: [],
        state
      }, {
        id: "5",
        visits: 4,
        value: 1,
        children: [],
        state
      }],
      visits: 20,
      value: 0
    };
  
    const selectedNode1 = selectNode(node, seedrandom("seed1"));
    const selectedNode2 = selectNode(node, seedrandom("seed1"));
  
    // Random selection should be deterministic given the same seed
    expect(selectedNode1).toEqual(selectedNode2);
  });
});
