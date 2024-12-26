export interface Node {
  value: number; // Total accumulated reward
  visits: number; // Number of times the node has been visited
  children: Node[]; // Array of child nodes
  state: State; // The game state at this node
  id: string; // unique id for node
}

export interface State {
  hands: Card[][];
  myWins: number;
  myLosses: number;
  trump: Card["suit"];
  trick: Card[];
  turn: number;
  alone: number | undefined;
  myBid: boolean;
  up: Card;
}

export interface Card {
  suit: "Hearts" | "Diamonds" | "Clubs" | "Spades";
  rank: "Nine" | "Ten" | "Jack" | "Queen" | "King" | "Ace";
}
