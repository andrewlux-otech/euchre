import { selectNode } from "../utils/selectNode";
import { expandNode } from "../utils/expandNode";
import { simulateGame } from "../utils/simulateGame";
import { backpropagate } from "../utils/backpropagate";
import { deal } from "../utils/deal";
import { State, Card, Node } from "../types/mcts";

export function mcts(iterations: number, state: State): Node {
  // console.log(state);
  let currentNode = deal({
    id: "root",
    value: 0,
    visits: 0,
    children: [],
    state,
  });

  // const myVoid = state.void;

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

      let newParent = parentNode.children.find(({ id }) => id === childId);

      if (newParent === undefined) {
        newParent = currentNode;
        parentNode.children.push(newParent);
      }

      parentNode = newParent;

      nodeList.push(
        currentNode.state.trick[currentNode.state.trick.length - 1],
      );

      currentNode.state = simulateGame(currentNode).state;
    }

    currentNode = deal({ ...root, state });

    // currentNode = deal({ ...root, state: {
    //   ...state,
    //   void: myVoid,
    // }});

    // if (i === 300) {
    //   console.log(currentNode);
    // }
  }

  const maxVisits = Math.max(...root.children.map(({ visits }) => visits));

  return root.children.find(({ visits }) => visits === maxVisits)!;
}
