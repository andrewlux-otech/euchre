import { deal } from "../utils/deal";
import { Node, Card } from "../types/mcts";
import { mcts } from "../utils/mcts";

let root: Node;
let hands: (Card | undefined)[][];

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
  let trick;

  if (newDeal) {
    root = deal(undefined, random);
    hands = root.state.hands;
  } else {
    let burned = root.state.burned;
    let turn = root.state.turn;
    trick = root.state.trick;

    let myHands = hands.map((hand, i) =>
      i === turn ? hand : Array(hand.length).fill(undefined),
    );

    if (play !== undefined) {
      burned = [...burned, play];
      turn = mod(turn - 1, 4);
      trick = [...trick, play];

      myHands = hands.map((hand, i) =>
        i === turn
          ? hand.filter(
              (card) => card!.rank !== play.rank || card!.suit !== play.suit,
            )
          : Array(hand.length).fill(undefined),
      );

      hands[0] = hands[0]!.filter(
        (card) => card!.rank !== play.rank || card!.suit !== play.suit,
      );
    }

    const solution = mcts(2500, {
      ...root.state,
      hands: myHands,
      burned,
      trick,
      turn,
    });

    hands[turn] = hands[turn].filter(
      (card) =>
        card!.rank !==
          solution.state.burned[solution.state.burned.length - 1].rank ||
        card!.suit !==
          solution.state.burned[solution.state.burned.length - 1].suit,
    );

    root = {
      ...solution,
      state: {
        ...solution.state,
        hands,
      },
    };
  }

  postMessage({
    ...root.state,
    hands: Array(4)
      .fill(undefined)
      .map((_hand, i) => (i === 0 ? hands[0] : undefined)),
  });
};

function mod(m: number, n: number): number {
  return ((m % n) + n) % n;
}
