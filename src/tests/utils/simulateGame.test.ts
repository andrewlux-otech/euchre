import { simulateGame } from "../../utils/simulateGame";

describe("simulateGame Utility", () => {
  it("should simulate a game and return a result", () => {
    const node = "expandedNode";
    const result = simulateGame(node);

    // Ensure result is a number between 0 and 1
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });
});
