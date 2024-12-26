import { deal } from "../utils/deal";
import { Node, Card } from "../types/mcts";
import { mcts } from "../utils/mcts";

let root: Node;

onmessage = (event: MessageEvent) => {
  const {
    random,
    deal: newDeal,
    play,
  } = event.data as {
    random?: string;
    deal?: boolean;
    play?: Card;
  };

  if (newDeal) {
    root = deal(undefined, random);
  }

  if (play !== undefined) {
    const burned = [...root.state.burned, play];
    const turn = mod(root.state.turn + 1, 4);

    root = mcts(2500, {
      ...root.state,
      hands: root.state.hands.map((hand, i) =>
        i === turn
          ? hand?.filter(
              (card) => card.rank !== play.rank || card.suit !== play.suit,
            )
          : undefined,
      ),
      burned,
      trick: [...root.state.trick, play],
      turn,
    });
  }

  postMessage({
    ...root.state,
    hands: Array(4)
      .fill(undefined)
      .map((_hand, i) =>
        i === 0 ? root.state.hands[root.state.turn] : undefined,
      ),
  });
};

function mod(m: number, n: number): number {
  return ((m % n) + n) % n;
}
