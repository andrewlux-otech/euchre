import { selectNode } from "../utils/selectNode";
import { expandNode } from "../utils/expandNode";
import { simulateGame } from "../utils/simulateGame";
import { backpropagate } from "../utils/backpropagate";

onmessage = (event: MessageEvent) => {
  const { node } = event.data;

  let currentNode = node;

  const nodeList = [currentNode];

  while (backpropagate(currentNode, nodeList)) {
    currentNode = expandNode(currentNode);

    currentNode = selectNode(currentNode);

    currentNode = simulateGame(currentNode);

    nodeList.push(currentNode);
  }
};
