import { expandNode } from "../../utils/expandNode";

describe("expandNode Utility", () => {
  it("should expand a node", () => {
    const node = "selectedNode";
    const result = expandNode(node);
    expect(result).toBe("expandedNode");
  });
});
