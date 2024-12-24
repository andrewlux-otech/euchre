import { selectNode } from "../utils/selectNode";
import { expandNode } from "../utils/expandNode";
import { simulateGame } from "../utils/simulateGame";
// import { backpropagate } from "../utils/backpropagate";

onmessage = (event: MessageEvent) => {
  const { node } = event.data;

  // const nodeList = [];

  let currentNode = node;

  while (currentNode.state.myWins + currentNode.state.myLosses !== 5) {
    currentNode = expandNode(currentNode);

    currentNode = selectNode(currentNode);

    // nodeList.push(currentNode);

    currentNode = simulateGame(currentNode);
  }

  // Step 3: Simulation
  // const result =

  // Step 4: Backpropagation
  // backpropagate(expandedNode, simulationResult);

  // Send the final result back to the main thread
  // postMessage({ result: simulationResult });
};
