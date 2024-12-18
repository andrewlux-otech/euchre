import { selectNode } from "../utils/selectNode";
import { expandNode } from "../utils/expandNode";
import { simulateGame } from "../utils/simulateGame";
import { backpropagate } from "../utils/backpropagate";

onmessage = (event: MessageEvent) => {
  const { state, iterations } = event.data;

  // Step 1: Selection
  const selectedNode = selectNode(state);

  // Step 2: Expansion
  const expandedNode = expandNode(selectedNode);

  // Step 3: Simulation
  const simulationResult = simulateGame(expandedNode);

  // Step 4: Backpropagation
  backpropagate(expandedNode, simulationResult);

  // Send the final result back to the main thread
  postMessage({ result: simulationResult });
};
