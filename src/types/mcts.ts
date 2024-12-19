export interface Node {
    suit: string; // Unique identifier
    rank: string;
    value: number; // Total accumulated reward
    visits: number; // Number of times the node has been visited
    hand: Node[]; // Array of child nodes
  }
  
  export interface State {
    visits: number | undefined; // Total visits of the parent
    hand: Node[]; // Array of child nodes
  }
  