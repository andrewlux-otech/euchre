import { Node, Card, State } from "../types/mcts";
import { isLeft } from "./isLeft";
import seedrandom from "seedrandom";

export function deal(state?: State, random?: string): Node {
  const rng = random ? seedrandom(random) : Math.random;

  let deck: Array<Card> = shuffle(
    (["Hearts", "Diamonds", "Clubs", "Spades"] as Array<Card["suit"]>)
      .reduce((sum, suit) => {
        (
          ["Nine", "Ten", "Jack", "Queen", "King", "Ace"] as Array<Card["rank"]>
        ).map((rank) => {
          sum.push({ suit, rank });
        });

        return sum;
      }, [] as Array<Card>)
      .filter(
        (card) =>
          state?.hands[state.turn].find((myCard) =>
            myCard === undefined
              ? true
              : myCard.rank === card.rank && myCard.suit === card.suit,
          ) === undefined &&
          state?.burned.find(
            ({ rank, suit }) => rank === card.rank && suit === card.suit,
          ) === undefined,
      ),
    rng,
  );

  let deckCounter = 0;

  const myState = {
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
  } as State;

  myState.void.forEach((myVoid, i) => {
    const needsToMove = myState.hands[i].filter((card: Card | undefined) =>
      card === undefined
        ? false
        : (isLeft(myState.trump, card) && myVoid.includes(myState.trump)) ||
          (!isLeft(myState.trump, card) && myVoid.includes(card.suit)),
    );

    needsToMove.forEach((needToMove) => {
      const pickFrom = shuffle(
        myState.hands.reduce(
          (sum, hand, j) => {
            if (myState.void[j].includes(needToMove!.suit)) {
              return sum;
            }
            hand
              ?.filter((card: Card | undefined) =>
                card === undefined
                  ? false
                  : !(
                      isLeft(myState.trump, card) &&
                      myVoid.includes(myState.trump)
                    ) &&
                    !(
                      !isLeft(myState.trump, card) && myVoid.includes(card.suit)
                    ),
              )
              .filter(
                (card) =>
                  state?.hands[j].find((myCard) =>
                    myCard === undefined
                      ? false
                      : myCard!.rank === card!.rank &&
                        myCard!.suit === card!.suit,
                  ) === undefined,
              )
              .forEach((card) => {
                if (card !== undefined) {
                  sum.push({ card, location: j });
                }
              });

            return sum;
          },
          deck.slice(deckCounter + 1).map((card) => ({
            card,
            location: undefined as number | undefined,
          })),
        ),
      );

      myState.hands[i] = myState.hands[i]!.filter(
        (card) =>
          needToMove!.rank !== card!.rank || needToMove!.suit !== card!.suit,
      ).concat(pickFrom[0].card);

      if (pickFrom[0].location === undefined) {
        deck = deck
          .filter(
            (myCard) =>
              myCard.rank !== pickFrom[0].card.rank ||
              myCard.suit !== pickFrom[0].card.suit,
          )
          .concat([needToMove!]);
      } else {
        myState.hands[pickFrom[0].location] = myState.hands[
          pickFrom[0].location
        ]!.filter(
          (myCard) =>
            myCard!.rank !== pickFrom[0].card.rank ||
            myCard!.suit !== pickFrom[0].card.suit,
        ).concat([needToMove]);
      }
    });
  });

  if (myState.void.find((myVoid) => myVoid.length !== 0)) {
    console.log(myState, state);
    process.exit(1);
  }

  return {
    id: "root",
    value: 0,
    visits: 0,
    children: [],
    state: myState,
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
