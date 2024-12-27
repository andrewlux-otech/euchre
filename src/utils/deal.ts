import { Node, Card, State } from "../types/mcts";
import seedrandom from "seedrandom";

export function deal(state?: State, random?: string): Node {
  const rng = random ? seedrandom(random) : Math.random;

  const deck: Array<Card> = shuffle(
    (["Hearts", "Diamonds", "Clubs", "Spades"] as Array<Card["suit"]>)
      .reduce((sum, suit) => {
        (
          ["Nine", "Ten", "Jack", "Queen", "King", "Ace"] as Array<Card["rank"]>
        ).map((rank) => {
          sum.push({ suit, rank });
        });

        return sum;
      }, [] as Array<Card>)
      .filter((card) =>
        state?.hands[state.turn] === undefined
          ? true
          : state.hands[state.turn]!.find(
              ({ rank, suit }) => rank === card.rank && suit === card.suit,
            ) === undefined &&
            state.burned.find(
              ({ rank, suit }) => rank === card.rank && suit === card.suit,
            ) === undefined,
      ),
    rng,
  );

  let deckCounter = 0;

  return {
    id: "root",
    value: 0,
    visits: 0,
    children: [],
    state: {
      hands: Array(4)
        .fill(undefined)
        .map((_hand, i) =>
          state?.hands[i] === undefined
            ? (() => {
                deckCounter += 5;
                return deck.slice(deckCounter - 5, deckCounter);
              })()
            : state.hands[i].map((card) => {
                if (card) return card;
                deckCounter += 1;
                return deck[deckCounter - 1];
              }),
        ),
      myWins: 0,
      myLosses: 0,
      trump: state?.trump || deck[deckCounter].suit,
      trick: state?.trick || [],
      turn: state?.turn === undefined ? 0 : state.turn,
      alone: undefined,
      myBid: true,
      up: state?.up || deck[deckCounter],
      burned: state?.burned || [deck[deckCounter]],
      void: state?.void || Array(4).fill([]),
    } as State,
  } as Node;
}

function shuffle<T>(array: T[], rng: () => number = Math.random): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(rng() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
