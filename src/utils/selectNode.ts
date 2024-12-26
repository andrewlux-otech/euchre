import { Node } from "../types/mcts";

export function selectNode(node: Node, rng: () => number = Math.random): Node {
  if (!node.children || node.children.length === 0) {
    throw new Error("State must have cards to select from");
  }

  const unexploredNodes = node.children.filter((node) => node.visits === 0);
  if (unexploredNodes.length > 0) {
    // Randomly choose one unexplored node
    return unexploredNodes[Math.floor(rng() * unexploredNodes.length)];
  }

  // Use UCB formula for explored nodes
  const c = Math.SQRT2; // Exploration constant (√2)
  // Calculate UCB scores for all nodes
  const scores = node.children.map((child) => ({
    node: child,
    ucb: calculateUCB(child, node.visits, c),
  }));

  // Find the maximum UCB score
  const maxScore = Math.max(...scores.map((entry) => entry.ucb));

  // Collect all nodes with the maximum UCB score
  const bestNodes = scores
    .filter((entry) => entry.ucb === maxScore)
    .map((entry) => entry.node);

  // If there are ties, randomly pick one

  return bestNodes[Math.floor(rng() * bestNodes.length)];
}

function calculateUCB(
  node: Node,
  parentVisits: number | undefined,
  c: number,
): number {
  const exploitation = node.value / node.visits;
  const exploration =
    parentVisits === undefined
      ? 0 // No exploration term for the root
      : c * Math.sqrt(Math.log(parentVisits) / node.visits);

  return exploitation + exploration;
}
