export interface Node {
  value: number; // Total accumulated reward
  visits: number; // Number of times the node has been visited
  children: Node[]; // Array of child nodes
  state: State; // The game state at this node
  id: string; // unique id for node
}
  
export interface State {
  deck: Card[]; // Remaining cards in the deck
  myHand: Card[]; 
}

export interface Card {
  suit: string;
  rank: string;
}
  