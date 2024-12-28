import { deal } from "../utils/deal";
import { Node, Card } from "../types/mcts";
import { mcts } from "../utils/mcts";
import { simulateGame } from "../utils/simulateGame";
import { followsSuit } from "../utils/followsSuit";
import { isLeft } from "../utils/isLeft";

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

      if (
        trick.length > 1 &&
        !followsSuit(
          isLeft(root.state.trump, trick[0]),
          root.state.trick[0],
          root.state.trump,
          isLeft(root.state.trump, play),
          play,
        )
      ) {
        root.state.void[turn] = Array.from(
          new Set([
            ...root.state.void[turn],
            isLeft(root.state.trump, trick[0])
              ? root.state.trump
              : trick[0].suit,
          ]),
        );
      }
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

    if (
      trick.length > 0 &&
      !followsSuit(
        isLeft(root.state.trump, trick[0]),
        trick[0],
        root.state.trump,
        isLeft(
          root.state.trump,
          solution.state.burned[solution.state.burned.length - 1],
        ),
        solution.state.burned[solution.state.burned.length - 1],
      )
    ) {
      root.state.void[turn] = Array.from(
        new Set([
          ...root.state.void[turn],
          isLeft(root.state.trump, trick[0]) ? root.state.trump : trick[0].suit,
        ]),
      );
    }

    const newState = {
      ...root.state,
      hands,
      burned: solution.state.burned,
      trick: [
        ...trick,
        solution.state.burned[solution.state.burned.length - 1],
      ],
      turn: solution.state.turn,
    };

    root = {
      id: solution.id,
      value: 0,
      visits: 0,
      children: [],
      state: newState,
    };

    root.state = simulateGame(root).state;
  }

  postMessage({
    ...root.state,
    hands: hands.map((hand, i) =>
      i === 0 ? hand : Array(hand.length).fill(undefined),
    ),
  });
};

function mod(m: number, n: number): number {
  return ((m % n) + n) % n;
}
