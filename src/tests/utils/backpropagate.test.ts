import { backpropagate } from "../../utils/backpropagate";

describe("backpropagate Utility", () => {
  it("should log the backpropagation result", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const node = "expandedNode";
    const result = 0.8;

    backpropagate(node, result);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Backpropagating result:",
      result,
      "for node:",
      node,
    );
    consoleSpy.mockRestore();
  });
});
