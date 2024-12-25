import { Node, Card, State } from "../types/mcts";
import seedrandom from "seedrandom";

export function deal(random?: string): Node {
  const rng = random ? seedrandom(random) : Math.random;

  const deck: Array<Card> = shuffle(
    (["Hearts", "Diamonds", "Clubs", "Spades"] as Array<Card["suit"]>).reduce(
      (sum, suit) => {
        (
          ["Nine", "Ten", "Jack", "Queen", "King", "Ace"] as Array<Card["rank"]>
        ).map((rank) => {
          sum.push({ suit, rank });
        });

        return sum;
      },
      [] as Array<Card>,
    ),
    rng,
  );

  return {
    id: "root",
    value: 0,
    visits: 0,
    children: [],
    state: {
      hands: [
        deck.slice(0, 5),
        deck.slice(5, 10),
        deck.slice(10, 15),
        deck.slice(15, 20),
      ],
      myWins: 0,
      myLosses: 0,
      trump: deck[21].suit,
      trick: [],
      turn: 0,
      alone: undefined,
      myBid: true,
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
