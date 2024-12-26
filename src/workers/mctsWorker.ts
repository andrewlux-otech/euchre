import { State } from "../types/mcts";
import { mcts } from "../utils/mcts";

onmessage = (event: MessageEvent) => {
  const { iterations, state } = event.data as {
    iterations: number;
    state: State;
  };

  const { id } = mcts(iterations, state);

  // ignore state (hands in particular)
  // since the hands are particular to a deal
  postMessage({
    result: id,
  });
};
