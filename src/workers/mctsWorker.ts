import { selectNode } from "../utils/selectNode";
import { expandNode } from "../utils/expandNode";
import { simulateGame } from "../utils/simulateGame";
import { backpropagate } from "../utils/backpropagate";
import { deal } from "../utils/deal";
import { Card } from "../types/mcts";
import { createNode } from "../utils/createNode";

onmessage = (event: MessageEvent) => {
  const { iterations, hand, burned, trump } = event.data as {
    iterations: number;
    hand: Array<Card>;
    burned: Array<Card>;
    trump: Card["suit"];
  };

  let currentNode = deal(hand, burned, trump);

  const root = currentNode;

  for (let i = 0; i < iterations; i += 1) {
    const nodeList: Array<Card> = [];
    let parentNode = root;

    while (backpropagate(currentNode, root, nodeList)) {      
      currentNode.children = expandNode(currentNode).children.map((child) => {
        const existing = parentNode.children.find(({ id }) => id === child.id);

        if (existing === undefined) {
          return child;
        }
        return {
          ...child,
          value: existing.value,
          visits: existing.visits,
        };
      });

      const childId = selectNode(currentNode).id;

      currentNode =
        currentNode.children.find(({ id }) => id === childId) ||
        (() => {
          throw new Error("problem selecting node");
        })();

      let newParent = parentNode.children.find(
        ({ id }) => id === childId,
      );

      if (newParent === undefined) {
        newParent = createNode(root)(currentNode.state.trick[currentNode.state.trick.length - 1]);
        parentNode.children.push(newParent);
      }

      parentNode = newParent;

      nodeList.push(
        currentNode.state.trick[currentNode.state.trick.length - 1],
      );

      currentNode.state = simulateGame(currentNode).state;
    }

    currentNode = deal(hand, burned, trump);
    currentNode.value = root.value;
    currentNode.visits = root.visits;
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
