import { selectNode, expandNode, simulateGame, backpropagate } from "../../workers/mctsWorker";

describe("MCTS Utilities", () => {
  it("should select a node", () => {
    const selectedNode = selectNode("mockState");
    expect(selectedNode).toBe("selectedNode");
  });

  it("should expand a node", () => {
    const expandedNode = expandNode("selectedNode");
    expect(expandedNode).toBe("expandedNode");
  });

  it("should simulate a game", () => {
    const result = simulateGame("expandedNode");
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  it("should backpropagate results", () => {
    const consoleSpy = jest.spyOn(console, "log");
    backpropagate("expandedNode", 0.5);
    expect(consoleSpy).toHaveBeenCalledWith("Backpropagation complete", "expandedNode", 0.5);
    consoleSpy.mockRestore();
  });
});
