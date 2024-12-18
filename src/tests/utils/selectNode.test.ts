import { selectNode } from "../../utils/selectNode";

describe("selectNode Utility", () => {
  it("should select a node given a state", () => {
    const state = "mockState";
    const result = selectNode(state);
    expect(result).toBe("selectedNode");
  });
});
