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
        deck: [{suit: "Diamonds", rank: "Jack"}]
      }
    };

    const expandedNode = expandNode(node);

    expect(expandedNode.children).toHaveLength(1);
    expect(expandedNode.children[0].id).toEqual("JD");
  });

  it("should ignore a node with existing children", () => {
    const node: Node = {
      id: "1",
      visits: 0,
      value: 0,
      children: [{ id: "JD", visits: 4, value: 1, children: [], state: { myHand: [], deck: []} }],
      state: {
        myHand: [],
        deck: [{suit: "Diamonds", rank: "Jack"}]
      }
    };

    const expandedNode = expandNode(node);
  
    expect(expandedNode.children).toHaveLength(1);
    expect(expandedNode.children[0].visits).toEqual(4);
  });
  
});
