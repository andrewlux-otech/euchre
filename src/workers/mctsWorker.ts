import { selectNode } from "../utils/selectNode";
import { expandNode } from "../utils/expandNode";
import { simulateGame } from "../utils/simulateGame";
import { backpropagate } from "../utils/backpropagate";
import { deal } from "../utils/deal";
import { Node } from "../types/mcts";

onmessage = (event: MessageEvent) => {
  const { random, iterations } = event.data as {
    random?: string;
    iterations: number;
  };

  const root: Node = deal(random);

  for (let i = 0; i < iterations; i += 1) {
    const nodeList: Array<string> = [];
    let currentNode = root;

    while (backpropagate(currentNode, root, nodeList)) {
      currentNode.children = expandNode(currentNode).children;

      const childId = selectNode(currentNode).id;

      currentNode =
        currentNode.children.find(({ id }) => id === childId) ||
        (() => {
          throw new Error("problem selecting node");
        })();

      currentNode.state = simulateGame(currentNode).state;

      nodeList.push(currentNode.id);
    }
  }

  postMessage({
    // result: {
    //   ...root,
    //   children: root.children.map((child) => ({
    //     ...child,
    //     children: undefined,
    //   })),
    // },
    result: root,
  });
};
