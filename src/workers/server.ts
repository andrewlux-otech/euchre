import { deal } from "../utils/deal";
import { Node } from "../types/mcts";

onmessage = (event: MessageEvent) => {
  const { random } = event.data as {
    random?: string;
  };

  const root: Node = deal(undefined, undefined, undefined, random);

  postMessage({
    hand: root.state.hands[0],
    trump: root.state.trump,
    burned: [root.state.up],
  });
};
